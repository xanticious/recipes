# Recipe culinary review

Strict cook-through of every home recipe in the catalog (692) against the rubric below. Eat-out entries (8) have no ingredient lists or steps; they are noted at the end, not scored on C3–C5.

This is evaluation only. Do not treat anything here as a fix list to apply blindly — later we will repair recipes one by one.

## Rubric

1. **Missing HA alternate.** If the plate is not House Approved, should a separate HA recipe exist? Household-acceptable building blocks: sourdough bread, black beans, butter, almond milk, gluten-free flour used to _make_ a dough or batter, white sugar, Daiya cheddar for cheddar, Follow Your Heart American for American cheese, gluten-free pasta / rice / rice noodles, corn tortillas, gluten-free soy sauce / tamari / coconut aminos, maple syrup for honey, garlic-infused oil for garlic, scallion greens or chives for onion, cooked mushrooms for raw mushrooms. Smoothies may be strawberries, sugar, almond milk, or lactose-free ice cream. Lactose-free milk is **not** HA in this catalog. Parmesan, mozzarella, ricotta, yogurt, sour cream, avocado, banana, canned tuna, white fish, and cottage cheese generally cannot be swapped while keeping the same dish identity. If the dish _is_ that ingredient (avocado toast, tuna salad, banana bread), an HA alternate of that name is not required.
2. **Pair substitution quality.** When a regular and HA sibling exist, the swap must be something a cook can actually execute. Gluten-free flour is not puff pastry, crescent-roll dough, or a pie crust until you make a dough. Corn tortillas are not pizza dough. Warm bread is not croissants or doughnuts.
3. **Steps ⊆ listed ingredients.** Instructions may only call for ingredients on the list. Boiling water for pasta, and “oil / salt / pepper” as shorthand for listed olive oil, salt, and black pepper, are allowed. Marinara, pesto, lemon, coffee, mustard, dough, and pastry shells are not allowed unless listed (or produced in a previous step from listed ingredients).
4. **The recipe produces the titled food.** Technique, structure, and ratios must be capable of yielding that dish — not a polite cousin with the same name.
5. **Listed ingredients ⊆ steps.** Every line on the ingredient list must be referred to in at least one step (short names are fine: vanilla extract → vanilla, chicken thighs → chicken, strawberries + blueberries → berries). Optional ingredients still need an optional clause in a step. Notes do not count.

## Method

- Read every home recipe’s title, HA tag, related IDs (treated as bidirectional), ingredient list, and steps.
- HA pairing uses both `relatedRecipeIds` and reverse links. Several Italian HA plates only point one way; they still count as pairs.
- Ingredient-in-step matching allows ordinary cook shorthand. Failures below are ones that survive that leniency, or that I confirmed by reading the steps.
- C4 fails are only recorded when I would not serve the result under that name.
- Later passes on breakfast, lunch, snack, dessert, dinner, and the meal-idea files added missing HA siblings where a topping was not the dish, and flagged name-preserving swaps that do not yield the titled food (salsa → diced tomato, enchilada sauce → crushed tomatoes, chipotle → paprika, Parmesan → nutritional yeast, pastry stand-ins).
- A final pass on all 251 HA conversions confirmed those pastry, marinara, and identity-swap failures. It also found leftover garlic _units_ that cannot be cooked (oil listed as a halved head), leftover cream/cheese wording after dairy swaps, and crushed-tomato lines that steps never name. Garlic-infused oil marked only “minced” is left as the catalog-wide data-entry pattern below — the steps usually still say to stir in the oil.

## Summary

|                                         | Count |
| --------------------------------------- | ----: |
| Home recipes reviewed                   |   692 |
| Recipes with at least one fail          |   182 |
| Clean on all five (or n/a / not needed) |   510 |
| C1 fail (HA alternate should exist)     |    32 |
| C2 fail (bad pair swap)                 |   115 |
| C3 fail (steps name unlisted food)      |    52 |
| C4 fail (will not produce the food)     |    54 |
| C5 fail (listed ingredient never used)  |    28 |

## Systemic patterns

These show up often enough that they are catalog bugs, not one-off typos.

**Flour treated as pastry.** `toaster-strudel-ha`, `cinnamon-rolls-ha`, `hot-pockets-ha`, `fruit-pie-ha`, `meat-pie-ha`, and `cannoli-ha` list gluten-free flour (sometimes with unit `sheet` or `tube`, or preparation “thawed”) and then write steps for puff pastry, crescent-roll dough, or pie crust. That is exactly the illegal substitution: you cannot drop flour in for pastry. You _can_ use the flour to make a dough — those recipes never do.

**Marinara left in the method after the list was “HA-ified”.** Many Italian HA plates replace jar marinara with crushed tomatoes (and often garlic-infused oil + chives), then still say “spoon marinara” / “pour in the marinara”. The cook is sent looking for an ingredient that is not there, and the notes sometimes still warn that marinara has onion and garlic — which is the leftover comment from the regular recipe.

**Garlic-infused oil marked “minced”.** Dozens of HA conversions copy the garlic line, change the id to `garlic-infused-oil`, and leave `preparation: "minced"` (sometimes “smashed” or “sliced”). Oil is not minced. The steps usually recover (“stir in the garlic-infused oil”), so leftover prep text is a data-entry tell, not a per-recipe C2/C4 fail. The exception is when the _amount and unit_ are still garlic: `sunday-roast-chicken-ha` lists one `head`, “halved crosswise.” That line cannot be cooked.

**Bread or tortillas standing in for a named bakery item.** Doughnuts, croissants, crumpets, English muffins, brioche, pan dulce, Weet-Bix, leftover muffin, and pizza HA versions keep the original name and swap in sandwich bread, sourdough, rice cakes, or corn tortillas without changing the method to match.

**Titled HA but not HA.** `fettuccine-alfredo-ha` still uses lactose-free milk and Parmesan (both `not-ha-confirmed`). The notes claim Parmesan is the household lactose-clear hard cheese; the catalog disagrees. Related-recipe wiring on `fettuccine-alfredo` also points at a dozen unrelated Italian HA plates.

**One-way related links.** HA Italian dinners point at their non-HA siblings; the non-HA recipes often do not point back (except Alfredo, which points at everyone). Pairing still exists; the UI “Related recipes” on the non-HA page will hide the conversion.

## Findings (failures only)

### Migas (Not-HA) (`migas`)

- **C5 unused listed ingredient:** Salt is listed and never used in a step.

### Baked Oatmeal (Not-HA) (`baked-oatmeal`)

- **C1 missing HA alternate:** The dish is baked oatmeal, not banana bread. Almond milk for lactose-free milk, skip the banana, keep the blueberries.

### Peanut Butter Toast (Not-HA) (`peanut-butter-toast`)

- **C1 missing HA alternate:** The title is peanut butter toast. Banana is a topping; maple already replaces honey.

### Smoothie Bowl (Not-HA) (`smoothie-bowl`)

- **C1 missing HA alternate:** A bowl can be strawberries, sugar, and almond milk (or lactose-free ice cream), kept thick and topped. Banana and Greek yogurt are not required.

### Salmon and Egg Toast (Not-HA) (`salmon-egg-toast`)

- **C1 missing HA alternate:** Canned salmon is not-HA; smoked salmon is HA-confirmed, and lactose-free cream cheese is HA-confirmed. Eggs on toast still stand.

### Ricotta Toast (Not-HA) (`ricotta-toast`)

- **C2 substitution:** The HA sibling spreads coconut yogurt and still calls it ricotta toast. That is yogurt toast.

### Leftover Chicken Wrap (Not-HA) (`leftover-chicken-wrap`)

- **C1 missing HA alternate:** Chicken wrap without avocado, with Daiya or no cheese, corn tortilla or sourdough if needed. Avocado is a topping, not the dish.

### Cobb Salad (Not-HA) (`cobb-salad`)

- **C1 missing HA alternate:** Omit avocado; swap cheddar for Daiya. The salad still stands.

### Veggie Wrap (Not-HA) (`veggie-wrap`)

- **C1 missing HA alternate:** Lactose-free cream cheese exists and is HA; omit avocado. A vegetable wrap remains.

### Caprese Salad (Not-HA) (`caprese-salad`)

- **C2 substitution:** The HA sibling tucks Daiya cheddar shreds between tomatoes. Caprese without mozzarella is tomato and basil, not Caprese. Shreds also cannot be “sliced” into the usual coins.

### Burrito Bowl (Not-HA) (`burrito-bowl`)

- **C4 will not yield the food:** 1.5 lb chicken breast is seasoned and cooked in a dry skillet with no fat listed. Lean breast will stick and cook unevenly.

### Salmon Salad (Not-HA) (`salmon-salad`)

- **C1 missing HA alternate:** Use fresh or smoked salmon (HA-confirmed) and omit avocado. Greens, cucumber, and the lemon-dill dressing still make the salad.

### Sushi Bowl (Not-HA) (`sushi-bowl`)

- **C1 missing HA alternate:** Shrimp is already HA. Avocado is a topping. Rice, vinegar, cucumber, carrot, nori, and soy still make the bowl.

### Pesto Pasta (Not-HA) (`pesto-pasta-lunch`)

- **C2 substitution:** The HA sibling tosses hot pasta with raw basil leaves and pasta water, then dolls coconut yogurt on top. That is not pesto and will not make pesto pasta.

### Rice Cakes with Almond Butter (Not-HA) (`rice-cakes-almond-butter`)

- **C1 missing HA alternate:** The named dish is rice cakes and almond butter. Banana is a topping; honey already has a maple swap.

### Salsa and Chips (Not-HA) (`salsa-and-chips`)

- **C2 substitution:** The HA sibling pours diced tomatoes in a bowl and calls it salsa.

### Snack Nachos (Not-HA) (`snack-nachos`)

- **C2 substitution:** Pair exists; the HA side drops salsa for plain diced tomatoes.

### Agua Fresca (Not-HA) (`agua-fresca`)

- **C1 missing HA alternate:** Watermelon is one agua fresca. Strawberries, lime, water, and sugar already make an HA version.

### Fruit Cup (Not-HA) (`fruit-cup`)

- **C1 missing HA alternate:** Grapes are one fruit in a mixed cup. Strawberries, blueberries, and orange already make an HA fruit cup.

### Cinnamon Baked Apples (Not-HA) (`cinnamon-baked-apples`)

- **C3 unlisted in steps:** A splash of water goes into the baking dish and is not listed.

### Mango Sticky Rice (Not-HA) (`mango-sticky-rice`)

- **C4 will not yield the food:** Boiled jasmine rice does not make sticky rice. The notes admit the stand-in; the title still promises sticky rice.

### Baked Pears (Not-HA) (`baked-pears`)

- **C3 unlisted in steps:** A splash of water goes into the baking dish and is not listed.

### Rice Paper Rolls (HA) (`rice-paper-rolls`)

- **C3 unlisted in steps:** Steps refer to peanut sauce; it is not listed.

### Shepherd's Pie (Not-HA) (`shepherds-pie`)

- **C1 missing HA alternate:** Use beef (or keep lamb if you later confirm it), chives, garlic-infused oil, almond milk, Daiya. This is a weeknight cottage pie and should have an HA sibling.

### Cabbage and Sausage (Not-HA) (`cabbage-and-sausage`)

- **C1 missing HA alternate:** Omit the apple (or the sausage if that is the blocker). Cabbage and a confirmed HA sausage still make the plate.

### Shrimp Tacos (Not-HA) (`shrimp-tacos`)

- **C1 missing HA alternate:** Shrimp is already HA-confirmed. Omit avocado, skip chili-powder blends (use cumin/paprika/cayenne), skip yogurt or use coconut yogurt.

### Tostadas (Not-HA) (`tostadas`)

- **C1 missing HA alternate:** Corn tostadas, beans, salsa made without onion, Daiya. Avocado and sour cream are toppings, not the plate.

### Black Bean Tacos (Not-HA) (`black-bean-tacos`)

- **C1 missing HA alternate:** Black beans are fine. Chives, no chili-powder blend, no avocado, Daiya.

### Chilaquiles (Not-HA) (`chilaquiles`)

- **C1 missing HA alternate:** Chips and eggs work. Hold jar salsa/avocado/dairy or rebuild the sauce.

### Carne Asada (Not-HA) (`carne-asada`)

- **C1 missing HA alternate:** Steak is the dish. Chili-powder blend and avocado garnish can be rewritten.

### Chicken Tortilla Soup (Not-HA) (`chicken-tortilla-soup`)

- **C1 missing HA alternate:** Chicken, broth, tomatoes, corn tortillas. Swap onion/garlic/chili powder/dairy; avocado is a garnish.

### Salsa Chicken (Not-HA) (`salsa-chicken`)

- **C2 substitution:** The HA sibling simmers chicken in diced tomatoes. That is tomato chicken, not salsa chicken.

### Salsa Chicken (HA) (`salsa-chicken-ha`)

- **C2 substitution:** Diced tomatoes plus cumin is not salsa.
- **C4 will not yield the food:** This is poached chicken in plain tomatoes, not salsa chicken.

### Parmesan Risotto (Not-HA) (`parmesan-risotto`)

- **C2 substitution:** The HA sibling drops Parmesan for nutritional yeast and keeps the Parmesan name.

### Parmesan Risotto (HA) (`parmesan-risotto-ha`)

- **C2 substitution:** Nutritional yeast risotto can be an HA plate. It is not Parmesan risotto.

### Yogurt-Marinated Chicken (Not-HA) (`yogurt-marinated-chicken`)

- **C2 substitution:** Coconut yogurt will tenderize, but the titled food is yogurt-marinated chicken.

### Yogurt-Marinated Chicken (HA) (`yogurt-marinated-chicken-ha`)

- **C2 substitution:** Rename it coconut-yogurt chicken, or it is a false pair.

### Butter Chicken (HA) (`butter-chicken-ha`)

- **C3 unlisted in steps:** Steps “stir in the cream”; the list has coconut milk, not cream.
- **C5 unused listed ingredient:** Coconut milk is listed and never named.

### Pulled Pork (Not-HA) (`pulled-pork`)

- **C2 substitution:** The HA sibling stirs in 1.5 cups tomato paste instead of barbecue sauce.

### Pulled Pork (HA) (`pulled-pork-ha`)

- **C2 substitution:** Tomato paste is not barbecue sauce.
- **C4 will not yield the food:** A quart-and-a-half of tomato paste folded into shredded pork is a paste sludge, not pulled pork.

### Sunday Roast Chicken (HA) (`sunday-roast-chicken-ha`)

- **C2 substitution:** `garlic-infused-oil` is listed as amount `head`, preparation “halved crosswise.” You cannot halve a bottle of oil like a head of garlic, then toss it with the vegetables.
- **C4 will not yield the food:** That oil line is uncookable as written.

### Chicken Pot Pie (Not-HA) (`chicken-pot-pie`)

- **C5 unused listed ingredient:** Black pepper is listed; the filling step only says “season.”

### Chicken Pot Pie (HA) (`chicken-pot-pie-ha`)

- **C5 unused listed ingredient:** Same leftover: black pepper is listed; the filling step only says “season.”

### Beef Enchiladas (Not-HA) (`beef-enchiladas`)

- **C2 substitution:** The HA sibling pours crushed tomatoes over the rolls. That is not enchilada sauce.

### Beef Enchiladas (HA) (`beef-enchiladas-ha`)

- **C2 substitution:** Crushed tomatoes over rolled tortillas is a baked taco casserole, not enchiladas.

### Chicken Tinga (Not-HA) (`chicken-tinga`)

- **C2 substitution:** The HA sibling replaces chipotle in adobo with smoked paprika (still prepped as “chopped, plus a spoon of sauce”).

### Chicken Tinga (HA) (`chicken-tinga-ha`)

- **C2 substitution:** Tinga without chipotle is shredded chicken in tomato. Smoked paprika is still prepped as “chopped, plus a spoon of sauce.”
- **C3 unlisted in steps:** Steps add chipotle; smoked paprika is what is listed.
- **C4 will not yield the food:** Without chipotle you get shredded chicken in tomato, not tinga.
- **C5 unused listed ingredient:** Smoked paprika is listed and never named.

### Chile Verde (Not-HA) (`chile-verde`)

- **C2 substitution:** The HA sibling swaps salsa verde for diced tomatoes.

### Chile Verde (HA) (`chile-verde-ha`)

