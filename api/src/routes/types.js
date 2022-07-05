require("dotenv").config();
const { Router } = require('express');
const { Recipe,Diet } = require('../db');
const {Op} = require("sequelize")
const axios = require("axios");

const { API_KEY } = process.env;

const router = Router();

let diets = [{name: 'gluten Free'},{name: 'ketogenic'},{name: 'vegetarian'},{name: 'lacto-vegetarian'},
	{name: 'lacto ovo vegetarian'},{name: 'vegan'},{name: 'pescatarian'},{name: 'paleolithic'},{name: 'primal'},
	{name: 'whole 30'}];

router.get("/", async (req, res,next) => {
    let diet = diets.forEach(e=>{
        Diet.findOrCreate({
            where: {name: e.name}
        })})
     let allDiet = await Diet.findAll()
     
     res.send(allDiet)
    
})

module.exports = router;