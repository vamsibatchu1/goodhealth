# GoodHealth Portal - Project Context

This file serves as a running record of all architectural decisions, design patterns, and features implemented in the GoodHealth project. It should be continuously updated as new features are built.

## 1. Architecture & Tech Stack
- **Framework**: Next.js (App Router) with React.
- **Styling**: Vanilla CSS (`globals.css`, `dashboard.css`) heavily utilizing CSS variables for theme consistency. No TailwindCSS.
- **Icons**: `lucide-react`.

## 2. Global Design System (Withings Inspired)
- **Theme**: Clean, light mode aesthetic.
  - Backgrounds: Off-white (`#f5f5f7`) for the main app, pure white (`#ffffff`) for cards/panels.
  - Text: Black/dark gray for high contrast reading. All links and text actions (e.g., "View All") strictly use black (`var(--text-primary)`).
- **Typography**: Inter font family.
- **Bento Box Grid Layout**: Replaced standard vertical scrolling lists with a dynamic CSS Grid (`.dashboard-grid`).
  - `.grid-row-1`: Full width items.
  - `.grid-row-2`: 2 equal columns.
  - `.grid-row-3`: 3 equal columns.
  - `.grid-row-2-unequal`: 2 columns (e.g., 2/3 and 1/3 splits).
- **Spacing Guidelines**:
  - Exactly `64px` horizontal padding on desktop content areas.
  - Exactly `40px` vertical space between sections (achieved via a `16px` flex gap + `24px` top margin on section headers).
- **Icons**: Metric card icons use vibrant colors (blue, red, green, yellow) sitting on top of light gray backgrounds with rounded corners.

## 3. Mobile Responsiveness
- **Breakpoint**: `@media (max-width: 768px)`
- **Navigation**: Desktop sidebar completely hides. Replaced by a fixed native-app-style tab bar at the bottom containing 5 icons (Health, Vault, Fitness, Nutrients, Settings).
- **Grid Stacking**: All Bento Box grids collapse into a single vertical column (`1fr`).
- **Typography & Padding**: Reduced header font sizes and card paddings strictly for mobile screens to maximize viewable area.

## 4. Core Features & Tabs
- **Sidebar / Layout (`page.tsx`)**: Controls global state for `activeTab` and manages the dynamic rendering of tab components.
- **Health Tab (`HealthTab.tsx`)**:
  - Hero card: Biological Age vs. Chronological Age.
  - AI Insights: Two-card row offering personalized health feedback.
  - Latest Measurements: 3-column row for Weight, Height, and Heart Rate.
- **Medical Vault Tab (`MedicalVaultTab.tsx`)**:
  - Dedicated tab extracted from Health.
  - Row 1: Medical Translator (AI summarization of reports) and Total Documents Stored.
  - Row 2: List of all uploaded documents alongside a Drag & Drop trigger card.
- **Upload Report Modal (`UploadReport.tsx`)**:
  - Right-aligned floating side-panel for uploading new documents.
  - Uses **React `createPortal`** (rendering into `document.body`) to prevent it from being clipped or trapped by the `transform` properties used in CSS fade-in animations on the main scroll container.
  - Includes a large drag/drop zone and metadata fields (Name, Date, Type).
- **Fitness Tab (`FitnessTab.tsx`)**:
  - Trends: Workouts logged and Daily Steps.
  - Vitals Dashboard: VO2 Max Trend, Resting Heart Rate, and a custom CSS stacked-bar chart for Sleep Stages.
- **Nutrition Tab (`NutritionTab.tsx`)**:
  - Natural language input for meal logging ("Log a meal...").
  - Today's Nutrition stats (Calories, Protein).
  - Micronutrient checklist.
- **Settings Tab (`SettingsTab.tsx`)**:
  - User profile hero card.
  - Physical stats (Height, Weight Target, Blood Type) in a 3-column grid.
  - Preferences (Push notifications toggle, Privacy settings).
- **AI Health Assistant (`ChatOverlay.tsx`)**:
  - Minimalist, bubble-less UI inspired by Notion Mail.
  - Plain, left-aligned text for AI responses (transparent background).
  - Pill-shaped chat bubbles for the user.
  - Floating pill-shaped text input at the bottom.
