import { expect, test } from "vitest";
import { HA_STATUSES } from "./ha.ts";
import {
  CUISINES,
  CUISINE_LABELS,
  EAT_OUT_FILTER_LABELS,
  HA_FILTER_LABELS,
  HA_FILTERS,
  HA_FULL_LABEL,
  HA_LABEL,
  HA_TAG_LABELS,
  HA_TAG_TITLES,
  HEALTH_RATING_LABELS,
  HEALTH_RATINGS,
  INGREDIENT_HA_FILTER_LABELS,
  INGREDIENT_HA_FILTERS,
  INGREDIENT_HA_TAG_LABELS,
  INGREDIENT_HA_TAG_TITLES,
  MEAL_IDEA_OCCASION_LABELS,
  MEAL_IDEA_OCCASIONS,
  MEAL_IDEA_REGION_ABBREVS,
  MEAL_IDEA_REGION_LABELS,
  MEAL_IDEA_REGIONS,
  MEAL_TYPE_LABELS,
  MEAL_TYPES,
  RECIPE_HA_TAG_LABELS,
  RECIPE_HA_TAG_TITLES,
  TERNARY_FILTERS,
} from "./tags.ts";

test("filter lists cover the tagged values and every value has a label", () => {
  expect(HA_LABEL).toBe("HA");
  expect(HA_FULL_LABEL).toBe("House Approved");
  expect(MEAL_IDEA_OCCASIONS).toEqual([...MEAL_TYPES, "drinks"]);
  expect(HA_FILTERS).toEqual(["all", ...HA_STATUSES]);
  expect(INGREDIENT_HA_FILTERS).toEqual(HA_FILTERS);
  expect(INGREDIENT_HA_FILTER_LABELS).toEqual(HA_FILTER_LABELS);
  expect(INGREDIENT_HA_TAG_LABELS).toEqual(HA_TAG_LABELS);
  expect(INGREDIENT_HA_TAG_TITLES).toEqual(HA_TAG_TITLES);
  expect(RECIPE_HA_TAG_LABELS).toEqual(HA_TAG_LABELS);
  expect(RECIPE_HA_TAG_TITLES).toEqual(HA_TAG_TITLES);

  for (const meal of MEAL_TYPES) {
    expect(MEAL_TYPE_LABELS[meal].length).toBeGreaterThan(0);
  }
  for (const occasion of MEAL_IDEA_OCCASIONS) {
    expect(MEAL_IDEA_OCCASION_LABELS[occasion].length).toBeGreaterThan(0);
  }
  for (const region of MEAL_IDEA_REGIONS) {
    expect(MEAL_IDEA_REGION_LABELS[region].length).toBeGreaterThan(0);
    expect(MEAL_IDEA_REGION_ABBREVS[region].length).toBeGreaterThan(0);
  }
  for (const cuisine of CUISINES) {
    expect(CUISINE_LABELS[cuisine].length).toBeGreaterThan(0);
  }
  for (const rating of HEALTH_RATINGS) {
    expect(HEALTH_RATING_LABELS[rating].length).toBeGreaterThan(0);
  }
  for (const filter of TERNARY_FILTERS) {
    expect(EAT_OUT_FILTER_LABELS[filter].length).toBeGreaterThan(0);
  }
  for (const filter of HA_FILTERS) {
    expect(HA_FILTER_LABELS[filter].length).toBeGreaterThan(0);
  }
  for (const status of HA_STATUSES) {
    expect(HA_TAG_LABELS[status].length).toBeGreaterThan(0);
    expect(HA_TAG_TITLES[status].length).toBeGreaterThan(0);
  }
});
