const pool = require('../config/db');

const selectLikedRecipe = (id_recipe, sortBy, sort, limit, offset) => {
    return pool.query(`SELECT * FROM liked_recipes WHERE id_recipe='${id_recipe}' 
        ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectDetailLikedRecipe = (id) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT * FROM liked_recipes WHERE id='${id}'`,
            (error, result) => !error ? resolve(result) : reject(error)));
}

const insertLikedRecipe = (data) => {
    const { id, id_user, id_recipe, created_at } = data;
    return pool.query(`INSERT INTO liked_recipes VALUES('${id}', '${id_user}',
        '${id_recipe}', '${created_at}')`);
}

const deleteLikedRecipe = (id_recipe, id_user) => {
    return pool.query(`DELETE FROM liked_recipes WHERE id_recipe='${id_recipe}' 
        AND id_user='${id_user}'`);
}

const selectUserLikedRecipe = (id_recipe, id_user) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT id_user FROM liked_recipes 
            WHERE id_recipe='${id_recipe}' AND id_user='${id_user}'`, 
            (error, result) => !error ? resolve(result) : reject(error)));
}

const countData = (id_recipe) => {
    return new Promise((resolve, reject) =>
        pool.query(`select count(*) from liked_recipes where id_recipe='${id_recipe}'`,
            (error, result) => (!error) ? resolve(result) : reject(error)));
}

const selectUserLikedRecipes = (id_user) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT * FROM liked_recipes 
            WHERE id_user='${id_user}'`, 
            (error, result) => !error ? resolve(result) : reject(error)));
}

module.exports = {
    selectLikedRecipe,
    selectDetailLikedRecipe,
    insertLikedRecipe,
    deleteLikedRecipe,
    selectUserLikedRecipe,
    selectUserLikedRecipes,
    countData
}