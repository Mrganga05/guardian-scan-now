import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(JSON.stringify({ error: "Token required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Look up token
    const { data: tokenData, error: tokenError } = await supabase
      .from("emergency_tokens")
      .select("*")
      .eq("token", token)
      .single();

    if (tokenError || !tokenData) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check expiry
    if (new Date(tokenData.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "Token expired" }), {
        status: 410,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = tokenData.user_id;

    // Fetch profile, medical info, and contacts in parallel
    const [profileRes, medicalRes, contactsRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", userId).single(),
      supabase.from("medical_info").select("*").eq("user_id", userId).single(),
      supabase.from("emergency_contacts").select("*").eq("user_id", userId),
    ]);

    // Log the scan
    await supabase.from("scan_logs").insert({
      user_id: userId,
      token_id: tokenData.id,
      scanner_ip: req.headers.get("x-forwarded-for") || "unknown",
    });

    const profile = profileRes.data;
    const medical = medicalRes.data;
    const contacts = contactsRes.data || [];

    return new Response(
      JSON.stringify({
        fullName: profile?.full_name || "Unknown",
        bloodGroup: profile?.blood_type || "Unknown",
        dob: profile?.date_of_birth,
        organDonor: profile?.organ_donor,
        insurance: medical?.notes,
        allergies: medical?.allergies || [],
        medications: medical?.medications || [],
        conditions: medical?.conditions || [],
        contacts: contacts.map((c: any) => ({
          name: c.name,
          phone: c.phone,
          relationship: c.relationship,
        })),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
