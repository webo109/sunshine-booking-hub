

# Sunshine Tours Oman – Booking Web App

## Overview
A production-ready, mobile-first tour booking application for Sunshine Tours Oman featuring a beautiful travel-agency design with deep green and gold branding, complete booking flow, and admin dashboard.

## Design Direction
- **Colors**: Deep green (#006400) primary, gold (#FFD700) accent, warm sand (#F5F0E8) background
- **Typography**: Clean, modern fonts — headings in a bold serif/display style, body in a clean sans-serif
- **Style**: Premium travel agency look inspired by GetYourGuide/Viator — large hero imagery, card-based tour grid, smooth animations
- **Logo**: SVG sun + camel silhouette in green and gold, rendered inline

## Pages & Features

### 1. Homepage
- Full-width hero with desert/wadi background image, tagline, and "Book Your Adventure" CTA
- Tour search bar (by keyword/date)
- Featured tours carousel (Embla)
- "Why Choose Us" section (19 years experience, private & group tours, multilingual guides)
- Testimonials section with 5-star TripAdvisor-style reviews
- Footer with contact info, WhatsApp, quick links

### 2. Tours Page
- Grid of all 7 pre-loaded tours with photo, name, duration, price, group type badge
- Category filter tabs: Day Trips, Multi-Day, Wadi Adventures, Desert, Mountain, City Tours
- Click → navigates to tour detail

### 3. Tour Detail Page (dynamic route `/tours/:slug`)
- Hero photo gallery
- Full description, itinerary, inclusions/exclusions
- Duration, pickup info, group size details
- Interactive availability calendar (pre-loaded with 20+ future available dates)
- Price calculator: per-person price × number of guests = total
- Prominent "Book Now" button

### 4. Booking Flow (multi-step wizard at `/book/:slug`)
- Progress bar across top
- **Step 1**: Confirm tour + select date from calendar
- **Step 2**: Adults & children count + pickup location
- **Step 3**: Customer details form (name, email, phone, WhatsApp, nationality) with validation
- **Step 4**: Review summary with total price breakdown
- **Step 5**: Simulated payment (OmanNet/Card) → success screen with booking reference, QR code, PDF download button, WhatsApp message preview

### 5. Admin Dashboard (`/admin` – password-protected)
- Simple login gate (password: "sunshine2026")
- Dashboard overview: upcoming bookings count, monthly revenue
- Calendar view of bookings
- Tour management: edit availability, prices, slots
- Customer list table
- Export bookings to CSV

### 6. Global Elements
- Responsive navbar with logo, navigation links, and mobile hamburger menu
- Floating WhatsApp button on every page (links to +968 9283 0836)
- Smooth scroll animations and transitions
- Mobile-first responsive design throughout

## Data
All 7 tours pre-loaded with realistic descriptions, itineraries, inclusions, and 20+ available future dates. All data stored in local state/context (no backend required for this version — can add Supabase later). Bookings stored in memory/localStorage for the admin dashboard demo.

## Pre-loaded Tours
1. Full Day Private Muscat City Tour – 8h – OMR 75/person
2. Full Day Private Wadi Shab & Bimmah Sinkhole – 9h – OMR 85/person
3. Full Day Private Wadi Bani Khalid & Wahiba Sands Sunset – 10h – OMR 95/person
4. Full Day Private Nizwa & Jebel Akhdar – 10h – OMR 110/person
5. Full Day Private Nizwa Fort & Jebel Shams – 10h – OMR 105/person
6. 5-Day Private Oman Highlights Tour – OMR 1,450/person
7. 8-Day Grand Oman Tour – OMR 2,300/person

