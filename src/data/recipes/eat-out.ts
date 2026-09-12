import { restaurantIdsByName } from "../restaurants/index.ts";
import type { EatOutRecipe } from "../types.ts";

export const eatOut: EatOutRecipe[] = [
  {
    id: "noodles-and-company-pad-thai",
    title: "Pad Thai, with Shrimp, no green onions (HA)",
    mealType: "dinner",
    cuisine: "asian",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "moderate",
    eatOut: true,
    restaurantIds: restaurantIdsByName("Noodles & Company"),
    description:
      "At **Noodles & Company**, order **Pad Thai with shrimp** and **no green onions**. Keep the rice noodles, egg, bean sprouts, peanuts, and lime as they come.",
    notes:
      "Green onions are the usual skip. If the line asks about toppings, repeat no green onions.",
  },
  {
    id: "blaze-pizza-ham-mushroom",
    title:
      "Build your own pizza, gluten-free crust, classic red sauce, ham and mushrooms, oregano (HA)",
    mealType: "dinner",
    cuisine: "italian",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "moderate",
    eatOut: true,
    restaurantIds: restaurantIdsByName("Blaze Pizza"),
    description:
      "At **Blaze Pizza**, build your own: **gluten-free crust**, **classic red sauce**, **ham** and **mushrooms**, and **oregano**. Skip cheese.",
    notes: "Stay off the cheese station. Oregano is at the finish with the other dried herbs.",
  },
];
