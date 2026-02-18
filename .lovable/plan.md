

# SafeScan — Emergency Identity Platform (Web App MVP)

## Overview
Build SafeScan as a stunning, installable web app (PWA) with the dark premium "Critical Response UI" aesthetic. This delivers the core life-saving functionality through a browser-based experience that works on any phone.

---

## Phase 1: Marketing Landing Page
A world-class single-page marketing site with:
- **Hero section**: Full-viewport dark scene with animated heartbeat line, glowing phone mockup showing the QR screen, particle/gradient background, "Your Silent Guardian" tagline
- **How It Works**: 3-step animated explainer (Scan → Profile → Help) with staggered entrance animations
- **Feature grid**: Glassmorphism cards with hover reveals showcasing key capabilities
- **Trust signals section**: Partner-style logos, stats counters ("10M+ lives protected"), credibility badges
- **Testimonial cards**: Survivor stories with photo cards and quote animations
- **Pricing section**: Free / Pro / Enterprise tiers with comparison
- **CTA sections**: "Get Started" buttons throughout, app store-style badges
- **Footer**: Links, social proof, privacy messaging ("No ads. No tracking. Ever.")

Design: Near-black background (#0A0A0F), emergency red accents (#FF1E1E), glassmorphism cards, bold display typography, smooth scroll animations.

---

## Phase 2: Authentication & Onboarding
- **Sign up / Sign in** pages with email + password authentication (dark themed)
- **4-step onboarding flow** with progress bar and smooth step transitions:
  1. Personal info (name, date of birth, photo)
  2. Medical info (blood type, allergies, medications, conditions)
  3. Emergency contacts (name, phone, relationship)
  4. Profile review & confirmation
- Biometric-style UI elements for premium feel

---

## Phase 3: User Dashboard
- **Profile completeness score** with animated circular progress
- **Emergency QR code** display with pulsing red ring heartbeat animation
- **Recent scan log** showing when/where profile was accessed
- **Quick-edit cards** for medical info, contacts, preferences
- **Health stats overview** with clean card layout
- Dark mode dashboard with glassmorphism panels and neon-red accents

---

## Phase 4: QR Code & Emergency Profile
- **QR code generation** with unique, shareable tokens for each user
- **Public emergency profile page** (no login required to view):
  - Fast-loading, mobile-optimized display
  - Full name, photo, blood type, allergies, medications, organ donor status
  - One-tap call buttons for each emergency contact
  - Scan-reveal entrance animation
  - Clean, authoritative medical-grade typography
- **Nearby hospitals section** using browser geolocation (map view with markers)

---

## Phase 5: SOS Mode & Notifications
- **SOS activation screen** with countdown animation (3-2-1)
- **Live location display** on embedded map
- **Loud beacon toggle** (audio alert via browser)
- Visual pulse animations and urgency indicators
- Contact notification simulation (UI for alert status)

---

## Design System Throughout
- **Colors**: #0A0A0F background, #FF1E1E primary red, #00E676 safe green, glassmorphism cards
- **Typography**: Bold display headings, clean sans-serif body text, monospace for codes/tokens
- **Animations**: Heartbeat pulse rings, staggered card entrances, smooth page transitions, ripple effects on location pins
- **Responsive**: Mobile-first design, installable as PWA

---

## Backend (Lovable Cloud)
- User authentication (email/password)
- Database for user profiles, medical info, emergency contacts, scan logs
- Edge function for QR token generation
- Public API endpoint for emergency profile viewing
- Row-level security for data protection

