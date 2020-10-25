const PLACEHOLDER_RECIPE = {
  id: "",
  name: "",
  image: "#",
  description: "",
  serves: 0,
  duration: 0,
  equipment: [],
  ingredients: [],
  method: [],
};

const PLACEHOLDER_RECIPES = [];

for (let i = 0; i < 20; i++) {
  PLACEHOLDER_RECIPES.push({ ...PLACEHOLDER_RECIPE, id: `id-${i}` });
}

export default PLACEHOLDER_RECIPES;
