require("dotenv").config();
const { Router } = require('express');
const { Recipe,Diet } = require('../db');
const {Op} = require("sequelize")
const axios = require("axios");
const { UNSAFE_NavigationContext } = require("react-router-dom");
const { API_KEY } = process.env;

const router = Router();

router.post("/", async (req, res,next) => {
    const {title,image,healthScore,type,summary,analyzedInstructions,diets} = req.query;
    try {
        let recipe = await Recipe.create({
            title: title,
            image: image,
            healthScore: healthScore,
            type: type,
            summary: summary,
            analyzedInstructions: analyzedInstructions,

        })
        let diet = await Diet.findAll({
            where: {name: diets}
        })
        recipe.addDiet(diet)
        res.send("Your recipe was created successfully")
    } catch (error) {
        
    }
           
  
})
module.exports = router;