- **C2 substitution:** Red tomato stew with jalapeño is not chile verde.
- **C4 will not yield the food:** Diced red tomatoes cannot replace tomatillos or salsa verde. You will make a red pork stew.

### Caprese Chicken (Not-HA) (`caprese-chicken`)

- **C2 substitution:** The HA sibling swaps mozzarella for Daiya cheddar shreds.

### Caprese Chicken (HA) (`caprese-chicken-ha`)

- **C2 substitution:** Cheddar shreds on chicken and tomato is not Caprese chicken.
- **C4 will not yield the food:** Same dish, wrong cheese identity. The pizza/parm cheddar swap does not apply when the title _is_ Caprese.

### Bok Choy Noodles (HA) (`bok-choy-noodles`)

- **C4 will not yield the food:** Eggs are optional, but the method requires scrambling them with no skip path.

### Swedish Meatballs (Not-HA) (`swedish-meatballs`)

- **C2 substitution:** The HA sibling finishes the gravy with coconut yogurt.

### Swedish Meatballs (HA) (`swedish-meatballs-ha`)

- **C2 substitution:** Coconut-yogurt gravy is not Swedish cream gravy.

### Chicken Parmesan (Not-HA) (`chicken-parm`)

- **C2 substitution:** The HA sibling uses Daiya cheddar and nutritional yeast; steps still say marinara after the list became crushed tomatoes.

### Eggplant Parmesan (Not-HA) (`eggplant-parm`)

- **C2 substitution:** Same mozzarella/Parmesan → Daiya/nutritional yeast swap.
- **C5 unused listed ingredient:** Black pepper is listed and never used.

### Lasagna (Not-HA) (`lasagna`)

- **C2 substitution:** Coconut yogurt and Daiya stand in for ricotta and mozzarella; HA steps still say marinara.

### Baked Ziti (Not-HA) (`baked-ziti`)

- **C2 substitution:** Same ricotta/mozzarella identity break as the lasagna pair.

### Fettuccine Alfredo (Not-HA) (`fettuccine-alfredo`)

- **C2 substitution:** The linked HA sibling is not HA and is not Alfredo.
- **C4 will not yield the food:** Titled fettuccine; the listed pasta is spaghetti.

### Pesto Pasta (Not-HA) (`pesto-pasta-dinner`)

- **C2 substitution:** pair exists; HA side does not make pesto.

### Fettuccine Alfredo (HA) (`fettuccine-alfredo-ha`)

- **C1 missing HA alternate:** This is titled HA and is not. Rebuild with almond milk or stock, starch, nutritional yeast. No Parmesan, no lactose-free milk.
- **C2 substitution:** Titled HA but built on lactose-free milk and Parmesan, both not-HA in this catalog. The conversion does not land on an HA plate.
- **C4 will not yield the food:** Will produce a white sauce pasta, but not an HA Alfredo and not a Parmesan-free plate.

### Stuffed Peppers (Not-HA) (`stuffed-peppers-med`)

- **C1 missing HA alternate:** Peppers stuffed with rice and beef; lactose-free feta is HA-confirmed if you want the briny note.
- **C4 will not yield the food:** ¾ cup uncooked rice with one 14 oz can of tomatoes, covered only 35 minutes — the rice will not reliably cook.

### Keema (Not-HA) (`keema`)

- **C1 missing HA alternate:** Same spices and method with beef or turkey, chives, garlic-infused oil.

### Sausage and Sauerkraut (Not-HA) (`sausage-sauerkraut`)

- **C1 missing HA alternate:** Sauerkraut and sausage do not need apple.

### Berry Smoothie (Not-HA) (`berry-smoothie`)

- **C1 missing HA alternate:** You asked for this explicitly: strawberries, sugar, almond milk, or lactose-free ice cream. Drop the banana and Greek yogurt.

### Tea (HA) (`steeped-tea`)

- **C3 unlisted in steps:** Steps say add lemon; lemon is not listed.

### Toaster Pastry (Not-HA) (`pop-tarts`)

- **C2 substitution:** pair exists; HA side is rice cakes.

### Toaster Strudel (Not-HA) (`toaster-strudel`)

- **C2 substitution:** pair exists; HA side is not a workable pastry conversion.

### Doughnuts (Not-HA) (`doughnuts`)

- **C2 substitution:** pair exists; HA side is warmed bread.
- **C3 unlisted in steps:** Steps say serve with coffee; coffee is not listed.

### Croissants (Not-HA) (`croissants`)

- **C2 substitution:** pair exists; HA side is warmed bread.

### Brioche Toast (Not-HA) (`brioche-toast`)

- **C2 substitution:** pair exists; HA side is sourdough toast.

### Pan Dulce (Not-HA) (`pan-dulce`)

- **C2 substitution:** pair exists; HA side is cinnamon toast.

### Cinnamon Rolls (Not-HA) (`cinnamon-rolls`)

- **C2 substitution:** pair exists; HA side treats flour as tube dough.

### Biscuits and Gravy (Not-HA) (`biscuits-and-gravy`)

- **C1 missing HA alternate:** Make a gluten-free biscuit dough (flour + fat + almond milk + leavening) and an almond-milk gravy. Do not list 'biscuit dough' as a frozen wheat product and call it done.

### Hot Pockets (Not-HA) (`hot-pockets`)

- **C2 substitution:** pair exists; HA side treats flour as tube dough.

### Homemade Pizza (Not-HA) (`homemade-pizza`)

- **C2 substitution:** pair exists; HA side is tortilla pizza with dough instructions.

### Baked Mac and Cheese (Not-HA) (`baked-mac-and-cheese`)

- **C5 unused listed ingredient:** Salt is listed and never used in a step.

### Pretzels (Not-HA) (`pretzels-snack`)

- **C3 unlisted in steps:** Steps refer to mustard; mustard is not listed.

### Leftover Muffin or Pastry (Not-HA) (`leftover-muffin`)

- **C2 substitution:** pair exists; HA side is bread, not a muffin.
- **C3 unlisted in steps:** Steps say serve with coffee; coffee is not listed.

### Berry Pie (Not-HA) (`fruit-pie`)

- **C2 substitution:** pair exists; HA side never makes a crust.

### Protein Shake (Not-HA) (`protein-shake`)

- **C1 missing HA alternate:** Only if you have an HA protein powder. Whey is not-HA. Otherwise leave it as a not-HA shake.

### Egg in a Hole (Not-HA) (`egg-in-a-hole`)

- **C5 unused listed ingredient:** Salt is listed and never used in a step.

### English Muffins (Not-HA) (`english-muffins-butter`)

- **C2 substitution:** pair exists; HA side is sandwich bread.

### Weet-Bix (Not-HA) (`weet-bix-bowl`)

- **C2 substitution:** pair exists; HA side is rice cereal.

### Vegemite on Toast (Not-HA) (`vegemite-on-toast`)

- **C2 substitution:** pair exists; HA side swaps mustard for Vegemite.

### Beans on Toast (Not-HA) (`beans-on-toast`)

- **C1 missing HA alternate:** Sourdough plus homemade beans (no onion/garlic in the sauce).

### Crumpets (Not-HA) (`crumpets-butter`)

- **C2 substitution:** pair exists; HA side is sandwich bread.

### Full English Breakfast (Not-HA) (`full-english`)

- **C1 missing HA alternate:** Eggs, bacon, tomatoes, sourdough, and an HA sausage if you have one. Skip baked beans or make a clean pot.

### Peameal Bacon Sandwich (Not-HA) (`peameal-bacon-sandwich`)

- **C2 substitution:** pair exists; HA side calls bread muffins.

### Meat Pie (Not-HA) (`meat-pie`)

- **C2 substitution:** pair exists; HA side never makes a crust.
- **C5 unused listed ingredient:** Salt is listed and never used in a step.

### Ramen (Not-HA) (`ramen-bowl`)

- **C2 substitution:** pair exists; HA side uses rice noodles.

### Udon (Not-HA) (`udon-bowl`)

- **C2 substitution:** pair exists; HA side uses rice noodles.

### Gyro (Not-HA) (`gyro`)

- **C2 substitution:** pair exists; HA side is a corn-tortilla taco.

### Bibimbap (Not-HA) (`bibimbap`)

- **C2 substitution:** pair exists; HA side uses paprika for chile paste.

### Kimchi Jjigae (Not-HA) (`kimchi-jjigae`)

- **C2 substitution:** pair exists; HA side uses paprika for gochugaru.

### Dumplings (Not-HA) (`dumplings`)

- **C2 substitution:** pair exists; HA side uses rice paper as wrappers.

### Coffee (HA) (`drip-coffee`)

- **C3 unlisted in steps:** Steps say add a splash of milk; milk is not listed.

### Bagel and Cream Cheese (Not-HA) (`bagel-and-cream-cheese`)

- **C2 substitution:** The HA sibling toasts gluten-free sandwich bread. That is not a bagel.

### Bagel and Cream Cheese (HA) (`bagel-and-cream-cheese-ha`)

- **C2 substitution:** Lactose-free cream cheese is the right dairy swap. Sandwich bread is not a bagel.
- **C4 will not yield the food:** You get cream-cheese toast, not a bagel. The steps even say “split and toast the gluten-free bread.”

### Crepes (Not-HA) (`crepes`)

- **C3 unlisted in steps:** Serve with jam or leftover ham; neither is listed.

### Crepes (HA) (`crepes-ha`)

- **C3 unlisted in steps:** Same leftover jam/ham line as the regular recipe.

### Espresso (HA) (`espresso`)

- **C5 unused listed ingredient:** Water is listed (2 oz) and never named in a step.

### Youtiao (Not-HA) (`youtiao`)

- **C4 will not yield the food:** A 10-minute baking-powder rest makes fried dough sticks, not youtiao.

### Baozi (Not-HA) (`baozi`)

- **C4 will not yield the food:** Twenty minutes of yeast rest will not give fluffy steamed bao.

### Pão de Queijo (Not-HA) (`pao-de-queijo`)

- **C2 substitution:** The HA sibling swaps Parmesan for nutritional yeast. The cheese is structural here, not a garnish.

### Pão de Queijo (HA) (`pao-de-queijo-ha`)

- **C2 substitution:** Nutritional yeast will not give the stretch or oven spring of cheese bread.
- **C3 unlisted in steps:** Steps “beat in eggs, cheese, and salt”; the cheese was swapped to nutritional yeast.
- **C5 unused listed ingredient:** Nutritional yeast is listed and never named. The tapioca method can still puff.

### Tamales (Not-HA) (`tamales`)

- **C3 unlisted in steps:** Corn husks are named; they are not listed (parchment as cookware is fine, husks are an ingredient).

### Tamales (HA) (`tamales-ha`)

- **C3 unlisted in steps:** Same corn-husk line as the regular recipe.

### Cemita (Not-HA) (`cemita`)

- **C4 will not yield the food:** A hamburger-bun chicken sandwich with avocado and queso fresco is not a cemita.

### Mapo Tofu (Not-HA) (`mapo-tofu`)

- **C2 substitution:** The HA sibling uses paprika for doubanjiang.
- **C3 unlisted in steps:** Serve over rice; rice is not listed.

### Mapo Tofu (HA) (`mapo-tofu-ha`)

- **C2 substitution:** Paprika is not doubanjiang. This is pork and tofu in red powder.
- **C3 unlisted in steps:** Serve over rice; rice is not listed.
- **C4 will not yield the food:** Paprika for doubanjiang strips the dish of its fermented heat. You get pork and tofu in soy sauce, not mapo tofu.

### Chicken Mole (Not-HA) (`chicken-mole`)

- **C3 unlisted in steps:** Serve with rice; rice is not listed.
- **C4 will not yield the food:** Cocoa, chili powder, cinnamon, and tomato paste on chicken is not mole.

### Chicken Mole (HA) (`chicken-mole-ha`)

- **C3 unlisted in steps:** Serve with rice; rice is not listed.
- **C4 will not yield the food:** Same cocoa–paprika–cinnamon shortcut, still not mole.

### Nanaimo Bars (HA) (`nanaimo-bars`)

- **C4 will not yield the food:** An oat–cocoa slab with a thin butter smear and chocolate is not a Nanaimo bar (no graham base, no custard layer).

### Lamingtons (Not-HA) (`lamingtons`)

- **C3 unlisted in steps:** Icing is mixed with hot water and extra sugar; water is not listed.

### Lamingtons (HA) (`lamingtons-ha`)

- **C3 unlisted in steps:** Same unlisted water (and extra sugar) in the icing.

### Barley Tea (Not-HA) (`barley-tea`)

- **C2 substitution:** The HA sibling toasts white rice and calls it barley tea.

### Barley Tea (HA) (`barley-tea-ha`)

- **C2 substitution:** Roasted-rice water is not mugicha.
- **C4 will not yield the food:** Toasted white rice is not roasted barley. This is rice water, not barley tea.

### Moules Frites (Not-HA) (`moules-frites`)

- **C1 missing HA alternate:** Garlic-infused oil instead of garlic. Fries are already fine.
- **C3 unlisted in steps:** Fries are tossed with salt; salt is not listed.

### Onigiri (Not-HA) (`onigiri`)

- **C1 missing HA alternate:** Rice balls without tuna (or with a filling that is HA). Tuna is optional in many versions.

### Potstickers (Not-HA) (`potstickers`)

- **C2 substitution:** pair exists; HA side uses rice paper as wrappers.

### Brigadeiro (Not-HA) (`brigadeiro`)

- **C2 substitution:** pair exists; HA side cannot set without condensed milk.

### Sticky Toffee Pudding (Not-HA) (`sticky-toffee-pudding`)

- **C1 missing HA alternate:** A steamed or baked sponge can be made with gluten-free flour, sugar, and maple. Dates may still be a FODMAP issue — if dates stay, this becomes not needed.
- **C4 will not yield the food:** The bake is a date cake. There is no toffee sauce.

### Tiramisu (Not-HA) (`tiramisu`)

- **C2 substitution:** pair exists; HA side is coffee-soaked sandwich bread.

### Gelato (Not-HA) (`gelato`)

- **C2 substitution:** pair exists; HA side is scooped ice cream.

### Tres Leches Cake (Not-HA) (`tres-leches`)

- **C2 substitution:** pair exists; HA soak does not match the listed milks.

### Cannoli (Not-HA) (`cannoli`)

- **C2 substitution:** pair exists; HA side never makes shells.

### Bubble Tea (Not-HA) (`bubble-tea`)

- **C2 substitution:** pair exists; HA side cannot form pearls from starch.

### Migas (HA) (`migas-ha`)

- **C5 unused listed ingredient:** Salt is listed and never used in a step.

### Pesto Pasta (HA) (`pesto-pasta-lunch-ha`)

- **C2 substitution:** Raw basil and pasta water will not emulsify into pesto. Coconut yogurt on top is not a pesto substitute.
- **C4 will not yield the food:** Title promises pesto; the method makes a herb toss.

### Ricotta Toast (HA) (`ricotta-toast-ha`)

- **C2 substitution:** Coconut yogurt on toast is a fine HA breakfast. It is not ricotta toast.
- **C4 will not yield the food:** You get sweet yogurt toast, not ricotta toast.

### Caprese Salad (HA) (`caprese-salad-ha`)

- **C2 substitution:** Daiya cheddar shreds between tomato slices will not read as Caprese, and shreds are not mozzarella coins.
- **C4 will not yield the food:** Caprese _is_ the mozzarella. Cheddar shreds between tomatoes will not produce it.

### Salsa and Chips (HA) (`salsa-and-chips-ha`)

- **C2 substitution:** Plain diced tomatoes are not salsa. An HA salsa can be tomato, lime, jalapeño, cilantro, and salt.
- **C4 will not yield the food:** Chips and raw tomato cubes are not salsa and chips.

### Snack Nachos (HA) (`snack-nachos-ha`)

- **C2 substitution:** Daiya for cheddar is the household swap. Replacing salsa with unseasoned diced tomatoes is not.

### Meatballs and Rice (HA) (`meatballs-and-rice-ha`)

- **C2 substitution:** Steps use marinara; list does not.
- **C3 unlisted in steps:** Steps use marinara; it is not listed.

### Chicken Parmesan (HA) (`chicken-parm-ha`)

- **C2 substitution:** Daiya cheddar for mozzarella is the household cheddar swap, acceptable as a plate, but steps still say marinara after the list was changed to crushed tomatoes. Garlic-infused oil is not used; the conversion is incomplete as written.
- **C3 unlisted in steps:** Steps spoon marinara; marinara is not listed (crushed tomatoes are).
- **C5 unused listed ingredient:** Crushed tomatoes are listed and never named.

