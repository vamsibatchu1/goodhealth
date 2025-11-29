# Quick Setup Guide

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Optional: Configure LLM API

The app currently uses mock data for nutrition analysis. To use a real LLM:

1. **Create `.env.local` file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your API key:**
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
   ```

3. **Update `lib/nutrition-api.ts`:**
   Uncomment and configure the actual API call in the `getNutritionFromLLM` function.

## Features Implemented

✅ Mobile-first responsive design  
✅ Date timeline selector (last 14 days)  
✅ Weight tracking card with modal  
✅ Calories burned card with modal  
✅ Nutrition card with progress indicators  
✅ Food entry modal with LLM integration (mock)  
✅ Color-coded progress bars (green/yellow/red)  
✅ Clean card-based UI with Shadcn slate theme  

## Next Steps

- Connect to Firebase/Google Sheets for data persistence
- Implement real LLM API integration
- Add data export functionality
- Customize nutrition targets based on user profile

