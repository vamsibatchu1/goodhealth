export interface WeightEntry {
  date: string;
  weight: number;
}

export interface CalorieBurnEntry {
  date: string;
  burned: number;
}

export interface FoodItem {
  name: string;
  weight?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface FoodEntry {
  date: string;
  items: FoodItem[];
}

export interface DailyData {
  date: string;
  weight?: WeightEntry;
  burned?: CalorieBurnEntry;
  food?: FoodEntry;
}

export interface NutritionTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

