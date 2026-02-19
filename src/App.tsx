import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const ProfileForm = lazy(() => import("./pages/ProfileForm"));
const QRCodePage = lazy(() => import("./pages/QRCodePage"));
const SOSMode = lazy(() => import("./pages/SOSMode"));
const EmergencyView = lazy(() => import("./pages/EmergencyView"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/qr" element={<QRCodePage />} />
            <Route path="/emergency" element={<EmergencyView />} />
            <Route path="/sos" element={<SOSMode />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
