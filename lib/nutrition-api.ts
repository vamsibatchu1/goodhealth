import { FoodItem } from "@/types";

export async function getNutritionFromLLM(
  foodDescription: string
): Promise<FoodItem> {
  try {
    const response = await fetch("/api/nutrition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodDescription }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API error: ${response.status} ${response.statusText}`
      );
    }

    const foodItem: FoodItem = await response.json();
    return foodItem;
  } catch (error) {
    console.error("Error calling nutrition API:", error);
    throw new Error(
      `Failed to analyze food entry: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

