export const RECIPES = [{
    id: "1",
    image: "/img/recipe.jpg",
    name: "Sausage Linguini",
    duration: 60000,
    serves: 4,
    equipment: [
        "Frying pan"
    ],
    ingredients: [
        "400g Italian Sausages or Good Quality Pork Sausages",
        "6 Tablespoons Olive Oil",
        "1 Leek, Washed & Finely Chopped",
        "2 Tablespoons Fresh Rosemary Leaves, Finely Chopped",
        "50g Dried Porcini Mushrooms, Soaked In Warm Water For 15 Minutes, Drained",
        "100ml Dry White Wine",
        "150ml Double Cream",
        "500g Fresh Egg Tagliatelle",
        "Salt and pepper to taste"
    ],
    method: [{
        instruction: "Remove the skins from the sausages and place the meat mixture in a bowl.",
        next: [{
            instruction: "Heat the oil in a large frying pan over a low heat and fry the sausage meat and the leek for 5 minutes, stirring occasionally with a wooden spoon to crumble the meat",
            alarm: {
                duration: 15000,
                description: "Frying sausage meat is done"
            },
            next: [{
                instruction: "Add in the rosemary and mushrooms, season with salt and pepper and continue to cook for 2 minutes",
                alarm: {
                    duration: 6000,
                    description: "Mushrooms are done"
                },
                next: [{
                    instruction: "Pour in the wine and cook for a further minute to allow the alcohol to evaporate",
                    alarm: {
                        duration: 3000,
                        description: "Evaporating wine is done"
                    },
                    next: [{
                        instruction: "Pour in the cream, mix everything together and cook for 1 minute. Set aside",
                        alarm: {
                            duration: 3000,
                            description: "Cream is done"
                        }
                    }]
                }]
            }]
        }, {
            instruction: "Cook pasta",
            alarm: {
                duration: 30000,
                description: "Pasta is done"
            }
        }]
    }]
}];
