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
  {
    id: "panda-express-plate",
    title: "Plate (1/2 white rice, 1/2 super greens, orange chicken, mushroom chicken) (HA)",
    mealType: "dinner",
    cuisine: "asian",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "unhealthy",
    eatOut: true,
    restaurantIds: restaurantIdsByName("Panda Express"),
    description:
      "At **Panda Express**, a **plate**: **half white rice**, **half super greens**, **orange chicken**, and **mushroom chicken**.",
  },
  {
    id: "in-n-out-protein-style",
    title: "Hamburger protein style, no onion, and fries (HA)",
    mealType: "lunch",
    cuisine: "american",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "unhealthy",
    eatOut: true,
    restaurantIds: restaurantIdsByName("In-N-Out Burger"),
    description:
      "At **In-N-Out**, a **hamburger protein style** (lettuce wrap), **no onion**, and **fries**.",
    notes:
      "Protein style replaces the bun with lettuce. Repeat no onion if they ask about spread or grilled onions.",
  },
  {
    id: "chick-fil-a-grilled-nuggets",
    title: "Grilled chicken nuggets, and waffle fries, with lemonade (HA)",
    mealType: "lunch",
    cuisine: "american",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "moderate",
    eatOut: true,
    restaurantIds: restaurantIdsByName("Chick-fil-A"),
    description:
      "At **Chick-fil-A**, **grilled chicken nuggets**, **waffle fries**, and a **lemonade**.",
  },
  {
    id: "fiiz-pirate-jack",
    title: "Pirate Jack (24 oz., Dr. Pepper, no cream) (HA)",
    mealType: "snack",
    cuisine: "american",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "unhealthy",
    eatOut: true,
    restaurantIds: restaurantIdsByName("FiiZ Drinks"),
    description: "At **FiiZ**, a **Pirate Jack**: **24 oz Dr. Pepper**, **no cream**.",
    notes: "Ask for no cream so it stays a straight Dr. Pepper, not a dirty soda.",
  },
  {
    id: "dominos-gf-ham",
    title: "Gluten-free crust, ham and olives or mushrooms (HA)",
    mealType: "dinner",
    cuisine: "italian",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "moderate",
    eatOut: true,
    restaurantIds: restaurantIdsByName("Domino's"),
    description: "At **Domino's**, **gluten-free crust** with **ham** and **olives or mushrooms**.",
    notes:
      "Olives or mushrooms — whichever they have that night. Gluten-free crust is the required base.",
  },
  {
    id: "joy-luck-strawberry-chicken",
    title: "Egg drop soup, white rice, GF Strawberry Chicken (HA)",
    mealType: "dinner",
    cuisine: "asian",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "unhealthy",
    eatOut: true,
    restaurantIds: restaurantIdsByName("Joy Luck"),
    description:
      "At **Joy Luck**, **egg drop soup**, **white rice**, and **GF strawberry chicken**.",
    notes: "Ask for gluten-free strawberry chicken. White rice, not fried rice.",
  },
];
