import type { SubstitutionGroup, SubstitutionOption } from "./types.ts";

export function omitOption(label: string, stepPhrase?: string): SubstitutionOption {
  return { ingredientId: null, label, stepPhrase: stepPhrase ?? label };
}

export function cheeseSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [
        omitOption("Leave cheese out", "no cheese"),
        { ingredientId: "lactose-free-cheddar" },
        { ingredientId: "lactose-free-cheese-curds" },
      ],
    },
    {
      tags: ["vegan"],
      options: [omitOption("Leave cheese out", "no cheese"), { ingredientId: "vegan-cheese" }],
    },
  ];
}

export function fetaSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [omitOption("Leave feta out", "no feta"), { ingredientId: "lactose-free-feta" }],
    },
    {
      tags: ["vegan"],
      options: [omitOption("Leave feta out", "no feta")],
    },
  ];
}

export function yogurtGarnishSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [
        omitOption("Leave yogurt out", "no yogurt"),
        { ingredientId: "lactose-free-yogurt" },
        { ingredientId: "coconut-yogurt" },
      ],
    },
    {
      tags: ["vegan"],
      options: [omitOption("Leave yogurt out", "no yogurt"), { ingredientId: "coconut-yogurt" }],
    },
  ];
}

export function yogurtBaseSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [{ ingredientId: "lactose-free-yogurt" }, { ingredientId: "coconut-yogurt" }],
    },
    {
      tags: ["vegan"],
      options: [{ ingredientId: "coconut-yogurt" }],
    },
  ];
}

export function sourCreamSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [
        omitOption("Leave sour cream out", "no sour cream"),
        { ingredientId: "lactose-free-sour-cream" },
        { ingredientId: "lactose-free-yogurt" },
        { ingredientId: "coconut-yogurt" },
      ],
    },
    {
      tags: ["vegan"],
      options: [
        omitOption("Leave sour cream out", "no sour cream"),
        { ingredientId: "coconut-yogurt" },
      ],
    },
  ];
}

export function creamCheeseSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [{ ingredientId: "lactose-free-cream-cheese" }],
    },
    {
      tags: ["vegan"],
      options: [omitOption("Leave cream cheese out", "no cream cheese")],
    },
  ];
}

export function milkSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [{ ingredientId: "lactose-free-milk" }, { ingredientId: "coconut-milk" }],
    },
    {
      tags: ["vegan"],
      options: [{ ingredientId: "coconut-milk" }],
    },
  ];
}

export function honeySubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["low-fructose", "vegan"],
      options: [{ ingredientId: "maple-syrup" }, omitOption("Leave honey out", "no honey")],
    },
  ];
}

export function brownSugarSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["low-fructose"],
      options: [{ ingredientId: "white-sugar" }, { ingredientId: "maple-syrup" }],
    },
  ];
}

export function soySauceSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["paleo"],
      options: [{ ingredientId: "coconut-aminos" }],
    },
  ];
}

export function alliumSubstitutions(label: string, stepPhrase: string): SubstitutionGroup[] {
  return [
    {
      tags: ["low-fructan", "low-oligosaccharide", "low-fodmap", "low-fop"],
      options: [omitOption(label, stepPhrase)],
    },
  ];
}

export function cottageCheeseSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [{ ingredientId: "lactose-free-yogurt" }, { ingredientId: "coconut-yogurt" }],
    },
    {
      tags: ["vegan"],
      options: [{ ingredientId: "coconut-yogurt" }],
    },
  ];
}

export function ricottaSubstitutions(): SubstitutionGroup[] {
  return [
    {
      tags: ["lactose-free"],
      options: [{ ingredientId: "lactose-free-cream-cheese" }],
    },
    {
      tags: ["vegan"],
      options: [omitOption("Leave ricotta out", "no ricotta")],
    },
  ];
}

export function garlicOilSwap(): SubstitutionGroup[] {
  return [
    {
      tags: ["low-fructan", "low-oligosaccharide", "low-fodmap", "low-fop"],
      options: [
        {
          ingredientId: "garlic-infused-oil",
          label: "Garlic-infused oil",
          stepPhrase: "garlic-infused oil",
        },
      ],
    },
  ];
}
