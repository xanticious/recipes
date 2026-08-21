import type { EatOutRecipe } from "../types.ts";

export const eatOut: EatOutRecipe[] = [
  {
    id: "cfa-grilled-nuggets",
    title: "Chick-fil-A Grilled Nuggets",
    mealType: "lunch",
    cuisine: "american",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "healthy",
    eatOut: true,
    description:
      "Order **grilled nuggets**, no bun, no sauce. Skip the waffle fries. Fruit cup is fine if it is berries or melon; skip it if it is apple. A side salad with oil and vinegar (no ranch, no crispy onions) is the usual add-on.",
    notes:
      "Sauces often hide honey, onion, or dairy. Eat the chicken plain or with a packet of mustard.",
  },
  {
    id: "grocery-rotisserie-plate",
    title: "Grocery Rotisserie Chicken Plate",
    mealType: "dinner",
    cuisine: "american",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "healthy",
    eatOut: true,
    description:
      "A supermarket rotisserie chicken with **plain rice** or a baked potato and a cooked vegetable that is not cauliflower. Skip the gravy (onion and gluten) and the creamy sides. Skin can come off if the meal already feels rich.",
  },
  {
    id: "salmon-poke-simple",
    title: "Salmon Poke Bowl (No Onion, No Avocado)",
    mealType: "lunch",
    cuisine: "asian",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "healthy",
    eatOut: true,
    description:
      "Salmon or tuna over **white rice**, cucumber, carrot, sesame seeds, and gluten-free soy sauce or tamari. No onion, no green onion pile, no avocado, no spicy mayo. Ask them to leave the sauce on the side if you are not sure what is in it.",
  },
  {
    id: "chipotle-chicken-bowl",
    title: "Chipotle Chicken Bowl",
    mealType: "lunch",
    cuisine: "mexican",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "moderate",
    eatOut: true,
    description:
      "Chicken, rice, beans, fajita vegetables, salsa, cheese, and sour cream as ordered on a typical night. Fajita vegetables and most salsas include onion. Cheese and sour cream add lactose. Not HA as usually built.",
    relatedRecipeIds: ["burrito-bowl"],
  },
  {
    id: "mcdonalds-big-mac",
    title: "McDonald’s Big Mac",
    mealType: "lunch",
    cuisine: "american",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "unhealthy",
    eatOut: true,
    description:
      "The usual Big Mac: bun, two patties, special sauce, cheese, pickle, onion. Gluten, lactose, onion, and a high fat ratio. Fries on the side make it heavier.",
  },
  {
    id: "pepperoni-pizza-night",
    title: "Pepperoni Pizza (Takeout)",
    mealType: "dinner",
    cuisine: "italian",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "unhealthy",
    eatOut: true,
    description:
      "A regular takeout pepperoni pizza: wheat crust, mozzarella, pepperoni. Gluten and lactose. Fine as an occasional meal, not HA.",
  },
  {
    id: "pad-thai-takeout",
    title: "Pad Thai Takeout",
    mealType: "dinner",
    cuisine: "asian",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "moderate",
    eatOut: true,
    description:
      "Rice-noodle pad Thai from a neighborhood shop, usually with shrimp or chicken, egg, bean sprouts, and a sweet tamarind sauce. Often includes shallot or garlic in the paste, and the sauce can be heavy. Not HA unless you have a shop that will cook a garlic-free, onion-free version on request.",
  },
  {
    id: "burger-and-fries",
    title: "Burger and Fries",
    mealType: "dinner",
    cuisine: "american",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "unhealthy",
    eatOut: true,
    description:
      "A diner or fast-food burger with the bun, cheese, and a side of fries. Gluten, lactose if there is cheese, onion if it is dressed, and a high fat ratio. A bunless patty with no cheese and a side salad is a different order — file that separately if it becomes a regular.",
  },
];
