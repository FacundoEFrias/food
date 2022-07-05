require("dotenv").config();
const { Router } = require('express');
const { Recipe,Diet } = require('../db');




const router = Router();

router.post("/", async (req, res,next) => {
    const {title, image, healthScore, type, summary, analyzedInstructions, diets} = req.body;
    
   try{
        let recipe = await Recipe.create({
            title,
            image,
            healthScore,
            type,
            summary,
            analyzedInstructions,
            
        })
        
        let diet = await Diet.findAll({
            where: {name: diets}
        })
        recipe.addDiet(diet)
        console.log(diets)
        res.send("Your recipe was created successfully")
    }catch(error){
        next(error)
   } } )
module.exports = router;