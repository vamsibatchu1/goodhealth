# Good Health - Daily Health Tracker

A mobile-first web application for tracking daily weight, calories burned, and nutrition intake. Built with Next.js, React, TypeScript, Tailwind CSS, and Shadcn UI.

## Features

- **Daily Timeline**: Scrollable date selector showing the last 14 days
- **Weight Tracking**: Record daily weight with easy input modal
- **Calories Burned**: Track total calories burned per day
- **Nutrition Tracking**: Add food entries with LLM-powered nutrition analysis
- **Progress Indicators**: Visual progress bars for calories, protein, carbs, and fats
- **Mobile-First Design**: Optimized for small screens with clean, card-based UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## LLM Integration

The app uses an LLM (OpenAI/Gemini) to analyze food descriptions and extract nutrition information. Currently, the implementation includes a mock API in `lib/nutrition-api.ts`. 

To integrate with a real LLM:

1. Add your API key to `.env.local`:
```
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

2. Update `lib/nutrition-api.ts` to use the actual API endpoint.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── modals/             # Input modals
│   ├── DateTimeline.tsx    # Date selector component
│   ├── WeightCard.tsx      # Weight tracking card
│   ├── CaloriesBurnedCard.tsx
│   └── NutritionCard.tsx   # Nutrition tracking card
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── nutrition-api.ts    # LLM integration
│   └── nutrition-targets.ts # Nutrition goal calculations
└── types/
    └── index.ts            # TypeScript type definitions
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI component library (slate theme)
- **Radix UI** - Accessible primitives
- **Lucide React** - Icons

## Data Storage

Currently, data is stored in React state (in-memory). To persist data:

1. Set up Firebase Firestore or Google Sheets API
2. Update the data handlers in `app/page.tsx` to sync with your backend
3. Add data fetching on component mount

## License

Private project for personal use.

