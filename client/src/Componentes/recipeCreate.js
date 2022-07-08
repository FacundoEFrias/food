import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import {allFood, PostRecipe, TypeDiet} from "../Redux/action"
import "./recipeCreate.css"
import { Link, useNavigate } from "react-router-dom"


function controlForm (input){
    const reg = new RegExp('^[0-9]+$');
    const titleReg = new RegExp('/^[A-Z]+$' , 'i');
    let errors = {}
    if(!input.title || titleReg.test(input.title)) errors.title= 'please put the title of the recipe'
    if(!input.summary) errors.summary= 'please put the summary of the recipe'
    
    if(input.healthScore<0 || input.healthScore>100 || !reg.test(input.healthScore)) errors.healthScore='put a healthScore between 0-100'
    return errors
}

function RecipeCreate() {
    let dispatch = useDispatch()
    let TypeDiet1 = useSelector(state => state.TypeDiet)
    let navigate = useNavigate()
    
    const [error,setError] = useState({})
    const [title, setTitle] = useState(
        {title: "",        
        image: "",
        healthScore: 0,
        summary: "",
        analyzedInstructions: "",
        diets: []}
    )
        useEffect(() => {
            dispatch(TypeDiet())
        },[dispatch])
        
        function handleChange(e){
            setTitle({...title, 
                [e.target.name]: e.target.value})
            setError(controlForm({
                    ...title,
                    [e.target.name] : e.target.value
                })) 
        }
        function handleSelect(e){
           setTitle({
            ...title,
            diets: [...title.diets, e.target.value]
     })}      
   
     function handleSubmit(e) {
        e.preventDefault()
        if(!title.title) {return alert("please put the title of the recipe")}
        if(!title.summary) {return alert("please put the summary of the recipe")}
        if(!title.healthScore) {return alert("please put the healthScore of the recipe")}
        dispatch(PostRecipe(title))
        dispatch(allFood())
        alert(`Recipe Created ${setTitle.name}`)
        
        setTitle({
            title: "",
            image: "",
            healthScore: 0,
            summary: "",
            analyzedInstructions: "",
            diets: []
            
        })
        navigate("/home")
    }
            
        
  return (
    <div className="back1">
        <Link to="/home">
            <button >Home</button>
        </Link>
        <div className="form-div">
       
            <div className="form-div1 ">
      
            <h1 className="titulo"> Create your Recipe </h1>

            <form  onSubmit={(e) => handleSubmit(e)}>
                <label className="label1">
                Title:
                <input className="Input1" type="text" name="title" value={title.title} onChange={handleChange}/>
                { error.title && (
                        <p className="error">{error.title}</p>
                    ) }
            </label>
           
            <label className="label1">
                Image:
                <input className="Input1" type="text" name="image" value={title.image} onChange={handleChange}/>
                
            </label>
           
            <label className="label1">
                Health Score:
                <input className="Input1" type="number" name="healthScore" value={title.healthScore} onChange={handleChange}/>
                { error.healthScore && (
                        <p className="error">{error.healthScore}</p>
                    ) }
            </label>
           
            <label className="label1">
                Summary:
                <input className="textarea"  type="text" name="summary" value={title.summary} onChange={handleChange}/>
                { error.summary && (
                        <p className="error">{error.summary}</p>
                    ) }
            </label>
           
            <label className="label1">
                Diets:
                <div className="DietInput" onChange={(e) => handleSelect(e)}>
                    {TypeDiet1.map((die) => (
                        <div key={die.name}>
                            <input 
                                type="checkbox"
                                name="diets"
                                value={die.name}
                            ></input>
                            <label  name={die}>{die.name}</label>
                        </div>))}
                </div>
            </label>
            
            <label className="label1">
                Instructions:
                <input className="textarea" type="text" name="analyzedInstructions" value={title.analyzedInstructions} onChange={handleChange}/>
            </label>
            
             {error.hasOwnProperty("title")|| error.hasOwnProperty("summary")|| error.hasOwnProperty("healthScore")? <p className="error1">Enter all required inputs</p>:<button  type='submit'> Create Recipe</button> }
               
        </form>
        </div>
        </div>
    </div>
    
  )
}

export default RecipeCreate


