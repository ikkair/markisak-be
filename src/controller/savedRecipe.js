const { v4: uuidv4 } = require('uuid');

const commonHelper = require('../helper/common');
const modelSavedRecipe = require('../model/savedRecipe');
const modelRecipe = require('../model/recipe');

const getSavedRecipe = async (req, res) => {
    try {
        //Check if recipe exists in db
        const id_recipe = req.params.id_recipe;
        const { rowCount } = await modelRecipe.findId(id_recipe);
        if (!rowCount) return commonHelper.response(res, null, 404, "Recipe not found");

        //Get Liked Recipe
        const result = await modelSavedRecipe.selectSavedRecipe(id_recipe);

        //Response
        commonHelper.response(res, result.rows, 200, "Get saved recipe successful");
    } catch (error) {
        console.log(error);
        commonHelper.response(res, null, 500, "Failed getting saved recipe");
    }
}

const getDetailSavedRecipe = async (req, res) => {
    try {
        //Check if recipe exists in db
        const id_recipe = req.params.id_recipe;
        const findIdRecipe = await modelRecipe.findId(id_recipe);
        if (!findIdRecipe.rowCount) return commonHelper.response(res, null, 404, "Recipe not found");
        
        //Check if saved recipe exists in database
        const id_saved_recipe = req.params.id_saved_recipe;
        const findIdSavedRecipe = await modelSavedRecipe.findId(id_saved_recipe);
        if (!findIdSavedRecipe.rowCount) return commonHelper.response(res, null, 404, "Liked recipe not found");

        //Get detail saved recipe
        const result = await modelSavedRecipe.selectDetailSavedRecipe(id_recipe, id_saved_recipe);

        //Response
        commonHelper.response(res, result.rows, 200, "Get detail saved recipe successful");
    } catch (error) {
        console.log(error);
        commonHelper.response(res, null, 500, "Failed getting detail saved recipe");
    }
}

const createSavedRecipe = async (req, res) => {
    try {
        //Check if recipe exists in db
        const id_recipe = req.params.id_recipe;
        const findIdRecipe = await modelRecipe.findId(id_recipe);
        if (!findIdRecipe.rowCount) return commonHelper.response(res, null, 404, "Recipe not found");

        //Check if user already saved recipe
        const id_user = req.payload.id;
        const findUserSavedRecipe = await modelSavedRecipe.findUserSavedRecipe(id_recipe, id_user)
        if (findUserSavedRecipe.rowCount) 
            return commonHelper.response(res, null, 403, "User already saved recipe");

        //Liked recipe metadata
        const data = {};
        data.id = uuidv4();
        data.id_user = id_user;
        data.id_recipe = id_recipe;
        data.created_at = Date.now();

        //Insert saved recipe
        const results = await modelSavedRecipe.insertSavedRecipe(data);

        //Response
        commonHelper.response(res, results.rows, 201, "User saved recipe");
    } catch (error) {
        console.log(error);
        commonHelper.response(res, null, 500, "Failed user saving recipe");
    }
}

const deleteSavedRecipe = async (req, res) => {
    try {
        //Check if recipe exists in db
        const id_recipe = req.params.id_recipe;
        const findIdRecipe = await modelRecipe.findId(id_recipe);
        if (!findIdRecipe.rowCount) return commonHelper.response(res, null, 404, "Recipe not found");

        //Check if user haven't saved recipe
        const id_user = req.payload.id;
        const findUserSavedRecipe = await modelSavedRecipe.findUserSavedRecipe(id_recipe, id_user)
        if (!findUserSavedRecipe.rowCount) 
            return commonHelper.response(res, null, 403, "User haven't saved recipe");

        //Delete saved recipe
        const results = await modelSavedRecipe.deleteSavedRecipe(id_recipe, id_user);

        //Response
        commonHelper.response(res, results.rows, 200, "User removed saved recipe");
    } catch (error) {
        console.log(error);
        commonHelper.response(res, null, 500, "Failed user removing saved recipe");
    }
}

module.exports = {
    getSavedRecipe,
    getDetailSavedRecipe,
    createSavedRecipe,
    deleteSavedRecipe
}