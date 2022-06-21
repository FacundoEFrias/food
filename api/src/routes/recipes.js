require("dotenv").config();
const { Router } = require('express');
const { Recipe,Diet } = require('../db');
const {Op} = require("sequelize")
const axios = require("axios");
const { API_KEY } = process.env;



const router = Router();

router.get("/", async (req, res,next) => {
    const {name} = req.query;
    
           
    try{
    if(name){
        const recipes = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {attributes: [] }
             },
            where: {
                title: {
                    [Op.iLike]:"%" + name + "%"
                }
            },
            order: [
                ["title", "DESC"]
            ],
        });
       
        let nameApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        let nameApiTodos = nameApi.data.results.map(e=>{
            var recipe = {
                id:e.id,
                title: e.title,
                image: e.image,
                healthScore: e.healthScore,
                type: e.dishTypes,
                diets: e.diets 
            }
            return recipe; })
        let allName = [...nameApiTodos,...recipes]

        let allName2 = allName.filter(e=>e.title.includes(name.replace(/^./, name[0].toUpperCase())) || e.title.includes(name.toLocaleLowerCase()))
        
        res.send(name ? allName2 : recipes)
    }else{
        const recipes = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {attributes: [] }
             },
                
            order: [
                ["title", "DESC"]
            ],
        });
        let nameApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        let nameApiTodos = nameApi.data.results.map(e=>{
            var recipe = {
                id:e.id,
                title: e.title,
                image: e.image,
                healthScore: e.healthScore,
                type: e.dishTypes,
                diets: e.diets 
            }
            return recipe
        })
        
        let nameApi2 = nameApiTodos.sort((a, b) => a.title.localeCompare(b.title))
        let nameDb2 = recipes.sort((a, b) => a.name.localeCompare(b.name))
        let nameTotal = [...nameApi2,...nameDb2]
        res.send(nameTotal)
    }
    
}catch(e){
    next(e)
}
})

router.get("/:id",async(req,res,next)=>{
    const {id} = req.params;
    try {
        if(id.includes("-")){
            let idDb = await Recipe.findByPk(id,{
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {attributes: [] }
                    },})
                const info = {
                        title: idDb.title,
                        image: idDb.image,
                        healthScore: idDb.healthScore,
                        type: idDb.type,
                        summary: idDb.summary,
                        diets: idDb.diets.map(p => p.name).join(', '),
                        analyzedInstructions: idDb.analyzedInstructions
                }
                res.send(info)
                   
    } else{
        let idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        let e = idApi.data
        const info = {
            title: e.title,
            image: e.image,
            healthScore: e.healthScore,
            type: e.type,
            summary: e.summary,
            diets: e.diets.map(p => p.name).join(', '),
            analyzedInstructions: e.analyzedInstructions
    }
    res.send(info)
    } }catch (error) {
        
    }})


module.exports = router;