### Eggplant Parmesan (HA) (`eggplant-parm-ha`)

- **C2 substitution:** Same marinara-in-steps / crushed-tomato mismatch as chicken parm.
- **C3 unlisted in steps:** Steps layer marinara; marinara is not listed.
- **C5 unused listed ingredient:** Crushed tomatoes and black pepper are listed and never named.

### Pesto Pasta (HA) (`pesto-pasta-dinner-ha`)

- **C2 substitution:** No pesto is made. Basil is tossed with pasta and tomatoes. That is not pesto pasta.
- **C4 will not yield the food:** Produces tomato-basil pasta, not pesto pasta.

### Sausage Pasta (HA) (`sausage-pasta-ha`)

- **C2 substitution:** Steps pour in marinara; the list has crushed tomatoes.
- **C3 unlisted in steps:** Steps pour in marinara; marinara is not listed.

### Lasagna (HA) (`lasagna-ha`)

- **C2 substitution:** Coconut yogurt for ricotta can work in a layered bake, but steps still say marinara while the pot is crushed tomatoes, and garlic-infused oil is marked minced.
- **C3 unlisted in steps:** Steps stir in marinara; marinara is not listed.

### Meatballs Marinara (HA) (`meatballs-marinara-ha`)

- **C2 substitution:** Title and steps say marinara; ingredients do not list it.
- **C3 unlisted in steps:** Steps/title use marinara; it is not listed.

### Baked Ziti (HA) (`baked-ziti-ha`)

- **C2 substitution:** Steps use marinara; list does not.
- **C3 unlisted in steps:** Steps use marinara; it is not listed.

### Creamy Polenta with Sausage (HA) (`creamy-polenta-sausage-ha`)

- **C2 substitution:** Steps use marinara; list does not.
- **C3 unlisted in steps:** Steps use marinara; it is not listed.

### Toaster Pastry (HA) (`pop-tarts-ha`)

- **C2 substitution:** Rice cakes for toaster pastry. A rice cake with jam is not a toaster pastry.
- **C4 will not yield the food:** Toasted rice cakes are not toaster pastries.
- **C5 unused listed ingredient:** Rice cakes are listed; steps never name them (they were written for pastry).

### Toaster Strudel (HA) (`toaster-strudel-ha`)

- **C2 substitution:** GF flour listed as a thawed 'sheet'; steps cut the flour blend into rectangles. Flour is not puff pastry. You would have to make a dough.
- **C3 unlisted in steps:** Steps cut flour into rectangles as if it were pastry.
- **C4 will not yield the food:** You cannot cut a bag of gluten-free flour blend into rectangles, fill it with jam, and bake strudel.

### Doughnuts (HA) (`doughnuts-ha`)

- **C2 substitution:** Warming gluten-free bread does not make doughnuts.
- **C3 unlisted in steps:** Steps say serve with coffee; coffee is not listed.
- **C4 will not yield the food:** Warmed sandwich bread is not doughnuts.

### Croissants (HA) (`croissants-ha`)

- **C2 substitution:** Warming gluten-free bread does not make croissants.
- **C4 will not yield the food:** Warmed sandwich bread is not croissants.

### Brioche Toast (HA) (`brioche-toast-ha`)

- **C2 substitution:** Sourdough toast is fine toast; it is not brioche. The notes still tell you to use brioche.

### Pan Dulce (HA) (`pan-dulce-ha`)

- **C2 substitution:** Cinnamon-sugar toast is not pan dulce.
- **C4 will not yield the food:** Will produce cinnamon toast, not pan dulce.

### Cinnamon Rolls (HA) (`cinnamon-rolls-ha`)

- **C2 substitution:** GF flour listed as a 'tube'; steps say unroll the dough. There is no dough. Same error as swapping flour for crescent-roll pastry.
- **C3 unlisted in steps:** Steps unroll dough; the listed item is flour.
- **C4 will not yield the food:** There is no dough to unroll, butter, or slice into rounds.
- **C5 unused listed ingredient:** Gluten-free flour is listed; steps only talk about dough that was never made from it.

### Hot Pockets (HA) (`hot-pockets-ha`)

- **C2 substitution:** GF flour listed as a 'tube'; steps unroll rectangles and crimp. Flour will not do that.
- **C3 unlisted in steps:** Steps unroll dough; the listed item is flour.
- **C4 will not yield the food:** There is no dough to fill or crimp.
- **C5 unused listed ingredient:** Gluten-free flour is listed; steps only talk about dough.

### Homemade Pizza (HA) (`homemade-pizza-ha`)

- **C2 substitution:** Corn tortillas (1 lb) replace pizza dough, but steps still say stretch the dough and spread marinara. That is a different food, and the method does not match the ingredients.
- **C3 unlisted in steps:** Steps spread marinara; crushed tomatoes are listed.
- **C4 will not yield the food:** You cannot stretch corn tortillas like a pound of pizza dough. Followed as written, the cook will be holding tortillas and reading dough instructions.
- **C5 unused listed ingredient:** Corn tortillas, crushed tomatoes, and olive oil are listed; steps stretch dough, spread marinara, and never name those lines.

### Baked Mac and Cheese (HA) (`baked-mac-and-cheese-ha`)

- **C5 unused listed ingredient:** Salt is listed and never used in a step.

### Pretzels (HA) (`pretzels-snack-ha`)

- **C3 unlisted in steps:** Steps refer to mustard; mustard is not listed.

### Leftover Muffin or Pastry (HA) (`leftover-muffin-ha`)

- **C2 substitution:** Gluten-free bread is not a leftover muffin or croissant.
- **C3 unlisted in steps:** Steps say serve with coffee; coffee is not listed.

### Berry Pie (HA) (`fruit-pie-ha`)

- **C2 substitution:** GF flour is listed with no fat or water; steps assume two ready crusts. Flour does not become pie pastry by sitting in the list.
- **C3 unlisted in steps:** Steps fit crusts that are not listed and never made.
- **C4 will not yield the food:** No crust is mixed or rolled. The pie cannot exist from these steps.
- **C5 unused listed ingredient:** Gluten-free flour is listed and never used; steps assume finished crusts.

### Egg in a Hole (HA) (`egg-in-a-hole-ha`)

- **C5 unused listed ingredient:** Salt is listed and never used in a step.

### English Muffins (HA) (`english-muffins-butter-ha`)

- **C2 substitution:** Gluten-free bread, called muffins in the steps, is not an English muffin.
- **C3 unlisted in steps:** Steps “split and toast the muffins”; the ingredient is `gf-bread`.
- **C4 will not yield the food:** Will produce buttered toast, not English muffins.

### Weet-Bix (HA) (`weet-bix-bowl-ha`)

- **C2 substitution:** Crisp rice cereal is not Weet-Bix; the prep note even says “Weet-Bix biscuits or similar wheat biscuits,” which would not be HA.
- **C4 will not yield the food:** Rice cereal in almond milk is not Weet-Bix. Follow the prep and the plate is not House Approved either.

### Vegemite on Toast (HA) (`vegemite-on-toast-ha`)

- **C2 substitution:** Mustard is not a substitute for Vegemite.
- **C4 will not yield the food:** Mustard toast is not Vegemite toast.

### Crumpets (HA) (`crumpets-butter-ha`)

- **C2 substitution:** Toasted gluten-free bread is not a crumpet.
- **C4 will not yield the food:** Will produce buttered toast, not crumpets. There are no holes to melt into.

### Youtiao (HA) (`youtiao-ha`)

- **C4 will not yield the food:** A 10-minute rest GF dough fried as strips can be fried dough; it will not be youtiao (which needs gluten development and a long proof).

### Baozi (HA) (`baozi-ha`)

- **C4 will not yield the food:** GF flour steamed buns with 20 minutes rest and no binder will not be baozi. Possible dumplings, not the titled food.

### Peameal Bacon Sandwich (HA) (`peameal-bacon-sandwich-ha`)

- **C2 substitution:** Canadian bacon on gluten-free bread is a sandwich; calling the bread “muffins” is leftover English-muffin method.
- **C3 unlisted in steps:** Steps toast “the muffins”; the list is `gf-bread`.
- **C4 will not yield the food:** Without a muffin, this is not the titled peameal sandwich.

### Meat Pie (HA) (`meat-pie-ha`)

- **C2 substitution:** Same crust problem: flour is listed, steps say fill a crust, no pastry is made.
- **C3 unlisted in steps:** Steps fill a crust that is never made.
- **C4 will not yield the food:** No crust is mixed or rolled. The pie cannot exist from these steps.
- **C5 unused listed ingredient:** Salt is listed and never used in a step.

### Poutine (HA) (`poutine-ha`)

- **C2 substitution:** Daiya shreds for poutine. The catalog already has lactose-free cheese curds (HA-confirmed). Shreds will melt into a blanket, not squeak.

### Ramen (HA) (`ramen-bowl-ha`)

- **C2 substitution:** Rice noodles in clear broth is a rice-noodle soup, not ramen.

### Udon (HA) (`udon-bowl-ha`)

- **C2 substitution:** Rice noodles are not udon.
- **C3 unlisted in steps:** Steps say “cook udon”; the list is `rice-noodle`.
- **C4 will not yield the food:** Produces rice noodles in dashi, not udon.
- **C5 unused listed ingredient:** Rice noodles are listed and never named.

### Gyro (HA) (`gyro-ha`)

- **C2 substitution:** Corn tortillas plus loose ground beef is a taco, not a gyro. Salt is used but not listed.
- **C3 unlisted in steps:** Steps season with salt; salt is not listed.
- **C4 will not yield the food:** Produces a seasoned-beef taco, not a gyro.

### Chicken Parma (HA) (`chicken-parma-ha`)

- **C2 substitution:** Steps use marinara; list has crushed tomatoes.
- **C3 unlisted in steps:** Steps top with marinara; crushed tomatoes are listed.
- **C5 unused listed ingredient:** Crushed tomatoes are listed and never named.

### Feijoada (HA) (`feijoada-ha`)

- **C3 unlisted in steps:** Steps add water to cover and serve with rice; neither water nor rice is listed. Season with salt, salt not listed.

### Bibimbap (HA) (`bibimbap-ha`)

- **C2 substitution:** Paprika is not gochujang; this will not taste like bibimbap.

### Kimchi Jjigae (HA) (`kimchi-jjigae-ha`)

- **C2 substitution:** Paprika is not gochugaru; the stew loses its identity.

### Japanese Curry (HA) (`japanese-curry-ha`)

- **C3 unlisted in steps:** Steps serve over rice; rice is not listed.

### Dumplings (HA) (`dumplings-ha`)

- **C2 substitution:** Rice paper is not a dumpling wrapper; it will not pinch, brown, and steam like wheat skins.
- **C3 unlisted in steps:** Steps fill wrappers; rice paper is listed, wrappers are not, and they are not interchangeable.
- **C4 will not yield the food:** Rice-paper packets will not brown and steam like dumplings.

### Potstickers (HA) (`potstickers-ha`)

- **C2 substitution:** Rice paper will not potsticker. The method is written for dumpling wrappers.
- **C3 unlisted in steps:** Steps fill wrappers; rice paper is listed.
- **C4 will not yield the food:** Rice paper will dissolve or shatter in a potsticker method.

### Brigadeiro (HA) (`brigadeiro-ha`)

- **C2 substitution:** Steps cook condensed milk; the list is coconut milk. Coconut milk will not set into brigadeiro.
- **C3 unlisted in steps:** Steps cook condensed milk; coconut milk is listed.
- **C4 will not yield the food:** Coconut milk, cocoa, and butter will not pull into fudgy brigadeiro.
- **C5 unused listed ingredient:** Coconut milk is listed; steps say condensed milk.

### Tiramisu (HA) (`tiramisu-ha`)

- **C2 substitution:** GF bread fingers in coffee with coconut cream is a trifle, not tiramisu. Steps also say cream and unused coconut milk.
- **C3 unlisted in steps:** Steps whip cream; coconut milk/cream are listed, not dairy cream.
- **C4 will not yield the food:** Produces a coffee-soaked bread trifle. Ladyfingers and mascarpone are gone.

### Gelato (HA) (`gelato-ha`)

- **C2 substitution:** Scooping lactose-free ice cream is not making gelato. Honest as a stand-in, fails as the titled food.
- **C4 will not yield the food:** Produces scooped ice cream.

### Tres Leches Cake (HA) (`tres-leches-ha`)

- **C2 substitution:** Steps pour condensed almond milk and cream; the list is three coconut-milk lines and almond milk. The soak does not match the ingredients, and it is not three milks.
- **C3 unlisted in steps:** Steps pour condensed almond milk and cream; those are not listed.
- **C4 will not yield the food:** The soak liquids in the steps are not the liquids in the list. The cake will not be tres leches as written.
- **C5 unused listed ingredient:** The three coconut-milk lines are not referred to as listed; steps invent other milks.

### Cannoli (HA) (`cannoli-ha`)

- **C2 substitution:** GF flour 'baked as small shells' is never turned into shells; coconut yogurt filling in imaginary pastry is not cannoli.
- **C3 unlisted in steps:** Steps fill pastry shells that are not produced from the listed flour.
- **C4 will not yield the food:** No shells are fried or formed. Coconut-yogurt dip is not cannoli.
- **C5 unused listed ingredient:** Gluten-free flour is listed and never used in a step.

### Bubble Tea (HA) (`bubble-tea-ha`)

- **C2 substitution:** Tapioca starch does not become boba pearls from a parenthetical. You cannot cook pearls that way.
- **C4 will not yield the food:** Tapioca starch will make a slurry, not pearls. This will not be bubble tea.
- **C5 unused listed ingredient:** Tapioca starch and sugar are only implied (pearls / sweeten); tea is named. Starch is never actually cooked as written.

## Per-recipe register

Every home recipe. **fail** is a problem. `not needed` on C1 means the dish identity is a not-HA ingredient with no honest swap (avocado toast, tuna salad, banana bread, and the like). `n/a` on C1 means the recipe is already HA. `n/a` on C2 means there is no sibling pair.

C4 `pass` means: followed as written, with the listed ingredients, a competent home cook would get that food (or an honest weeknight version the title already admits, such as warming store-bought doughnuts). It is not a compliment. Several “pass” HA plates are homely but executable (Daiya on eggs, coconut yogurt bowls, almond-milk hot chocolate).

