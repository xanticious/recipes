import { getIngredient, type IngredientLookup } from "./lookup.ts";
import { DIET_TAGS } from "./tags.ts";
import type {
  DietTag,
  IngredientLine,
  IngredientSelection,
  Recipe,
  RecipeSelections,
  SubstitutionGroup,
  SubstitutionOption,
} from "./types.ts";

export function lineSlot(line: IngredientLine): string {
  return line.slot ?? line.ingredientId;
}

export function substitutionTags(line: IngredientLine): DietTag[] {
  const found = new Set<DietTag>();
  for (const group of line.substitutions ?? []) {
    for (const tag of group.tags) {
      found.add(tag);
    }
  }
  return DIET_TAGS.filter((tag) => found.has(tag));
}

export function groupForTag(line: IngredientLine, tag: DietTag): SubstitutionGroup | undefined {
  return line.substitutions?.find((group) => group.tags.includes(tag));
}

export function optionLabel(option: SubstitutionOption, lookup: IngredientLookup): string {
  if (option.label) {
    return option.label;
  }
  if (option.ingredientId === null) {
    return "Leave it out";
  }
  return getIngredient(lookup, option.ingredientId).name;
}

export function optionStepPhrase(option: SubstitutionOption, lookup: IngredientLookup): string {
  if (option.stepPhrase) {
    return option.stepPhrase;
  }
  if (option.ingredientId === null) {
    return "nothing";
  }
  return getIngredient(lookup, option.ingredientId).name;
}

export type ResolvedLine = {
  slot: string;
  omitted: boolean;
  line: IngredientLine;
  label: string;
  stepPhrase: string;
  selected: IngredientSelection | undefined;
};

function applyOption(line: IngredientLine, option: SubstitutionOption): IngredientLine {
  if (option.ingredientId === null) {
    return { ...line, substitutions: undefined };
  }
  return {
    ...line,
    ingredientId: option.ingredientId,
    amount: option.amount !== undefined ? option.amount : line.amount,
    unit: option.unit !== undefined ? option.unit : line.unit,
    preparation: option.preparation !== undefined ? option.preparation : line.preparation,
    substitutions: undefined,
  };
}

export function resolveLine(
  line: IngredientLine,
  selection: IngredientSelection | undefined,
  lookup: IngredientLookup,
): ResolvedLine {
  const slot = lineSlot(line);
  const name = getIngredient(lookup, line.ingredientId).name;
  if (!selection) {
    return {
      slot,
      omitted: false,
      line,
      label: name,
      stepPhrase: name,
      selected: undefined,
    };
  }

  const group = groupForTag(line, selection.tag);
  const option = group?.options[selection.optionIndex];
  if (!option) {
    return {
      slot,
      omitted: false,
      line,
      label: name,
      stepPhrase: name,
      selected: undefined,
    };
  }

  const omitted = option.ingredientId === null;
  return {
    slot,
    omitted,
    line: applyOption(line, option),
    label: optionLabel(option, lookup),
    stepPhrase: optionStepPhrase(option, lookup),
    selected: selection,
  };
}

export function resolveRecipeLines(
  recipe: Recipe,
  selections: RecipeSelections,
  lookup: IngredientLookup,
): ResolvedLine[] {
  return recipe.ingredients.map((line) => resolveLine(line, selections[lineSlot(line)], lookup));
}

const PLACEHOLDER = /\{\{([\s\S]*?)\}\}/g;

export function fillStep(
  template: string,
  slots: ReadonlyMap<string, Pick<ResolvedLine, "omitted" | "stepPhrase">>,
): string {
  const filled = template.replace(PLACEHOLDER, (_match, body: string) => {
    const colon = body.indexOf(":");
    if (colon === -1) {
      const slot = slots.get(body.trim());
      if (!slot || slot.omitted) {
        return "";
      }
      return slot.stepPhrase;
    }

    const slotId = body.slice(0, colon).trim();
    const rest = body.slice(colon + 1);
    const pipe = rest.indexOf("|");
    const present = pipe === -1 ? rest : rest.slice(0, pipe);
    const omittedText = pipe === -1 ? "" : rest.slice(pipe + 1);
    const slot = slots.get(slotId);
    if (!slot || slot.omitted) {
      return omittedText;
    }
    return present.replaceAll("{name}", slot.stepPhrase);
  });

  return filled
    .replace(/[ \t]{2,}/g, " ")
    .replace(/ +\n/g, "\n")
    .trim();
}

export function fillRecipeSteps(recipe: Recipe, resolved: readonly ResolvedLine[]): string[] {
  const slots = new Map(resolved.map((item) => [item.slot, item]));
  return recipe.steps.map((step) => fillStep(step, slots)).filter((step) => step.length > 0);
}

export function substitutionCandidateIds(line: IngredientLine): (string | null)[] {
  const ids: (string | null)[] = [line.ingredientId];
  for (const group of line.substitutions ?? []) {
    for (const option of group.options) {
      ids.push(option.ingredientId);
    }
  }
  return ids;
}
