export interface BabyProfile {
  name: string;
  weight: string; // in kg
  height: string; // in cm
  ageMonths: number;
  stage: "embarazo" | "recien-nacido" | "6-12-meses" | "1-3-anos" | "3-5-anos";
}

export interface Recipe {
  id: string;
  name: string;
  stage: "embarazo" | "recien-nacido" | "6-12-meses" | "1-3-anos" | "3-5-anos";
  time: string;
  ingredients: string[];
  instructions: string[];
  nutrients: {
    carbs: string;
    proteins: string;
    fats: string;
    calories: string;
  };
  imageColor: string; // Tailwind color classes for card accent
}

export interface Message {
  id: string;
  sender: "user" | "nutrin";
  text: string;
  timestamp: string;
}

export interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  role: string;
  content: string;
  likes: number;
  replies: number;
  date: string;
  avatarColor: string;
}

export interface HabitTracker {
  water: number; // glasses out of 4
  veggies: number; // portions out of 3
  fruits: number; // portions out of 3
}
