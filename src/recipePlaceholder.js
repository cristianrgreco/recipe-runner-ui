const RECIPE_PLACEHOLDER = {
  id: "id",
  name: "Name",
  image: "#",
  description: "X ".repeat(200),
  serves: 0,
  duration: 0,
  equipment: [],
  ingredients: [],
  method: [],
};

for (let i = 0; i < 5; i++) {
  RECIPE_PLACEHOLDER.ingredients.push(`${i}`);
  RECIPE_PLACEHOLDER.method.push({
    instruction: `${i}`,
    next: [],
  });
}

export default RECIPE_PLACEHOLDER;
