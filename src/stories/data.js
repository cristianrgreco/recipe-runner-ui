export const recipe = data => ({
    name: 'Name',
    image: 'https://recipe-runner-uploads.s3.eu-west-2.amazonaws.com/c329a320-fd8e-11e9-a1a0-dd49d5491a41.jpeg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdBy: 'user@domain.com',
    duration: 60000,
    serves: 4,
    equipment: [
        'Equipment item 1',
        'Equipment item 2'
    ],
    ingredients: [
        'Ingredient 1',
        'Ingredient 2',
    ],
    method: [{
        instruction: 'Instruction 1',
        alarm: {
            duration: 6000000
        },
        next: [{
            instruction: 'Instruction 1.1',
            alarm: {
                duration: 600000
            },
            next: [{
                instruction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                next: []
            }]
        }]
    }, {
        instruction: 'Instruction 2',
        alarm: {
            duration: 60000
        },
        next: []
    }],
    ...data
});