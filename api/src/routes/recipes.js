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
                type: e.dishTypes.map(e=> {return {name : e}}),
                diets: e.diets.map(e=> {return {name : e}})
            }
            return recipe; })
        let allApiName = [...nameApiTodos]

        let allApiName2 = allApiName.filter(e=>e.title.includes(name) || e.title.toUpperCase().includes(name)|| e.title.toLowerCase().includes(name))
        let all = [...allApiName2,...recipes]

        let AllApi = allApiName.sort((a, b) => a.title.localeCompare(b.title))
        
        res.send(all.length === 0 ? AllApi : all )
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
                type: e.dishTypes.map(e=> {return {name : e}}),
                diets: e.diets.map(e=> {return {name : e}}) ,
               
            }
            return recipe
        })
        
        
      
        let nameTotal = [...nameApiTodos,...recipes]
        let nameTotal2 = nameTotal.sort((a, b) => a.title.localeCompare(b.title))
        res.send(nameTotal2)
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
                        diets: idDb.diets,
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
            type: e.dishTypes.map(e=> {return {name : e}}),
            summary: e.summary,
            diets: e.diets.map(e=> {return {name : e}}),
            analyzedInstructions: e.analyzedInstructions
    }
    res.send(info ? info : "not found")
    } }catch (error) {
        next(error)
    }})


module.exports = router;