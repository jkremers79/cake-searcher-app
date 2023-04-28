'use strict';

// import npm package 'prompt-sync' so the program can run in Node
const prompt = require('prompt-sync')();

const cakeRecipes = require("./cake-recipes.json");

const searchParams = {};


const authors = [];
while (true) {
    const author = prompt("Would you like to add an author to your search? (press enter to skip): ");

    if (author !== "") {
        authors.push(author);
        continue;
    }
    else { break; }
}

if (authors.length > 0) {
    searchParams.authors = authors;
}


const ingredients = [];
while (true) {
    const ingredient = prompt("Would you like to add an ingredient to your search? (press enter to skip): ");

    if (ingredient !== "") {
        ingredients.push(ingredient);
        continue;
    }
    else { break; }
}

if (ingredients.length > 0) {
    searchParams.ingredients = ingredients;
}


while (true) {
    const searchTerms = prompt("Would you like to add a search term(s)? Seperate words with a space, or press enter to skip: ");

    if (searchTerms !== "") {
        searchParams.searchTerms = searchTerms;
    }
    break;
}

console.log(searchParams);


const printRecipes = function (recipes) {

    if (recipes.length > 0) {
        const numberOfRecipes = recipes.length;
        console.log(`\n`);
        console.log(`Your search returned ${numberOfRecipes} recipe(s). \n`);

        recipes.forEach(recipe => {
            const { Name, Author, Ingredients, Description } = recipe;

            console.log(`${Name} \n`);

            if (Author != null) {
                console.log(`Recipe by ${Author} \n`);
            }
            else {
                console.log("Recipe by unknown Author \n");
            }

            if (Description != null) {
                console.log(`${Description} \n`);
            }

            console.log("List of ingredients:");

            Ingredients.forEach(ingredient => console.log(ingredient));

            console.log("---".repeat(20) + "\n");
        });
    } else { console.log("No recipes where found matching your search criteria"); }
};


const searchRecipes = function (recipes, searchParams) {

    const foundRecipes = recipes.filter(recipe => {
        let keep = true;

        if ('authors' in searchParams) {
            if (recipe.Author != null) {
                keep = keep && searchParams.authors.some((author) =>
                    recipe.Author.toLowerCase()
                        .includes(author.toLowerCase())
                );
            }
            else { return false; }
        }

        if ('ingredients' in searchParams) {
            keep = keep && searchParams.ingredients.every((ingredient) =>
                recipe.Ingredients.join()
                    .toLowerCase()
                    .includes(ingredient.toLowerCase())
            );
        }

        if ('searchTerms' in searchParams) {
            if (recipe.Description != null) {
                const recipeNameAndDescription = recipe.Name + ' ' + recipe.Description;

                keep = keep && searchParams.searchTerms.split(" ").every(searchTerm =>
                    recipeNameAndDescription.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            }
            else { return false; }
        }
        return keep;
    });
    return foundRecipes;
};

printRecipes(searchRecipes(cakeRecipes, searchParams));