| Recipe                                                                | C1 HA alt  | C2 pair  | C3 steps⊆list | C4 works | C5 list⊆steps |
| --------------------------------------------------------------------- | ---------- | -------- | ------------- | -------- | ------------- |
| Soft Scrambled Eggs (Not-HA) (`scrambled-eggs`)                       | pass       | pass     | pass          | pass     | pass          |
| Blueberry Oatmeal (HA) (`blueberry-oatmeal`)                          | n/a        | n/a      | pass          | pass     | pass          |
| Banana Pancakes (Not-HA) (`banana-pancakes`)                          | not needed | n/a      | pass          | pass     | pass          |
| Yogurt Berry Bowl (Not-HA) (`yogurt-berry-bowl`)                      | pass       | pass     | pass          | pass     | pass          |
| Potato Breakfast Hash (Not-HA) (`breakfast-hash`)                     | pass       | pass     | pass          | pass     | pass          |
| Breakfast Tacos (Not-HA) (`breakfast-tacos`)                          | pass       | pass     | pass          | pass     | pass          |
| Shakshuka (Not-HA) (`shakshuka`)                                      | pass       | pass     | pass          | pass     | pass          |
| Masala Omelette (Not-HA) (`masala-omelette`)                          | pass       | pass     | pass          | pass     | pass          |
| Ginger Rice Porridge (HA) (`ginger-rice-porridge`)                    | n/a        | n/a      | pass          | pass     | pass          |
| Fried Eggs and Toast (HA) (`fried-eggs-toast`)                        | n/a        | n/a      | pass          | pass     | pass          |
| Cheese Omelette (Not-HA) (`cheese-omelette`)                          | pass       | pass     | pass          | pass     | pass          |
| Veggie Frittata (Not-HA) (`veggie-frittata`)                          | pass       | pass     | pass          | pass     | pass          |
| Breakfast Burrito (Not-HA) (`breakfast-burrito`)                      | pass       | pass     | pass          | pass     | pass          |
| Egg Muffins (Not-HA) (`egg-muffins`)                                  | pass       | pass     | pass          | pass     | pass          |
| Overnight Oats (Not-HA) (`overnight-oats`)                            | pass       | pass     | pass          | pass     | pass          |
| Baked Oatmeal (Not-HA) (`baked-oatmeal`)                              | **fail**   | n/a      | pass          | pass     | pass          |
| Cinnamon Oatmeal (HA) (`cinnamon-oatmeal`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Peanut Butter Toast (Not-HA) (`peanut-butter-toast`)                  | **fail**   | n/a      | pass          | pass     | pass          |
| Avocado Toast (Not-HA) (`avocado-toast`)                              | not needed | n/a      | pass          | pass     | pass          |
| French Toast (Not-HA) (`french-toast`)                                | pass       | pass     | pass          | pass     | pass          |
| Waffles (Not-HA) (`gf-waffles`)                                       | pass       | pass     | pass          | pass     | pass          |
| Cornmeal Pancakes (Not-HA) (`cornmeal-pancakes`)                      | pass       | pass     | pass          | pass     | pass          |
| Breakfast Quesadilla (Not-HA) (`breakfast-quesadilla`)                | pass       | pass     | pass          | pass     | pass          |
| Huevos Rancheros (Not-HA) (`huevos-rancheros`)                        | pass       | pass     | pass          | pass     | pass          |
| Migas (Not-HA) (`migas`)                                              | pass       | pass     | pass          | pass     | **fail**      |
| Breakfast Fried Rice (Not-HA) (`breakfast-fried-rice`)                | pass       | pass     | pass          | pass     | pass          |
| Congee with Egg (HA) (`congee-with-egg`)                              | n/a        | n/a      | pass          | pass     | pass          |
| Yogurt Parfait (Not-HA) (`yogurt-parfait`)                            | pass       | pass     | pass          | pass     | pass          |
| Cottage Cheese Bowl (Not-HA) (`cottage-cheese-bowl`)                  | not needed | n/a      | pass          | pass     | pass          |
| Smoothie Bowl (Not-HA) (`smoothie-bowl`)                              | **fail**   | n/a      | pass          | pass     | pass          |
| Banana Smoothie (Not-HA) (`banana-smoothie`)                          | not needed | n/a      | pass          | pass     | pass          |
| Breakfast Casserole (Not-HA) (`breakfast-casserole`)                  | pass       | pass     | pass          | pass     | pass          |
| Sausage and Eggs (HA) (`sausage-and-eggs`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Bacon and Eggs (HA) (`bacon-and-eggs`)                                | n/a        | n/a      | pass          | pass     | pass          |
| Breakfast Potatoes (Not-HA) (`breakfast-potatoes`)                    | pass       | pass     | pass          | pass     | pass          |
| Chia Pudding (Not-HA) (`chia-pudding`)                                | pass       | pass     | pass          | pass     | pass          |
| Granola and Milk (Not-HA) (`granola-and-milk`)                        | pass       | pass     | pass          | pass     | pass          |
| Breakfast Sandwich (Not-HA) (`breakfast-sandwich`)                    | pass       | pass     | pass          | pass     | pass          |
| Salmon and Egg Toast (Not-HA) (`salmon-egg-toast`)                    | **fail**   | n/a      | pass          | pass     | pass          |
| Breakfast Tostadas (Not-HA) (`breakfast-tostadas`)                    | pass       | pass     | pass          | pass     | pass          |
| Egg Bhurji (Not-HA) (`egg-bhurji`)                                    | pass       | pass     | pass          | pass     | pass          |
| Coconut Pancakes (HA) (`coconut-pancakes`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Leftover Rice Breakfast (HA) (`leftover-rice-breakfast`)              | n/a        | n/a      | pass          | pass     | pass          |
| Spinach Egg Scramble (Not-HA) (`spinach-egg-scramble`)                | pass       | pass     | pass          | pass     | pass          |
| Breakfast Polenta (Not-HA) (`breakfast-polenta`)                      | pass       | pass     | pass          | pass     | pass          |
| Ham and Egg Skillet (Not-HA) (`ham-egg-skillet`)                      | pass       | pass     | pass          | pass     | pass          |
| Sweet Potato Hash (Not-HA) (`sweet-potato-hash`)                      | pass       | pass     | pass          | pass     | pass          |
| Ricotta Toast (Not-HA) (`ricotta-toast`)                              | pass       | **fail** | pass          | pass     | pass          |
| Breakfast Grits (Not-HA) (`breakfast-grits`)                          | pass       | pass     | pass          | pass     | pass          |
| Mango Lassi Bowl (Not-HA) (`mango-lassi-bowl`)                        | not needed | n/a      | pass          | pass     | pass          |
| Tofu Scramble (Not-HA) (`tofu-scramble`)                              | pass       | pass     | pass          | pass     | pass          |
| Breakfast Beans (Not-HA) (`breakfast-beans`)                          | pass       | pass     | pass          | pass     | pass          |
| Sesame Rice Breakfast (HA) (`sesame-rice-breakfast`)                  | n/a        | n/a      | pass          | pass     | pass          |
| Olive Oil Fried Eggs (HA) (`olive-oil-fried-eggs`)                    | n/a        | n/a      | pass          | pass     | pass          |
| Sourdough Turkey Sandwich (Not-HA) (`sourdough-turkey-sandwich`)      | pass       | pass     | pass          | pass     | pass          |
| Chicken Salad Lettuce Cups (HA) (`chicken-salad-lettuce`)             | n/a        | n/a      | pass          | pass     | pass          |
| Leftover Rice Bowl (HA) (`leftover-rice-bowl`)                        | n/a        | n/a      | pass          | pass     | pass          |
| Greek Salad (Not-HA) (`greek-salad`)                                  | pass       | pass     | pass          | pass     | pass          |
| Cheese Quesadilla (Not-HA) (`cheese-quesadilla`)                      | pass       | pass     | pass          | pass     | pass          |
| Tomato Basil Soup (Not-HA) (`tomato-basil-soup`)                      | pass       | pass     | pass          | pass     | pass          |
| Hummus and Veggie Plate (Not-HA) (`hummus-veggie-plate`)              | pass       | pass     | pass          | pass     | pass          |
| Veggie Fried Rice (Not-HA) (`veggie-fried-rice`)                      | pass       | pass     | pass          | pass     | pass          |
| Tuna Cucumber Boats (Not-HA) (`tuna-cucumber-boats`)                  | not needed | n/a      | pass          | pass     | pass          |
| Egg Salad Sandwich (HA) (`egg-salad-sandwich`)                        | n/a        | n/a      | pass          | pass     | pass          |
| Tuna Salad Sandwich (Not-HA) (`tuna-salad-sandwich`)                  | not needed | n/a      | pass          | pass     | pass          |
| Grilled Cheese (Not-HA) (`grilled-cheese`)                            | pass       | pass     | pass          | pass     | pass          |
| Leftover Chicken Wrap (Not-HA) (`leftover-chicken-wrap`)              | **fail**   | n/a      | pass          | pass     | pass          |
| Turkey Lettuce Wraps (HA) (`turkey-lettuce-wraps`)                    | n/a        | n/a      | pass          | pass     | pass          |
| Cobb Salad (Not-HA) (`cobb-salad`)                                    | **fail**   | n/a      | pass          | pass     | pass          |
| Chef Salad (Not-HA) (`chef-salad`)                                    | pass       | pass     | pass          | pass     | pass          |
| Caesar-Style Salad (Not-HA) (`caesar-style-salad`)                    | pass       | pass     | pass          | pass     | pass          |
| Caprese Salad (Not-HA) (`caprese-salad`)                              | pass       | **fail** | pass          | pass     | pass          |
| Taco Salad (Not-HA) (`taco-salad`)                                    | pass       | pass     | pass          | pass     | pass          |
| Quinoa Salad (Not-HA) (`quinoa-salad`)                                | pass       | pass     | pass          | pass     | pass          |
| Pasta Salad (Not-HA) (`pasta-salad`)                                  | pass       | pass     | pass          | pass     | pass          |
| Potato Salad (HA) (`potato-salad`)                                    | n/a        | n/a      | pass          | pass     | pass          |
| Egg Drop Soup (HA) (`egg-drop-soup`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Chicken Rice Soup (Not-HA) (`chicken-rice-soup`)                      | pass       | pass     | pass          | pass     | pass          |
| Lentil Soup (Not-HA) (`lentil-soup`)                                  | pass       | pass     | pass          | pass     | pass          |
| Black Bean Soup (Not-HA) (`black-bean-soup`)                          | pass       | pass     | pass          | pass     | pass          |
| Minestrone (Not-HA) (`minestrone`)                                    | pass       | pass     | pass          | pass     | pass          |
| Leftover Chili Bowl (Not-HA) (`leftover-chili-bowl`)                  | pass       | pass     | pass          | pass     | pass          |
| Burrito Bowl (Not-HA) (`burrito-bowl`)                                | pass       | pass     | pass          | **fail** | pass          |
| Baked Potato (Not-HA) (`baked-potato-lunch`)                          | pass       | pass     | pass          | pass     | pass          |
| Stuffed Sweet Potato (Not-HA) (`stuffed-sweet-potato`)                | pass       | pass     | pass          | pass     | pass          |
| Tuna Rice Bowl (Not-HA) (`tuna-rice-bowl`)                            | not needed | n/a      | pass          | pass     | pass          |
| Salmon Salad (Not-HA) (`salmon-salad`)                                | **fail**   | n/a      | pass          | pass     | pass          |
| Chickpea Salad Sandwich (HA) (`chickpea-salad-sandwich`)              | n/a        | n/a      | pass          | pass     | pass          |
| Leftover Stir-Fry Bowl (HA) (`leftover-stir-fry-bowl`)                | n/a        | n/a      | pass          | pass     | pass          |
| Cold Noodle Salad (HA) (`cold-noodle-salad`)                          | n/a        | n/a      | pass          | pass     | pass          |
| Ham and Cheese Sandwich (Not-HA) (`ham-cheese-sandwich`)              | pass       | pass     | pass          | pass     | pass          |
| BLT (HA) (`blt`)                                                      | n/a        | n/a      | pass          | pass     | pass          |
| Chicken Noodle Soup (Not-HA) (`chicken-noodle-soup`)                  | pass       | pass     | pass          | pass     | pass          |
| Tomato Cucumber Salad (Not-HA) (`tomato-cucumber-salad`)              | pass       | pass     | pass          | pass     | pass          |
| White Bean Salad (HA) (`white-bean-salad`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Shrimp Salad (HA) (`shrimp-salad`)                                    | n/a        | n/a      | pass          | pass     | pass          |
| Leftover Taco Bowl (Not-HA) (`leftover-taco-bowl`)                    | pass       | pass     | pass          | pass     | pass          |
| Fried Egg Rice (Not-HA) (`fried-egg-rice`)                            | pass       | pass     | pass          | pass     | pass          |
| Veggie Wrap (Not-HA) (`veggie-wrap`)                                  | **fail**   | n/a      | pass          | pass     | pass          |
| Sushi Bowl (Not-HA) (`sushi-bowl`)                                    | **fail**   | n/a      | pass          | pass     | pass          |
| Mediterranean Bowl (Not-HA) (`mediterranean-bowl`)                    | pass       | pass     | pass          | pass     | pass          |
| Leftover Roast Plate (HA) (`leftover-roast-plate`)                    | n/a        | n/a      | pass          | pass     | pass          |
| Soup and Rice Cakes (HA) (`soup-and-rice-cakes`)                      | n/a        | n/a      | pass          | pass     | pass          |
| Cottage Cheese Plate (Not-HA) (`cottage-cheese-plate`)                | not needed | n/a      | pass          | pass     | pass          |
| Pesto Pasta (Not-HA) (`pesto-pasta-lunch`)                            | pass       | **fail** | pass          | pass     | pass          |
| Chickpea Patty Plate (Not-HA) (`chickpea-patty-plate`)                | pass       | pass     | pass          | pass     | pass          |
| Corn Chowder (Not-HA) (`corn-chowder`)                                | pass       | pass     | pass          | pass     | pass          |
| Sardine Toast (Not-HA) (`sardine-toast`)                              | not needed | n/a      | pass          | pass     | pass          |
| Leftover Dal Bowl (Not-HA) (`leftover-dal-bowl`)                      | pass       | pass     | pass          | pass     | pass          |
| Rice Paper Rolls (HA) (`rice-paper-rolls`)                            | n/a        | n/a      | **fail**      | pass     | pass          |
| Arugula Chicken Salad (Not-HA) (`arugula-chicken-salad`)              | pass       | pass     | pass          | pass     | pass          |
| Nachos (Not-HA) (`loaded-nachos-lunch`)                               | pass       | pass     | pass          | pass     | pass          |
| Quinoa Veggie Bowl (Not-HA) (`quinoa-veggie-bowl`)                    | pass       | pass     | pass          | pass     | pass          |
| Sheet-Pan Roasted Chicken (HA) (`sheet-pan-roasted-chicken`)          | n/a        | n/a      | pass          | pass     | pass          |
| Sunday Roast Chicken (Not-HA) (`sunday-roast-chicken`)                | pass       | pass     | pass          | pass     | pass          |
| Weeknight Chili (Not-HA) (`weeknight-chili`)                          | pass       | pass     | pass          | pass     | pass          |
| Skillet Burgers (Not-HA) (`skillet-burgers`)                          | pass       | pass     | pass          | pass     | pass          |
| Baked Salmon (HA) (`baked-salmon`)                                    | n/a        | n/a      | pass          | pass     | pass          |
| Turkey Meatloaf (Not-HA) (`turkey-meatloaf`)                          | pass       | pass     | pass          | pass     | pass          |
| Taco Night (Not-HA) (`taco-night`)                                    | pass       | pass     | pass          | pass     | pass          |
| Salsa Chicken (Not-HA) (`salsa-chicken`)                              | pass       | **fail** | pass          | pass     | pass          |
| Rice and Beans (Not-HA) (`rice-and-beans`)                            | pass       | pass     | pass          | pass     | pass          |
| Gluten-Free Spaghetti Marinara (Not-HA) (`gf-spaghetti-marinara`)     | pass       | pass     | pass          | pass     | pass          |
| Chicken Cacciatore (Not-HA) (`chicken-cacciatore`)                    | pass       | pass     | pass          | pass     | pass          |
| Parmesan Risotto (Not-HA) (`parmesan-risotto`)                        | pass       | **fail** | pass          | pass     | pass          |
| Chicken and Veggie Stir-Fry (Not-HA) (`chicken-veggie-stir-fry`)      | pass       | pass     | pass          | pass     | pass          |
| Ginger Rice Noodle Soup (HA) (`ginger-rice-noodle-soup`)              | n/a        | n/a      | pass          | pass     | pass          |
| Teriyaki Salmon Bowls (Not-HA) (`teriyaki-salmon-bowls`)              | pass       | pass     | pass          | pass     | pass          |
| Lemon Herb Greek Chicken (Not-HA) (`lemon-herb-greek-chicken`)        | pass       | pass     | pass          | pass     | pass          |
| Baked White Fish (Not-HA) (`baked-white-fish`)                        | not needed | n/a      | pass          | pass     | pass          |
| Shawarma-Spiced Chicken (Not-HA) (`shawarma-spiced-chicken`)          | pass       | pass     | pass          | pass     | pass          |
| Weeknight Dal (Not-HA) (`weeknight-dal`)                              | pass       | pass     | pass          | pass     | pass          |
| Yogurt-Marinated Chicken (Not-HA) (`yogurt-marinated-chicken`)        | pass       | **fail** | pass          | pass     | pass          |
| Chickpea Curry (Not-HA) (`chickpea-curry`)                            | pass       | pass     | pass          | pass     | pass          |
| Beef Stew (Not-HA) (`beef-stew`)                                      | pass       | pass     | pass          | pass     | pass          |
| Pot Roast (Not-HA) (`pot-roast`)                                      | pass       | pass     | pass          | pass     | pass          |
| Baked Pork Chops (HA) (`baked-pork-chops`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Pork Chops and Apples (Not-HA) (`pork-chops-and-apples`)              | not needed | n/a      | pass          | pass     | pass          |
| Meatballs and Rice (Not-HA) (`meatballs-and-rice`)                    | pass       | pass     | pass          | pass     | pass          |
| Sloppy Joes (Not-HA) (`sloppy-joes`)                                  | pass       | pass     | pass          | pass     | pass          |
| Shepherd's Pie (Not-HA) (`shepherds-pie`)                             | **fail**   | n/a      | pass          | pass     | pass          |
| Stuffed Bell Peppers (Not-HA) (`stuffed-bell-peppers`)                | pass       | pass     | pass          | pass     | pass          |
| Chicken and Rice Casserole (Not-HA) (`chicken-rice-casserole`)        | pass       | pass     | pass          | pass     | pass          |
| Tuna Casserole (Not-HA) (`tuna-casserole`)                            | not needed | n/a      | pass          | pass     | pass          |
| Baked Chicken Thighs (HA) (`baked-chicken-thighs`)                    | n/a        | n/a      | pass          | pass     | pass          |
| Grilled Steak (HA) (`grilled-steak`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| BBQ Chicken (HA) (`bbq-chicken`)                                      | n/a        | n/a      | pass          | pass     | pass          |
| Sausage and Peppers (Not-HA) (`sausage-and-peppers`)                  | pass       | pass     | pass          | pass     | pass          |
| Pulled Pork (Not-HA) (`pulled-pork`)                                  | pass       | **fail** | pass          | pass     | pass          |
| Baked Chicken Wings (HA) (`baked-chicken-wings`)                      | n/a        | n/a      | pass          | pass     | pass          |
| Cabbage and Sausage (Not-HA) (`cabbage-and-sausage`)                  | **fail**   | n/a      | pass          | pass     | pass          |
| Chili Baked Potatoes (Not-HA) (`chili-baked-potatoes`)                | pass       | pass     | pass          | pass     | pass          |
| Chicken Pot Pie (Not-HA) (`chicken-pot-pie`)                          | pass       | pass     | pass          | pass     | **fail**      |
| Beef Meatloaf (Not-HA) (`beef-meatloaf`)                              | pass       | pass     | pass          | pass     | pass          |
| Pork Tenderloin (HA) (`pork-tenderloin-dinner`)                       | n/a        | n/a      | pass          | pass     | pass          |
| Skillet Chicken and Potatoes (HA) (`skillet-chicken-potatoes`)        | n/a        | n/a      | pass          | pass     | pass          |
| Chicken Fajitas (Not-HA) (`chicken-fajitas`)                          | pass       | pass     | pass          | pass     | pass          |
| Beef Enchiladas (Not-HA) (`beef-enchiladas`)                          | pass       | **fail** | pass          | pass     | pass          |
| Chicken Tinga (Not-HA) (`chicken-tinga`)                              | pass       | **fail** | pass          | pass     | pass          |
| Shrimp Tacos (Not-HA) (`shrimp-tacos`)                                | **fail**   | n/a      | pass          | pass     | pass          |
| Fish Tacos (Not-HA) (`fish-tacos`)                                    | not needed | n/a      | pass          | pass     | pass          |
| Tostadas (Not-HA) (`tostadas`)                                        | **fail**   | n/a      | pass          | pass     | pass          |
| Chile Verde (Not-HA) (`chile-verde`)                                  | pass       | **fail** | pass          | pass     | pass          |
| Picadillo (Not-HA) (`picadillo`)                                      | pass       | pass     | pass          | pass     | pass          |
| Black Bean Tacos (Not-HA) (`black-bean-tacos`)                        | **fail**   | n/a      | pass          | pass     | pass          |
| Chilaquiles (Not-HA) (`chilaquiles`)                                  | **fail**   | n/a      | pass          | pass     | pass          |
| Burrito Skillet (Not-HA) (`burrito-skillet`)                          | pass       | pass     | pass          | pass     | pass          |
| Tamale Pie (Not-HA) (`tamale-pie`)                                    | pass       | pass     | pass          | pass     | pass          |
| Carne Asada (Not-HA) (`carne-asada`)                                  | **fail**   | n/a      | pass          | pass     | pass          |
| Chicken Tortilla Soup (Not-HA) (`chicken-tortilla-soup`)              | **fail**   | n/a      | pass          | pass     | pass          |
| Corn and Chicken Bowls (Not-HA) (`elote-chicken-bowls`)               | pass       | pass     | pass          | pass     | pass          |
| Poblano and Cheese Skillet (Not-HA) (`poblano-cheese-skillet`)        | pass       | pass     | pass          | pass     | pass          |
| Chicken Parmesan (Not-HA) (`chicken-parm`)                            | pass       | **fail** | pass          | pass     | pass          |
| Eggplant Parmesan (Not-HA) (`eggplant-parm`)                          | pass       | **fail** | pass          | pass     | **fail**      |
| Pesto Pasta (Not-HA) (`pesto-pasta-dinner`)                           | pass       | **fail** | pass          | pass     | pass          |
| Sausage Pasta (Not-HA) (`sausage-pasta`)                              | pass       | pass     | pass          | pass     | pass          |
| Lasagna (Not-HA) (`lasagna`)                                          | pass       | **fail** | pass          | pass     | pass          |
| Meatballs Marinara (Not-HA) (`meatballs-marinara`)                    | pass       | pass     | pass          | pass     | pass          |
| Baked Ziti (Not-HA) (`baked-ziti`)                                    | pass       | **fail** | pass          | pass     | pass          |
| Chicken Piccata (HA) (`chicken-piccata`)                              | n/a        | n/a      | pass          | pass     | pass          |
| Shrimp Scampi (Not-HA) (`shrimp-scampi`)                              | pass       | pass     | pass          | pass     | pass          |
| White Beans and Greens (Not-HA) (`white-beans-and-greens`)            | pass       | pass     | pass          | pass     | pass          |
| Caprese Chicken (Not-HA) (`caprese-chicken`)                          | pass       | **fail** | pass          | pass     | pass          |
| Mushroom Risotto (Not-HA) (`mushroom-risotto`)                        | pass       | pass     | pass          | pass     | pass          |
| Pasta Primavera (Not-HA) (`pasta-primavera`)                          | pass       | pass     | pass          | pass     | pass          |
| Sausage and White Beans (Not-HA) (`sausage-white-beans`)              | pass       | pass     | pass          | pass     | pass          |
| Baked Cod with Tomatoes (Not-HA) (`baked-cod-tomatoes`)               | not needed | n/a      | pass          | pass     | pass          |
| Creamy Polenta with Sausage (Not-HA) (`creamy-polenta-sausage`)       | pass       | pass     | pass          | pass     | pass          |
| Fettuccine Alfredo (Not-HA) (`fettuccine-alfredo`)                    | pass       | **fail** | pass          | **fail** | pass          |
| Fettuccine Alfredo (HA) (`fettuccine-alfredo-ha`)                     | **fail**   | **fail** | pass          | **fail** | pass          |
| Beef and Broccoli (Not-HA) (`beef-and-broccoli`)                      | pass       | pass     | pass          | pass     | pass          |
| Sesame Chicken (Not-HA) (`sesame-chicken`)                            | pass       | pass     | pass          | pass     | pass          |
| Tofu Stir-Fry (Not-HA) (`tofu-stir-fry`)                              | pass       | pass     | pass          | pass     | pass          |
| Shrimp Fried Rice (HA) (`shrimp-fried-rice`)                          | n/a        | n/a      | pass          | pass     | pass          |
| Rice Noodle Stir-Fry (Not-HA) (`rice-noodle-stir-fry`)                | pass       | pass     | pass          | pass     | pass          |
| Coconut Curry Chicken (Not-HA) (`coconut-curry-chicken`)              | pass       | pass     | pass          | pass     | pass          |
| Chicken Lettuce Wraps (HA) (`chicken-lettuce-wraps`)                  | n/a        | n/a      | pass          | pass     | pass          |
| Egg Foo Young (HA) (`egg-foo-young`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Miso Soup with Tofu (HA) (`miso-tofu-soup`)                           | n/a        | n/a      | pass          | pass     | pass          |
| Soy Ginger Beef Bowls (HA) (`soy-ginger-beef-bowls`)                  | n/a        | n/a      | pass          | pass     | pass          |
| Orange Chicken (Not-HA) (`orange-chicken`)                            | pass       | pass     | pass          | pass     | pass          |
| Tofu and Pork Skillet (Not-HA) (`tofu-pork-skillet`)                  | pass       | pass     | pass          | pass     | pass          |
| Salmon Rice (HA) (`salmon-rice-dinner`)                               | n/a        | n/a      | pass          | pass     | pass          |
| Bok Choy Noodles (HA) (`bok-choy-noodles`)                            | n/a        | n/a      | pass          | **fail** | pass          |
| Tempeh Stir-Fry (Not-HA) (`tempeh-stir-fry`)                          | pass       | pass     | pass          | pass     | pass          |
| Hot and Sour Soup (HA) (`hot-and-sour-soup`)                          | n/a        | n/a      | pass          | pass     | pass          |
| Chicken Souvlaki (Not-HA) (`chicken-souvlaki`)                        | pass       | pass     | pass          | pass     | pass          |
| Baked Feta and Tomatoes (Not-HA) (`baked-feta-tomatoes`)              | pass       | pass     | pass          | pass     | pass          |
| Lamb Chops (HA) (`lamb-chops-dinner`)                                 | n/a        | n/a      | pass          | pass     | pass          |
| Chickpea Bowls (Not-HA) (`chickpea-bowls`)                            | pass       | pass     | pass          | pass     | pass          |
| Shrimp and Rice (Not-HA) (`shrimp-and-rice`)                          | pass       | pass     | pass          | pass     | pass          |
| Stuffed Peppers (Not-HA) (`stuffed-peppers-med`)                      | **fail**   | n/a      | pass          | **fail** | pass          |
| Lemon Shrimp (HA) (`lemon-shrimp`)                                    | n/a        | n/a      | pass          | pass     | pass          |
| Chickpea Stew (Not-HA) (`chickpea-stew`)                              | pass       | pass     | pass          | pass     | pass          |
| Baked Eggplant (Not-HA) (`baked-eggplant`)                            | pass       | pass     | pass          | pass     | pass          |
| Fish with Olives (Not-HA) (`fish-with-olives`)                        | not needed | n/a      | pass          | pass     | pass          |
| Chicken and Olives (HA) (`chicken-and-olives`)                        | n/a        | n/a      | pass          | pass     | pass          |
| Quinoa Tabbouleh Bowl (HA) (`quinoa-tabbouleh-bowl`)                  | n/a        | n/a      | pass          | pass     | pass          |
| Spinach Rice (HA) (`spinach-rice`)                                    | n/a        | n/a      | pass          | pass     | pass          |
| Grilled Lamb Salad (Not-HA) (`grilled-lamb-salad`)                    | pass       | pass     | pass          | pass     | pass          |
| Butter Chicken (Not-HA) (`butter-chicken`)                            | pass       | pass     | pass          | pass     | pass          |
| Chana Masala (Not-HA) (`chana-masala`)                                | pass       | pass     | pass          | pass     | pass          |
| Spinach Chicken (Not-HA) (`spinach-chicken`)                          | pass       | pass     | pass          | pass     | pass          |
| Egg Curry (Not-HA) (`egg-curry`)                                      | pass       | pass     | pass          | pass     | pass          |
| Chicken Tikka (Not-HA) (`chicken-tikka`)                              | pass       | pass     | pass          | pass     | pass          |
| Keema (Not-HA) (`keema`)                                              | **fail**   | n/a      | pass          | pass     | pass          |
| Potato and Pea Curry (Not-HA) (`potato-pea-curry`)                    | pass       | pass     | pass          | pass     | pass          |
| Coconut Fish Curry (Not-HA) (`coconut-fish-curry`)                    | not needed | n/a      | pass          | pass     | pass          |
| Kidney Bean Curry (Not-HA) (`kidney-bean-curry`)                      | pass       | pass     | pass          | pass     | pass          |
| Spinach and Cheese (Not-HA) (`spinach-and-cheese`)                    | pass       | pass     | pass          | pass     | pass          |
| Chicken Rice Pilaf (Not-HA) (`chicken-rice-pilaf`)                    | pass       | pass     | pass          | pass     | pass          |
| Tandoori-Style Chicken (Not-HA) (`tandoori-style-chicken`)            | pass       | pass     | pass          | pass     | pass          |
| Lentil Vegetable Stew (HA) (`lentil-vegetable-stew`)                  | n/a        | n/a      | pass          | pass     | pass          |
| Shrimp Masala (Not-HA) (`shrimp-masala`)                              | pass       | pass     | pass          | pass     | pass          |
| Jambalaya (Not-HA) (`jambalaya`)                                      | pass       | pass     | pass          | pass     | pass          |
| Jerk Chicken (Not-HA) (`jerk-chicken`)                                | pass       | pass     | pass          | pass     | pass          |
| Peanut Stew (Not-HA) (`peanut-stew`)                                  | pass       | pass     | pass          | pass     | pass          |
| Sausage and Sauerkraut (Not-HA) (`sausage-sauerkraut`)                | **fail**   | n/a      | pass          | pass     | pass          |
| Swedish Meatballs (Not-HA) (`swedish-meatballs`)                      | pass       | **fail** | pass          | pass     | pass          |
| Plantain and Beans (Not-HA) (`plantain-and-beans`)                    | pass       | pass     | pass          | pass     | pass          |
| Coconut Shrimp (Not-HA) (`coconut-shrimp`)                            | pass       | pass     | pass          | pass     | pass          |
| Coconut Rice and Chicken (HA) (`coconut-rice-chicken`)                | n/a        | n/a      | pass          | pass     | pass          |
| Stuffed Cabbage (Not-HA) (`stuffed-cabbage`)                          | pass       | pass     | pass          | pass     | pass          |
| Baked Beans and Sausage (Not-HA) (`baked-beans-sausage`)              | pass       | pass     | pass          | pass     | pass          |
| Stovetop Popcorn (HA) (`stovetop-popcorn`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Rice Cakes with Almond Butter (Not-HA) (`rice-cakes-almond-butter`)   | **fail**   | n/a      | pass          | pass     | pass          |
| Guacamole and Chips (Not-HA) (`guacamole-chips`)                      | not needed | n/a      | pass          | pass     | pass          |
| Roasted Chickpeas (HA) (`roasted-chickpeas`)                          | n/a        | n/a      | pass          | pass     | pass          |
| Cucumber Yogurt Dip (Not-HA) (`cucumber-yogurt-dip`)                  | pass       | pass     | pass          | pass     | pass          |
| Pumpkin Seed Trail Mix (HA) (`pumpkin-seed-trail-mix`)                | n/a        | n/a      | pass          | pass     | pass          |
| Hard-Boiled Eggs (HA) (`hard-boiled-eggs`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Cheese and Rice Cakes (Not-HA) (`cheese-and-rice-cakes`)              | pass       | pass     | pass          | pass     | pass          |
| Apple and Peanut Butter (Not-HA) (`apple-peanut-butter`)              | not needed | n/a      | pass          | pass     | pass          |
| Carrots and Hummus (HA) (`carrot-hummus`)                             | n/a        | n/a      | pass          | pass     | pass          |
| Salsa and Chips (Not-HA) (`salsa-and-chips`)                          | pass       | **fail** | pass          | pass     | pass          |
| Yogurt Cup (Not-HA) (`yogurt-cup`)                                    | pass       | pass     | pass          | pass     | pass          |
| Granola Clusters (Not-HA) (`granola-clusters`)                        | pass       | pass     | pass          | pass     | pass          |
| Energy Bites (Not-HA) (`energy-bites`)                                | pass       | pass     | pass          | pass     | pass          |
| Roasted Almonds (HA) (`roasted-almonds`)                              | n/a        | n/a      | pass          | pass     | pass          |
| Salted Edamame (HA) (`salted-edamame`)                                | n/a        | n/a      | pass          | pass     | pass          |
| Cucumber Slices (HA) (`cucumber-slices`)                              | n/a        | n/a      | pass          | pass     | pass          |
| Cheese Crisps (Not-HA) (`cheese-crisps`)                              | pass       | pass     | pass          | pass     | pass          |
| Banana and Peanut Butter (Not-HA) (`banana-peanut-butter`)            | not needed | n/a      | pass          | pass     | pass          |
| Cinnamon Popcorn (HA) (`cinnamon-popcorn`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Snack Nachos (Not-HA) (`snack-nachos`)                                | pass       | **fail** | pass          | pass     | pass          |
| Fruit Cup (Not-HA) (`fruit-cup`)                                      | **fail**   | n/a      | pass          | pass     | pass          |
| Cottage Cheese Snack (Not-HA) (`cottage-cheese-snack`)                | not needed | n/a      | pass          | pass     | pass          |
| Roasted Pumpkin Seeds (HA) (`roasted-pumpkin-seeds`)                  | n/a        | n/a      | pass          | pass     | pass          |
| Chocolate Almonds (HA) (`chocolate-almonds`)                          | n/a        | n/a      | pass          | pass     | pass          |
| Veggie Sticks (HA) (`veggie-sticks`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Rice Cakes with Avocado (Not-HA) (`rice-cake-avocado`)                | not needed | n/a      | pass          | pass     | pass          |
| Frozen Grapes (Not-HA) (`frozen-grapes`)                              | not needed | n/a      | pass          | pass     | pass          |
| Spiced Nuts (HA) (`spiced-nuts`)                                      | n/a        | n/a      | pass          | pass     | pass          |
| Mango with Chili (Not-HA) (`mango-chili`)                             | not needed | n/a      | pass          | pass     | pass          |
| Olive Plate (Not-HA) (`olive-plate`)                                  | pass       | pass     | pass          | pass     | pass          |
| Pickles and Cheese (Not-HA) (`pickles-and-cheese`)                    | pass       | pass     | pass          | pass     | pass          |
| Berry Smoothie (Not-HA) (`berry-smoothie`)                            | **fail**   | n/a      | pass          | pass     | pass          |
| Toast and Jam (HA) (`toast-and-jam`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Kale Chips (HA) (`kale-chips`)                                        | n/a        | n/a      | pass          | pass     | pass          |
| Roasted Carrot Sticks (HA) (`roasted-carrot-sticks`)                  | n/a        | n/a      | pass          | pass     | pass          |
| Frozen Yogurt Bites (Not-HA) (`frozen-yogurt-bites`)                  | pass       | pass     | pass          | pass     | pass          |
| Sunflower Seed Mix (HA) (`sunflower-seed-mix`)                        | n/a        | n/a      | pass          | pass     | pass          |
| Gluten-Free Chocolate Chip Cookies (HA) (`gf-chocolate-chip-cookies`) | n/a        | n/a      | pass          | pass     | pass          |
| Cinnamon Baked Apples (Not-HA) (`cinnamon-baked-apples`)              | not needed | n/a      | **fail**      | pass     | pass          |
| Coconut Rice Pudding (HA) (`coconut-rice-pudding`)                    | n/a        | n/a      | pass          | pass     | pass          |
| Dark Chocolate Bark (HA) (`dark-chocolate-bark`)                      | n/a        | n/a      | pass          | pass     | pass          |
| Coconut Macaroons (HA) (`coconut-macaroons`)                          | n/a        | n/a      | pass          | pass     | pass          |
| Maple Grilled Peaches (Not-HA) (`maple-grilled-peaches`)              | not needed | n/a      | pass          | pass     | pass          |
| Brownies (HA) (`brownies`)                                            | n/a        | n/a      | pass          | pass     | pass          |
| Banana Bread (Not-HA) (`banana-bread`)                                | not needed | n/a      | pass          | pass     | pass          |
| Apple Crisp (Not-HA) (`apple-crisp`)                                  | not needed | n/a      | pass          | pass     | pass          |
| Peach Cobbler (Not-HA) (`peach-cobbler`)                              | not needed | n/a      | pass          | pass     | pass          |
| Pumpkin Bread (HA) (`pumpkin-bread`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Rice Cereal Treats (HA) (`rice-cereal-treats`)                        | n/a        | n/a      | pass          | pass     | pass          |
| Chocolate Pudding (Not-HA) (`chocolate-pudding`)                      | pass       | pass     | pass          | pass     | pass          |
| Vanilla Pudding (Not-HA) (`vanilla-pudding`)                          | pass       | pass     | pass          | pass     | pass          |
| Berry Crumble (HA) (`berry-crumble`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Lemon Bars (HA) (`lemon-bars`)                                        | n/a        | n/a      | pass          | pass     | pass          |
| No-Bake Cookies (Not-HA) (`no-bake-cookies`)                          | pass       | pass     | pass          | pass     | pass          |
| Peanut Butter Cookies (HA) (`peanut-butter-cookies`)                  | n/a        | n/a      | pass          | pass     | pass          |
| Oatmeal Cookies (HA) (`oatmeal-cookies`)                              | n/a        | n/a      | pass          | pass     | pass          |
| Fudge (Not-HA) (`fudge`)                                              | pass       | pass     | pass          | pass     | pass          |
| Baked Bananas (Not-HA) (`baked-bananas`)                              | not needed | n/a      | pass          | pass     | pass          |
| Chocolate Mug Cake (Not-HA) (`chocolate-mug-cake`)                    | pass       | pass     | pass          | pass     | pass          |
| Strawberry Shortcake (Not-HA) (`strawberry-shortcake`)                | pass       | pass     | pass          | pass     | pass          |
| Whipped Berry Cups (Not-HA) (`whipped-berry-cups`)                    | pass       | pass     | pass          | pass     | pass          |
| Mango Sticky Rice (Not-HA) (`mango-sticky-rice`)                      | not needed | n/a      | pass          | **fail** | pass          |
| Rice Kheer (Not-HA) (`rice-kheer`)                                    | pass       | pass     | pass          | pass     | pass          |
| Baked Churros (HA) (`baked-churros`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Coconut Flan (HA) (`coconut-flan`)                                    | n/a        | n/a      | pass          | pass     | pass          |
| Chocolate Strawberries (HA) (`chocolate-strawberries`)                | n/a        | n/a      | pass          | pass     | pass          |
| Peanut Butter Cups (HA) (`peanut-butter-cups`)                        | n/a        | n/a      | pass          | pass     | pass          |
| Blondies (HA) (`blondies`)                                            | n/a        | n/a      | pass          | pass     | pass          |
| Carrot Cake Squares (Not-HA) (`carrot-cake-squares`)                  | pass       | pass     | pass          | pass     | pass          |
| Cinnamon Sugar Tortillas (HA) (`cinnamon-sugar-tortillas`)            | n/a        | n/a      | pass          | pass     | pass          |
| Baked Pears (Not-HA) (`baked-pears`)                                  | not needed | n/a      | **fail**      | pass     | pass          |
| Coconut Chocolate Mousse (HA) (`coconut-chocolate-mousse`)            | n/a        | n/a      | pass          | pass     | pass          |
| Frozen Banana Bites (Not-HA) (`frozen-banana-bites`)                  | not needed | n/a      | pass          | pass     | pass          |
| Sugar Cookies (HA) (`sugar-cookies`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Berry Parfait (Not-HA) (`berry-parfait-dessert`)                      | pass       | pass     | pass          | pass     | pass          |
| Pumpkin Custard (Not-HA) (`pumpkin-custard`)                          | pass       | pass     | pass          | pass     | pass          |
| Almond Cookies (HA) (`almond-cookies`)                                | n/a        | n/a      | pass          | pass     | pass          |
| Cereal and Milk (Not-HA) (`cereal-and-milk`)                          | pass       | pass     | pass          | pass     | pass          |
| Coffee (HA) (`drip-coffee`)                                           | n/a        | n/a      | **fail**      | pass     | pass          |
| Tea (HA) (`steeped-tea`)                                              | n/a        | n/a      | **fail**      | pass     | pass          |
| Water (HA) (`glass-of-water`)                                         | n/a        | n/a      | pass          | pass     | pass          |
| Milk (Not-HA) (`glass-of-milk`)                                       | pass       | pass     | pass          | pass     | pass          |
| Peanut Butter and Jelly Sandwich (Not-HA) (`pb-and-j`)                | pass       | pass     | pass          | pass     | pass          |
| Mashed Potatoes (Not-HA) (`mashed-potatoes`)                          | pass       | pass     | pass          | pass     | pass          |
| Pan Gravy (Not-HA) (`pan-gravy`)                                      | pass       | pass     | pass          | pass     | pass          |
| Roasted Green Beans (HA) (`roasted-green-beans`)                      | n/a        | n/a      | pass          | pass     | pass          |
| Steamed Rice (HA) (`steamed-rice`)                                    | n/a        | n/a      | pass          | pass     | pass          |
| Steamed Broccoli (HA) (`steamed-broccoli`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Bagel and Cream Cheese (Not-HA) (`bagel-and-cream-cheese`)            | pass       | **fail** | pass          | pass     | pass          |
| Toaster Pastry (Not-HA) (`pop-tarts`)                                 | pass       | **fail** | pass          | pass     | pass          |
| Toaster Strudel (Not-HA) (`toaster-strudel`)                          | pass       | **fail** | pass          | pass     | pass          |
| Doughnuts (Not-HA) (`doughnuts`)                                      | pass       | **fail** | **fail**      | pass     | pass          |
| Breakfast Muffins (Not-HA) (`breakfast-muffins`)                      | pass       | pass     | pass          | pass     | pass          |
| Croissants (Not-HA) (`croissants`)                                    | pass       | **fail** | pass          | pass     | pass          |
| Brioche Toast (Not-HA) (`brioche-toast`)                              | pass       | **fail** | pass          | pass     | pass          |
| Crepes (Not-HA) (`crepes`)                                            | pass       | pass     | **fail**      | pass     | pass          |
| Pan Dulce (Not-HA) (`pan-dulce`)                                      | pass       | **fail** | pass          | pass     | pass          |
| Cinnamon Rolls (Not-HA) (`cinnamon-rolls`)                            | pass       | **fail** | pass          | pass     | pass          |
| Scones (Not-HA) (`scones`)                                            | pass       | pass     | pass          | pass     | pass          |
| Biscuits and Gravy (Not-HA) (`biscuits-and-gravy`)                    | **fail**   | n/a      | pass          | pass     | pass          |
| Stovetop Mac and Cheese (Not-HA) (`stovetop-mac-and-cheese`)          | pass       | pass     | pass          | pass     | pass          |
| Hot Pockets (Not-HA) (`hot-pockets`)                                  | pass       | **fail** | pass          | pass     | pass          |
| Meatloaf Sandwich (Not-HA) (`meatloaf-sandwich`)                      | pass       | pass     | pass          | pass     | pass          |
| Cornbread (Not-HA) (`cornbread`)                                      | pass       | pass     | pass          | pass     | pass          |
| Homemade Pizza (Not-HA) (`homemade-pizza`)                            | pass       | **fail** | pass          | pass     | pass          |
| Baked Mac and Cheese (Not-HA) (`baked-mac-and-cheese`)                | pass       | pass     | pass          | pass     | **fail**      |
| Cheese and Crackers (Not-HA) (`cheese-and-crackers`)                  | pass       | pass     | pass          | pass     | pass          |
| Granola Bar (HA) (`granola-bar`)                                      | n/a        | n/a      | pass          | pass     | pass          |
| Pretzels (Not-HA) (`pretzels-snack`)                                  | pass       | pass     | **fail**      | pass     | pass          |
| Beef Jerky (HA) (`beef-jerky-snack`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Leftover Muffin or Pastry (Not-HA) (`leftover-muffin`)                | pass       | **fail** | **fail**      | pass     | pass          |
| Ice Cream (Not-HA) (`homemade-ice-cream`)                             | pass       | pass     | pass          | pass     | pass          |
| Berry Pie (Not-HA) (`fruit-pie`)                                      | pass       | **fail** | pass          | pass     | pass          |
| Chocolate (HA) (`chocolate-candy`)                                    | n/a        | n/a      | pass          | pass     | pass          |
| Orange Juice (HA) (`orange-juice-glass`)                              | n/a        | n/a      | pass          | pass     | pass          |
| Hot Chocolate (Not-HA) (`hot-chocolate-mug`)                          | pass       | pass     | pass          | pass     | pass          |
| Protein Shake (Not-HA) (`protein-shake`)                              | **fail**   | n/a      | pass          | pass     | pass          |
| Soda (HA) (`soda-pour`)                                               | n/a        | n/a      | pass          | pass     | pass          |
| Energy Drink (Not-HA) (`energy-drink-can`)                            | n/a        | n/a      | pass          | pass     | pass          |
| Sports Drink (Not-HA) (`sports-drink-pour`)                           | n/a        | n/a      | pass          | pass     | pass          |
| Egg in a Hole (Not-HA) (`egg-in-a-hole`)                              | pass       | pass     | pass          | pass     | **fail**      |
| English Muffins (Not-HA) (`english-muffins-butter`)                   | pass       | **fail** | pass          | pass     | pass          |
| Weet-Bix (Not-HA) (`weet-bix-bowl`)                                   | pass       | **fail** | pass          | pass     | pass          |
| Vegemite on Toast (Not-HA) (`vegemite-on-toast`)                      | pass       | **fail** | pass          | pass     | pass          |
| Beans on Toast (Not-HA) (`beans-on-toast`)                            | **fail**   | n/a      | pass          | pass     | pass          |
| Mince on Toast (Not-HA) (`mince-on-toast`)                            | pass       | pass     | pass          | pass     | pass          |
| Crumpets (Not-HA) (`crumpets-butter`)                                 | pass       | **fail** | pass          | pass     | pass          |
| Café con Leche (Not-HA) (`cafe-con-leche`)                            | pass       | pass     | pass          | pass     | pass          |
| Espresso (HA) (`espresso`)                                            | n/a        | n/a      | pass          | pass     | **fail**      |
| Soy Milk (HA) (`soy-milk-warm`)                                       | n/a        | n/a      | pass          | pass     | pass          |
| Full English Breakfast (Not-HA) (`full-english`)                      | **fail**   | n/a      | pass          | pass     | pass          |
| Youtiao (Not-HA) (`youtiao`)                                          | pass       | pass     | pass          | **fail** | pass          |
| Baozi (Not-HA) (`baozi`)                                              | pass       | pass     | pass          | **fail** | pass          |
| Miso Soup (HA) (`miso-soup`)                                          | n/a        | n/a      | pass          | pass     | pass          |
| Grilled Fish (HA) (`grilled-fish-breakfast`)                          | n/a        | n/a      | pass          | pass     | pass          |
| Natto Rice (Not-HA) (`natto-rice`)                                    | not needed | n/a      | pass          | pass     | pass          |
| Korean Breakfast Rice (Not-HA) (`korean-breakfast-rice`)              | pass       | pass     | pass          | pass     | pass          |
| Pão de Queijo (Not-HA) (`pao-de-queijo`)                              | pass       | **fail** | pass          | pass     | pass          |
| Açaí Bowl (Not-HA) (`acai-bowl`)                                      | pass       | pass     | pass          | pass     | pass          |
| Tamales (Not-HA) (`tamales`)                                          | pass       | pass     | **fail**      | pass     | pass          |
| Peameal Bacon Sandwich (Not-HA) (`peameal-bacon-sandwich`)            | pass       | **fail** | pass          | pass     | pass          |
| Fish and Chips (Not-HA) (`fish-and-chips`)                            | not needed | n/a      | pass          | pass     | pass          |
| Meat Pie (Not-HA) (`meat-pie`)                                        | pass       | **fail** | pass          | pass     | **fail**      |
| Sausage Roll (Not-HA) (`sausage-roll`)                                | not needed | n/a      | pass          | pass     | pass          |
| Poutine (Not-HA) (`poutine`)                                          | pass       | pass     | pass          | pass     | pass          |
| Ploughman's Lunch (Not-HA) (`ploughmans`)                             | pass       | pass     | pass          | pass     | pass          |
| Kimbap (HA) (`kimbap`)                                                | n/a        | n/a      | pass          | pass     | pass          |
| Ramen (Not-HA) (`ramen-bowl`)                                         | pass       | **fail** | pass          | pass     | pass          |
| Udon (Not-HA) (`udon-bowl`)                                           | pass       | **fail** | pass          | pass     | pass          |
| Phở (HA) (`pho-bowl`)                                                 | n/a        | n/a      | pass          | pass     | pass          |
| Torta (Not-HA) (`torta`)                                              | not needed | n/a      | pass          | pass     | pass          |
| Cemita (Not-HA) (`cemita`)                                            | not needed | n/a      | pass          | **fail** | pass          |
| Panini (Not-HA) (`panini`)                                            | pass       | pass     | pass          | pass     | pass          |
| Tapioca Crêpe (Not-HA) (`tapioca-crepe`)                              | pass       | pass     | pass          | pass     | pass          |
| Gyro (Not-HA) (`gyro`)                                                | pass       | **fail** | pass          | pass     | pass          |
| Bangers (Not-HA) (`bangers`)                                          | not needed | n/a      | pass          | pass     | pass          |
| Chicken Parma (Not-HA) (`chicken-parma`)                              | pass       | pass     | pass          | pass     | pass          |
| Schnitzel (Not-HA) (`schnitzel`)                                      | pass       | pass     | pass          | pass     | pass          |
| Milanesa (Not-HA) (`milanesa`)                                        | pass       | pass     | pass          | pass     | pass          |
| Carbonara (Not-HA) (`carbonara`)                                      | pass       | pass     | pass          | pass     | pass          |
| Gnocchi (Not-HA) (`gnocchi`)                                          | pass       | pass     | pass          | pass     | pass          |
| Feijoada (Not-HA) (`feijoada`)                                        | pass       | pass     | pass          | pass     | pass          |
| Churrasco (HA) (`churrasco`)                                          | n/a        | n/a      | pass          | pass     | pass          |
| Bibimbap (Not-HA) (`bibimbap`)                                        | pass       | **fail** | pass          | pass     | pass          |
| Kimchi Jjigae (Not-HA) (`kimchi-jjigae`)                              | pass       | **fail** | pass          | pass     | pass          |
| Donburi (Not-HA) (`donburi`)                                          | pass       | pass     | pass          | pass     | pass          |
| Japanese Curry (Not-HA) (`japanese-curry`)                            | pass       | pass     | pass          | pass     | pass          |
| Dumplings (Not-HA) (`dumplings`)                                      | pass       | **fail** | pass          | pass     | pass          |
| Mapo Tofu (Not-HA) (`mapo-tofu`)                                      | pass       | **fail** | **fail**      | pass     | pass          |
| Hot Pot (HA) (`hot-pot`)                                              | n/a        | n/a      | pass          | pass     | pass          |
| Pozole (HA) (`pozole`)                                                | n/a        | n/a      | pass          | pass     | pass          |
| Chicken Mole (Not-HA) (`chicken-mole`)                                | pass       | pass     | **fail**      | **fail** | pass          |
| Pad Thai (HA) (`pad-thai-home`)                                       | n/a        | n/a      | pass          | pass     | pass          |
| Kebab (Not-HA) (`kebab`)                                              | pass       | pass     | pass          | pass     | pass          |
| Moules Frites (Not-HA) (`moules-frites`)                              | **fail**   | n/a      | **fail**      | pass     | pass          |
| Onigiri (Not-HA) (`onigiri`)                                          | **fail**   | n/a      | pass          | pass     | pass          |
| Tteokbokki (Not-HA) (`tteokbokki`)                                    | not needed | n/a      | pass          | pass     | pass          |
| Potstickers (Not-HA) (`potstickers`)                                  | pass       | **fail** | pass          | pass     | pass          |
| Fairy Bread (Not-HA) (`fairy-bread`)                                  | pass       | pass     | pass          | pass     | pass          |
| Nanaimo Bars (HA) (`nanaimo-bars`)                                    | n/a        | n/a      | pass          | **fail** | pass          |
| Brigadeiro (Not-HA) (`brigadeiro`)                                    | pass       | **fail** | pass          | pass     | pass          |
| Pavlova (Not-HA) (`pavlova`)                                          | pass       | pass     | pass          | pass     | pass          |
| Lamingtons (Not-HA) (`lamingtons`)                                    | pass       | pass     | **fail**      | pass     | pass          |
| Sticky Toffee Pudding (Not-HA) (`sticky-toffee-pudding`)              | **fail**   | n/a      | pass          | **fail** | pass          |
| Tiramisu (Not-HA) (`tiramisu`)                                        | pass       | **fail** | pass          | pass     | pass          |
| Gelato (Not-HA) (`gelato`)                                            | pass       | **fail** | pass          | pass     | pass          |
| Mochi (Not-HA) (`mochi-dessert`)                                      | n/a        | n/a      | pass          | pass     | pass          |
| Red Bean Soup (HA) (`red-bean-soup`)                                  | n/a        | n/a      | pass          | pass     | pass          |
| Tres Leches Cake (Not-HA) (`tres-leches`)                             | pass       | **fail** | pass          | pass     | pass          |
| Cannoli (Not-HA) (`cannoli`)                                          | pass       | **fail** | pass          | pass     | pass          |
| Atole (Not-HA) (`atole`)                                              | pass       | pass     | pass          | pass     | pass          |
| Agua Fresca (Not-HA) (`agua-fresca`)                                  | **fail**   | n/a      | pass          | pass     | pass          |
| Horchata (HA) (`horchata`)                                            | n/a        | n/a      | pass          | pass     | pass          |
| Bubble Tea (Not-HA) (`bubble-tea`)                                    | pass       | **fail** | pass          | pass     | pass          |
| Barley Tea (Not-HA) (`barley-tea`)                                    | pass       | **fail** | pass          | pass     | pass          |
| Guaraná (HA) (`guarana-soda`)                                         | n/a        | n/a      | pass          | pass     | pass          |
| Soft Scrambled Eggs (HA) (`scrambled-eggs-ha`)                        | n/a        | pass     | pass          | pass     | pass          |
| Yogurt Berry Bowl (HA) (`yogurt-berry-bowl-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Potato Breakfast Hash (HA) (`breakfast-hash-ha`)                      | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Tacos (HA) (`breakfast-tacos-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Shakshuka (HA) (`shakshuka-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Masala Omelette (HA) (`masala-omelette-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Cheese Omelette (HA) (`cheese-omelette-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Veggie Frittata (HA) (`veggie-frittata-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Burrito (HA) (`breakfast-burrito-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Egg Muffins (HA) (`egg-muffins-ha`)                                   | n/a        | pass     | pass          | pass     | pass          |
| Overnight Oats (HA) (`overnight-oats-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| French Toast (HA) (`french-toast-ha`)                                 | n/a        | pass     | pass          | pass     | pass          |
| Waffles (HA) (`gf-waffles-ha`)                                        | n/a        | pass     | pass          | pass     | pass          |
| Cornmeal Pancakes (HA) (`cornmeal-pancakes-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Quesadilla (HA) (`breakfast-quesadilla-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Huevos Rancheros (HA) (`huevos-rancheros-ha`)                         | n/a        | pass     | pass          | pass     | pass          |
| Migas (HA) (`migas-ha`)                                               | n/a        | pass     | pass          | pass     | **fail**      |
| Breakfast Fried Rice (HA) (`breakfast-fried-rice-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Yogurt Parfait (HA) (`yogurt-parfait-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Casserole (HA) (`breakfast-casserole-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Potatoes (HA) (`breakfast-potatoes-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Chia Pudding (HA) (`chia-pudding-ha`)                                 | n/a        | pass     | pass          | pass     | pass          |
| Granola and Milk (HA) (`granola-and-milk-ha`)                         | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Sandwich (HA) (`breakfast-sandwich-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Tostadas (HA) (`breakfast-tostadas-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Egg Bhurji (HA) (`egg-bhurji-ha`)                                     | n/a        | pass     | pass          | pass     | pass          |
| Spinach Egg Scramble (HA) (`spinach-egg-scramble-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Polenta (HA) (`breakfast-polenta-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Ham and Egg Skillet (HA) (`ham-egg-skillet-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Sweet Potato Hash (HA) (`sweet-potato-hash-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Ricotta Toast (HA) (`ricotta-toast-ha`)                               | n/a        | **fail** | pass          | **fail** | pass          |
| Breakfast Grits (HA) (`breakfast-grits-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Tofu Scramble (HA) (`tofu-scramble-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Breakfast Beans (HA) (`breakfast-beans-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Sourdough Turkey Sandwich (HA) (`sourdough-turkey-sandwich-ha`)       | n/a        | pass     | pass          | pass     | pass          |
| Greek Salad (HA) (`greek-salad-ha`)                                   | n/a        | pass     | pass          | pass     | pass          |
| Cheese Quesadilla (HA) (`cheese-quesadilla-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Tomato Basil Soup (HA) (`tomato-basil-soup-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Hummus and Veggie Plate (HA) (`hummus-veggie-plate-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Veggie Fried Rice (HA) (`veggie-fried-rice-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Grilled Cheese (HA) (`grilled-cheese-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Chef Salad (HA) (`chef-salad-ha`)                                     | n/a        | pass     | pass          | pass     | pass          |
| Caesar-Style Salad (HA) (`caesar-style-salad-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Caprese Salad (HA) (`caprese-salad-ha`)                               | n/a        | **fail** | pass          | **fail** | pass          |
| Taco Salad (HA) (`taco-salad-ha`)                                     | n/a        | pass     | pass          | pass     | pass          |
| Quinoa Salad (HA) (`quinoa-salad-ha`)                                 | n/a        | pass     | pass          | pass     | pass          |
| Pasta Salad (HA) (`pasta-salad-ha`)                                   | n/a        | pass     | pass          | pass     | pass          |
| Chicken Rice Soup (HA) (`chicken-rice-soup-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Lentil Soup (HA) (`lentil-soup-ha`)                                   | n/a        | pass     | pass          | pass     | pass          |
| Black Bean Soup (HA) (`black-bean-soup-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Minestrone (HA) (`minestrone-ha`)                                     | n/a        | pass     | pass          | pass     | pass          |
| Leftover Chili Bowl (HA) (`leftover-chili-bowl-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Burrito Bowl (HA) (`burrito-bowl-ha`)                                 | n/a        | pass     | pass          | pass     | pass          |
| Baked Potato (HA) (`baked-potato-lunch-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Stuffed Sweet Potato (HA) (`stuffed-sweet-potato-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Ham and Cheese Sandwich (HA) (`ham-cheese-sandwich-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Chicken Noodle Soup (HA) (`chicken-noodle-soup-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Tomato Cucumber Salad (HA) (`tomato-cucumber-salad-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Leftover Taco Bowl (HA) (`leftover-taco-bowl-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Fried Egg Rice (HA) (`fried-egg-rice-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Mediterranean Bowl (HA) (`mediterranean-bowl-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Pesto Pasta (HA) (`pesto-pasta-lunch-ha`)                             | n/a        | **fail** | pass          | **fail** | pass          |
| Chickpea Patty Plate (HA) (`chickpea-patty-plate-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Corn Chowder (HA) (`corn-chowder-ha`)                                 | n/a        | pass     | pass          | pass     | pass          |
| Leftover Dal Bowl (HA) (`leftover-dal-bowl-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Arugula Chicken Salad (HA) (`arugula-chicken-salad-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Nachos (HA) (`loaded-nachos-lunch-ha`)                                | n/a        | pass     | pass          | pass     | pass          |
| Quinoa Veggie Bowl (HA) (`quinoa-veggie-bowl-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Sunday Roast Chicken (HA) (`sunday-roast-chicken-ha`)                 | n/a        | **fail** | pass          | **fail** | pass          |
| Weeknight Chili (HA) (`weeknight-chili-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Skillet Burgers (HA) (`skillet-burgers-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Turkey Meatloaf (HA) (`turkey-meatloaf-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Taco Night (HA) (`taco-night-ha`)                                     | n/a        | pass     | pass          | pass     | pass          |
| Salsa Chicken (HA) (`salsa-chicken-ha`)                               | n/a        | **fail** | pass          | **fail** | pass          |
| Rice and Beans (HA) (`rice-and-beans-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Gluten-Free Spaghetti Marinara (HA) (`gf-spaghetti-marinara-ha`)      | n/a        | pass     | pass          | pass     | pass          |
| Chicken Cacciatore (HA) (`chicken-cacciatore-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Parmesan Risotto (HA) (`parmesan-risotto-ha`)                         | n/a        | **fail** | pass          | pass     | pass          |
| Chicken and Veggie Stir-Fry (HA) (`chicken-veggie-stir-fry-ha`)       | n/a        | pass     | pass          | pass     | pass          |
| Teriyaki Salmon Bowls (HA) (`teriyaki-salmon-bowls-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Lemon Herb Greek Chicken (HA) (`lemon-herb-greek-chicken-ha`)         | n/a        | pass     | pass          | pass     | pass          |
| Shawarma-Spiced Chicken (HA) (`shawarma-spiced-chicken-ha`)           | n/a        | pass     | pass          | pass     | pass          |
| Weeknight Dal (HA) (`weeknight-dal-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Yogurt-Marinated Chicken (HA) (`yogurt-marinated-chicken-ha`)         | n/a        | **fail** | pass          | pass     | pass          |
| Chickpea Curry (HA) (`chickpea-curry-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Beef Stew (HA) (`beef-stew-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Pot Roast (HA) (`pot-roast-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Meatballs and Rice (HA) (`meatballs-and-rice-ha`)                     | n/a        | **fail** | **fail**      | pass     | pass          |
| Sloppy Joes (HA) (`sloppy-joes-ha`)                                   | n/a        | pass     | pass          | pass     | pass          |
| Stuffed Bell Peppers (HA) (`stuffed-bell-peppers-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Chicken and Rice Casserole (HA) (`chicken-rice-casserole-ha`)         | n/a        | pass     | pass          | pass     | pass          |
| Sausage and Peppers (HA) (`sausage-and-peppers-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Pulled Pork (HA) (`pulled-pork-ha`)                                   | n/a        | **fail** | pass          | **fail** | pass          |
| Chili Baked Potatoes (HA) (`chili-baked-potatoes-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Chicken Pot Pie (HA) (`chicken-pot-pie-ha`)                           | n/a        | pass     | pass          | pass     | **fail**      |
| Beef Meatloaf (HA) (`beef-meatloaf-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Chicken Fajitas (HA) (`chicken-fajitas-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Beef Enchiladas (HA) (`beef-enchiladas-ha`)                           | n/a        | **fail** | pass          | pass     | pass          |
| Chicken Tinga (HA) (`chicken-tinga-ha`)                               | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Chile Verde (HA) (`chile-verde-ha`)                                   | n/a        | **fail** | pass          | **fail** | pass          |
| Picadillo (HA) (`picadillo-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Burrito Skillet (HA) (`burrito-skillet-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Tamale Pie (HA) (`tamale-pie-ha`)                                     | n/a        | pass     | pass          | pass     | pass          |
| Corn and Chicken Bowls (HA) (`elote-chicken-bowls-ha`)                | n/a        | pass     | pass          | pass     | pass          |
| Poblano and Cheese Skillet (HA) (`poblano-cheese-skillet-ha`)         | n/a        | pass     | pass          | pass     | pass          |
| Chicken Parmesan (HA) (`chicken-parm-ha`)                             | n/a        | **fail** | **fail**      | pass     | **fail**      |
| Eggplant Parmesan (HA) (`eggplant-parm-ha`)                           | n/a        | **fail** | **fail**      | pass     | **fail**      |
| Pesto Pasta (HA) (`pesto-pasta-dinner-ha`)                            | n/a        | **fail** | pass          | **fail** | pass          |
| Sausage Pasta (HA) (`sausage-pasta-ha`)                               | n/a        | **fail** | **fail**      | pass     | pass          |
| Lasagna (HA) (`lasagna-ha`)                                           | n/a        | **fail** | **fail**      | pass     | pass          |
| Meatballs Marinara (HA) (`meatballs-marinara-ha`)                     | n/a        | **fail** | **fail**      | pass     | pass          |
| Baked Ziti (HA) (`baked-ziti-ha`)                                     | n/a        | **fail** | **fail**      | pass     | pass          |
| Shrimp Scampi (HA) (`shrimp-scampi-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| White Beans and Greens (HA) (`white-beans-and-greens-ha`)             | n/a        | pass     | pass          | pass     | pass          |
| Caprese Chicken (HA) (`caprese-chicken-ha`)                           | n/a        | **fail** | pass          | **fail** | pass          |
| Mushroom Risotto (HA) (`mushroom-risotto-ha`)                         | n/a        | pass     | pass          | pass     | pass          |
| Pasta Primavera (HA) (`pasta-primavera-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Sausage and White Beans (HA) (`sausage-white-beans-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Creamy Polenta with Sausage (HA) (`creamy-polenta-sausage-ha`)        | n/a        | **fail** | **fail**      | pass     | pass          |
| Beef and Broccoli (HA) (`beef-and-broccoli-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Sesame Chicken (HA) (`sesame-chicken-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Tofu Stir-Fry (HA) (`tofu-stir-fry-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Rice Noodle Stir-Fry (HA) (`rice-noodle-stir-fry-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Coconut Curry Chicken (HA) (`coconut-curry-chicken-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Orange Chicken (HA) (`orange-chicken-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Tofu and Pork Skillet (HA) (`tofu-pork-skillet-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Tempeh Stir-Fry (HA) (`tempeh-stir-fry-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Chicken Souvlaki (HA) (`chicken-souvlaki-ha`)                         | n/a        | pass     | pass          | pass     | pass          |
| Baked Feta and Tomatoes (HA) (`baked-feta-tomatoes-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Chickpea Bowls (HA) (`chickpea-bowls-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Shrimp and Rice (HA) (`shrimp-and-rice-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Chickpea Stew (HA) (`chickpea-stew-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Baked Eggplant (HA) (`baked-eggplant-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Grilled Lamb Salad (HA) (`grilled-lamb-salad-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Butter Chicken (HA) (`butter-chicken-ha`)                             | n/a        | pass     | **fail**      | pass     | **fail**      |
| Chana Masala (HA) (`chana-masala-ha`)                                 | n/a        | pass     | pass          | pass     | pass          |
| Spinach Chicken (HA) (`spinach-chicken-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Egg Curry (HA) (`egg-curry-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Chicken Tikka (HA) (`chicken-tikka-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Potato and Pea Curry (HA) (`potato-pea-curry-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Kidney Bean Curry (HA) (`kidney-bean-curry-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Spinach and Cheese (HA) (`spinach-and-cheese-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Chicken Rice Pilaf (HA) (`chicken-rice-pilaf-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Tandoori-Style Chicken (HA) (`tandoori-style-chicken-ha`)             | n/a        | pass     | pass          | pass     | pass          |
| Shrimp Masala (HA) (`shrimp-masala-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Jambalaya (HA) (`jambalaya-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Jerk Chicken (HA) (`jerk-chicken-ha`)                                 | n/a        | pass     | pass          | pass     | pass          |
| Peanut Stew (HA) (`peanut-stew-ha`)                                   | n/a        | pass     | pass          | pass     | pass          |
| Swedish Meatballs (HA) (`swedish-meatballs-ha`)                       | n/a        | **fail** | pass          | pass     | pass          |
| Plantain and Beans (HA) (`plantain-and-beans-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Coconut Shrimp (HA) (`coconut-shrimp-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Stuffed Cabbage (HA) (`stuffed-cabbage-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Baked Beans and Sausage (HA) (`baked-beans-sausage-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Cucumber Yogurt Dip (HA) (`cucumber-yogurt-dip-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Cheese and Rice Cakes (HA) (`cheese-and-rice-cakes-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Salsa and Chips (HA) (`salsa-and-chips-ha`)                           | n/a        | **fail** | pass          | **fail** | pass          |
| Yogurt Cup (HA) (`yogurt-cup-ha`)                                     | n/a        | pass     | pass          | pass     | pass          |
| Granola Clusters (HA) (`granola-clusters-ha`)                         | n/a        | pass     | pass          | pass     | pass          |
| Energy Bites (HA) (`energy-bites-ha`)                                 | n/a        | pass     | pass          | pass     | pass          |
| Cheese Crisps (HA) (`cheese-crisps-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Snack Nachos (HA) (`snack-nachos-ha`)                                 | n/a        | **fail** | pass          | pass     | pass          |
| Olive Plate (HA) (`olive-plate-ha`)                                   | n/a        | pass     | pass          | pass     | pass          |
| Pickles and Cheese (HA) (`pickles-and-cheese-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Frozen Yogurt Bites (HA) (`frozen-yogurt-bites-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Chocolate Pudding (HA) (`chocolate-pudding-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Vanilla Pudding (HA) (`vanilla-pudding-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| No-Bake Cookies (HA) (`no-bake-cookies-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Fudge (HA) (`fudge-ha`)                                               | n/a        | pass     | pass          | pass     | pass          |
| Chocolate Mug Cake (HA) (`chocolate-mug-cake-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Strawberry Shortcake (HA) (`strawberry-shortcake-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Whipped Berry Cups (HA) (`whipped-berry-cups-ha`)                     | n/a        | pass     | pass          | pass     | pass          |
| Rice Kheer (HA) (`rice-kheer-ha`)                                     | n/a        | pass     | pass          | pass     | pass          |
| Carrot Cake Squares (HA) (`carrot-cake-squares-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Berry Parfait (HA) (`berry-parfait-dessert-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Pumpkin Custard (HA) (`pumpkin-custard-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Cereal and Milk (HA) (`cereal-and-milk-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Milk (HA) (`glass-of-milk-ha`)                                        | n/a        | pass     | pass          | pass     | pass          |
| Peanut Butter and Jelly Sandwich (HA) (`pb-and-j-ha`)                 | n/a        | pass     | pass          | pass     | pass          |
| Mashed Potatoes (HA) (`mashed-potatoes-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Pan Gravy (HA) (`pan-gravy-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Bagel and Cream Cheese (HA) (`bagel-and-cream-cheese-ha`)             | n/a        | **fail** | pass          | **fail** | pass          |
| Toaster Pastry (HA) (`pop-tarts-ha`)                                  | n/a        | **fail** | pass          | **fail** | **fail**      |
| Toaster Strudel (HA) (`toaster-strudel-ha`)                           | n/a        | **fail** | **fail**      | **fail** | pass          |
| Doughnuts (HA) (`doughnuts-ha`)                                       | n/a        | **fail** | **fail**      | **fail** | pass          |
| Breakfast Muffins (HA) (`breakfast-muffins-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Croissants (HA) (`croissants-ha`)                                     | n/a        | **fail** | pass          | **fail** | pass          |
| Brioche Toast (HA) (`brioche-toast-ha`)                               | n/a        | **fail** | pass          | pass     | pass          |
| Crepes (HA) (`crepes-ha`)                                             | n/a        | pass     | **fail**      | pass     | pass          |
| Pan Dulce (HA) (`pan-dulce-ha`)                                       | n/a        | **fail** | pass          | **fail** | pass          |
| Cinnamon Rolls (HA) (`cinnamon-rolls-ha`)                             | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Scones (HA) (`scones-ha`)                                             | n/a        | pass     | pass          | pass     | pass          |
| Stovetop Mac and Cheese (HA) (`stovetop-mac-and-cheese-ha`)           | n/a        | pass     | pass          | pass     | pass          |
| Hot Pockets (HA) (`hot-pockets-ha`)                                   | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Meatloaf Sandwich (HA) (`meatloaf-sandwich-ha`)                       | n/a        | pass     | pass          | pass     | pass          |
| Cornbread (HA) (`cornbread-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Homemade Pizza (HA) (`homemade-pizza-ha`)                             | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Baked Mac and Cheese (HA) (`baked-mac-and-cheese-ha`)                 | n/a        | pass     | pass          | pass     | **fail**      |
| Cheese and Crackers (HA) (`cheese-and-crackers-ha`)                   | n/a        | pass     | pass          | pass     | pass          |
| Pretzels (HA) (`pretzels-snack-ha`)                                   | n/a        | pass     | **fail**      | pass     | pass          |
| Leftover Muffin or Pastry (HA) (`leftover-muffin-ha`)                 | n/a        | **fail** | **fail**      | pass     | pass          |
| Ice Cream (HA) (`homemade-ice-cream-ha`)                              | n/a        | pass     | pass          | pass     | pass          |
| Berry Pie (HA) (`fruit-pie-ha`)                                       | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Hot Chocolate (HA) (`hot-chocolate-mug-ha`)                           | n/a        | pass     | pass          | pass     | pass          |
| Egg in a Hole (HA) (`egg-in-a-hole-ha`)                               | n/a        | pass     | pass          | pass     | **fail**      |
| English Muffins (HA) (`english-muffins-butter-ha`)                    | n/a        | **fail** | **fail**      | **fail** | pass          |
| Weet-Bix (HA) (`weet-bix-bowl-ha`)                                    | n/a        | **fail** | pass          | **fail** | pass          |
| Vegemite on Toast (HA) (`vegemite-on-toast-ha`)                       | n/a        | **fail** | pass          | **fail** | pass          |
| Mince on Toast (HA) (`mince-on-toast-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Crumpets (HA) (`crumpets-butter-ha`)                                  | n/a        | **fail** | pass          | **fail** | pass          |
| Café con Leche (HA) (`cafe-con-leche-ha`)                             | n/a        | pass     | pass          | pass     | pass          |
| Youtiao (HA) (`youtiao-ha`)                                           | n/a        | pass     | pass          | **fail** | pass          |
| Baozi (HA) (`baozi-ha`)                                               | n/a        | pass     | pass          | **fail** | pass          |
| Korean Breakfast Rice (HA) (`korean-breakfast-rice-ha`)               | n/a        | pass     | pass          | pass     | pass          |
| Pão de Queijo (HA) (`pao-de-queijo-ha`)                               | n/a        | **fail** | **fail**      | pass     | **fail**      |
| Açaí Bowl (HA) (`acai-bowl-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Tamales (HA) (`tamales-ha`)                                           | n/a        | pass     | **fail**      | pass     | pass          |
| Peameal Bacon Sandwich (HA) (`peameal-bacon-sandwich-ha`)             | n/a        | **fail** | **fail**      | **fail** | pass          |
| Meat Pie (HA) (`meat-pie-ha`)                                         | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Poutine (HA) (`poutine-ha`)                                           | n/a        | **fail** | pass          | pass     | pass          |
| Ploughman's Lunch (HA) (`ploughmans-ha`)                              | n/a        | pass     | pass          | pass     | pass          |
| Ramen (HA) (`ramen-bowl-ha`)                                          | n/a        | **fail** | pass          | pass     | pass          |
| Udon (HA) (`udon-bowl-ha`)                                            | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Panini (HA) (`panini-ha`)                                             | n/a        | pass     | pass          | pass     | pass          |
| Tapioca Crêpe (HA) (`tapioca-crepe-ha`)                               | n/a        | pass     | pass          | pass     | pass          |
| Gyro (HA) (`gyro-ha`)                                                 | n/a        | **fail** | **fail**      | **fail** | pass          |
| Chicken Parma (HA) (`chicken-parma-ha`)                               | n/a        | **fail** | **fail**      | pass     | **fail**      |
| Schnitzel (HA) (`schnitzel-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Milanesa (HA) (`milanesa-ha`)                                         | n/a        | pass     | pass          | pass     | pass          |
| Carbonara (HA) (`carbonara-ha`)                                       | n/a        | pass     | pass          | pass     | pass          |
| Gnocchi (HA) (`gnocchi-ha`)                                           | n/a        | pass     | pass          | pass     | pass          |
| Feijoada (HA) (`feijoada-ha`)                                         | n/a        | pass     | **fail**      | pass     | pass          |
| Bibimbap (HA) (`bibimbap-ha`)                                         | n/a        | **fail** | pass          | pass     | pass          |
| Kimchi Jjigae (HA) (`kimchi-jjigae-ha`)                               | n/a        | **fail** | pass          | pass     | pass          |
| Donburi (HA) (`donburi-ha`)                                           | n/a        | pass     | pass          | pass     | pass          |
| Japanese Curry (HA) (`japanese-curry-ha`)                             | n/a        | pass     | **fail**      | pass     | pass          |
| Dumplings (HA) (`dumplings-ha`)                                       | n/a        | **fail** | **fail**      | **fail** | pass          |
| Mapo Tofu (HA) (`mapo-tofu-ha`)                                       | n/a        | **fail** | **fail**      | **fail** | pass          |
| Chicken Mole (HA) (`chicken-mole-ha`)                                 | n/a        | pass     | **fail**      | **fail** | pass          |
| Kebab (HA) (`kebab-ha`)                                               | n/a        | pass     | pass          | pass     | pass          |
| Potstickers (HA) (`potstickers-ha`)                                   | n/a        | **fail** | **fail**      | **fail** | pass          |
| Fairy Bread (HA) (`fairy-bread-ha`)                                   | n/a        | pass     | pass          | pass     | pass          |
| Brigadeiro (HA) (`brigadeiro-ha`)                                     | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Pavlova (HA) (`pavlova-ha`)                                           | n/a        | pass     | pass          | pass     | pass          |
| Lamingtons (HA) (`lamingtons-ha`)                                     | n/a        | pass     | **fail**      | pass     | pass          |
| Tiramisu (HA) (`tiramisu-ha`)                                         | n/a        | **fail** | **fail**      | **fail** | pass          |
| Gelato (HA) (`gelato-ha`)                                             | n/a        | **fail** | pass          | **fail** | pass          |
| Tres Leches Cake (HA) (`tres-leches-ha`)                              | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Cannoli (HA) (`cannoli-ha`)                                           | n/a        | **fail** | **fail**      | **fail** | **fail**      |
| Atole (HA) (`atole-ha`)                                               | n/a        | pass     | pass          | pass     | pass          |
| Bubble Tea (HA) (`bubble-tea-ha`)                                     | n/a        | **fail** | pass          | **fail** | **fail**      |
| Barley Tea (HA) (`barley-tea-ha`)                                     | n/a        | **fail** | pass          | **fail** | pass          |

## Eat-out (not scored on C3–C5)

Eat-out entries have no ingredients or steps. Scoring C3 and C5 would be invented work.

| Order                                                         | C1                                               | C4 (does the description get the food?) | Notes                                                                                                                                                                            |
| ------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chick-fil-A Grilled Nuggets (`cfa-grilled-nuggets`)           | n/a (already the careful order)                  | pass                                    | Clear: grilled nuggets, no bun, no sauce.                                                                                                                                        |
| Grocery Rotisserie Chicken Plate (`grocery-rotisserie-plate`) | n/a                                              | pass                                    | Clear plate.                                                                                                                                                                     |
| Salmon Poke Bowl (`salmon-poke-simple`)                       | n/a                                              | pass                                    | Clear omissions (no onion, no avocado). Mentions tuna as an option; canned/raw tuna is not HA in the catalog — keep the salmon wording if this is meant as the HA-leaning order. |
| Chipotle Chicken Bowl (`chipotle-chicken-bowl`)               | fail — no HA order sibling                       | pass                                    | Honestly described as not HA. An HA order (chicken, rice, no salsa/cheese/sour cream/fajita veg, or a shop that will hold onion) should exist if this is a regular.              |
| McDonald’s Big Mac (`mcdonalds-big-mac`)                      | not needed                                       | pass                                    | The point of the entry is the usual order.                                                                                                                                       |
| Pepperoni Pizza Takeout (`pepperoni-pizza-night`)             | not needed                                       | pass                                    | Same.                                                                                                                                                                            |
| Pad Thai Takeout (`pad-thai-takeout`)                         | fail if you actually order a garlic-free version | pass                                    | The description already says it is not HA unless a shop will cook it clean.                                                                                                      |
| Burger and Fries (`burger-and-fries`)                         | not needed as written                            | pass                                    | Notes a bunless no-cheese plate as a different order — that sibling does not exist yet.                                                                                          |

## What I did not fail

- HA plates that use Daiya cheddar where mozzarella would be traditional (quesadilla, pizza, parm) — household cheddar swap, taste will be different, structure still works if the method matches.
- Coconut yogurt for Greek yogurt in bowls and parfaits.
- Almond milk for dairy milk in batters, oatmeal, and cocoa.
- Sourdough for sandwich bread.
- Corn tortillas for flour tortillas when the steps still say tortillas.
- Gluten-free flour in muffins, pancakes, scones, cornbread, gnocchi, and youtiao-style fried strips where a dough or batter is actually mixed.
- Black beans, butter, white sugar, as allowed.
- “Season” / “pepper” / “berries” / “chicken” / “dough” as shorthand for listed ingredients of that family. Same for “sweeten” covering listed sugar, and “oil and spices” covering listed cumin/paprika when salt is also named or already failed elsewhere.
- Pasta cooking water that is not listed.
- Garlic-infused oil left as `preparation: "minced"` (or “smashed” / “sliced”) when the steps still say to stir in the oil. That is a catalog-wide data-entry tell, scored only when the amount is still a garlic head (`sunday-roast-chicken-ha`).
- Leftover chili bowl lines labeled “in leftover chili” and used as “leftover chili” in the steps.

## Next stage (out of scope here)

Fix the pastry conversions by writing real doughs or by renaming the plates. Replace leftover “marinara” strings with crushed tomatoes (or put marinara back and accept not-HA). Rebuild Alfredo as an actual HA recipe (almond milk or stock, starch, nutritional yeast — no Parmesan, no lactose-free milk). Add the missing HA siblings that can be honest. Then re-run this rubric.
