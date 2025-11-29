import { NextRequest, NextResponse } from "next/server";
import { FoodItem } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { foodDescription } = await request.json();

    if (!foodDescription || typeof foodDescription !== "string") {
      return NextResponse.json(
        { error: "Food description is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a nutrition expert. Analyze food descriptions and return ONLY valid JSON with nutrition data. Always return a JSON object with these exact fields: name (string), calories (number), protein (number in grams), carbs (number in grams), fats (number in grams), fiber (number in grams). Optionally include weight (string) if mentioned. Do not include any text outside the JSON.",
          },
          {
            role: "user",
            content: `Analyze this food entry and return nutrition info as JSON: "${foodDescription}". Return only valid JSON with fields: name, calories, protein, carbs, fats, fiber, and optionally weight.`,
          },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: `OpenAI API error: ${errorData.error?.message || response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No response content from OpenAI" },
        { status: 500 }
      );
    }

    // Parse the JSON response
    const nutritionData = JSON.parse(content);

    // Validate and format the response
    const foodItem: FoodItem = {
      name: nutritionData.name || foodDescription,
      calories: Number(nutritionData.calories) || 0,
      protein: Number(nutritionData.protein) || 0,
      carbs: Number(nutritionData.carbs) || 0,
      fats: Number(nutritionData.fats) || 0,
      fiber: Number(nutritionData.fiber) || 0,
    };

    // Add weight if provided
    if (nutritionData.weight) {
      foodItem.weight = String(nutritionData.weight);
    }

    return NextResponse.json(foodItem);
  } catch (error) {
    console.error("Error in nutrition API route:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to analyze food entry",
      },
      { status: 500 }
    );
  }
}

