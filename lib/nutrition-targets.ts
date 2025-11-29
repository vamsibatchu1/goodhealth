import { NutritionTargets } from "@/types";

// Default nutrition targets - can be customized based on user profile
export function getNutritionTargets(weight?: number): NutritionTargets {
  // Default targets for a typical adult woman
  // These can be adjusted based on age, weight, BMI, activity level, etc.
  return {
    calories: 1800,
    protein: 100,
    carbs: 180,
    fats: 55,
  };
}

export function getProgressColor(current: number, target: number): string {
  const percentage = (current / target) * 100;
  if (percentage >= 95 && percentage <= 105) {
    return "text-green-600"; // Meeting target
  } else if (percentage < 95) {
    return "text-yellow-600"; // Below target
  } else {
    return "text-red-600"; // Above target
  }
}

export function getProgressBgColor(current: number, target: number): string {
  const percentage = (current / target) * 100;
  if (percentage >= 95 && percentage <= 105) {
    return "bg-green-500"; // Meeting target
  } else if (percentage < 95) {
    return "bg-yellow-500"; // Below target
  } else {
    return "bg-red-500"; // Above target
  }
}

