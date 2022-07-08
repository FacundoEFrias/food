import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { useEffect } from "react"

import { useParams } from "react-router-dom"

import React from 'react'
import {AllID} from "../Redux/action"
import "./foodDetail.css"


function FoodDetails() {
    const {id}= useParams()
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(AllID(id))
    },[dispatch]) 

    let idFood = useSelector(state => state.FoodDetails) 
    

  return (
       <div className="backDetail">
        
          {
          <div className="contenedor">

            <Link to="/home">
            <button>Home</button>
          </Link>
          <div className="contenedor2">
            
            <img className="img" src={idFood.image ? idFood.image : "https://canalcocina.es/medias/_cache/zoom-7633d99ea9677004a4988e94e5d30aa0-920-518.jpg"} alt="Imagen" width="200px" height="250px" />
            
            <h2 className="title">{idFood.title}</h2>
            {idFood.type ? <h3 className="type">Type: {idFood.type.map(e=>e.name).join(", ")} </h3> : null} 

            <h3 className="diets"> Diets: {idFood.diets ? idFood.diets.map(e=>e.name).join(", ") : "Diets not found"}  </h3>
            <h3 className="health"> Health Score: {idFood.healthScore} </h3>
           
            
            <h4 className="summary">Summary:</h4>
            <h4 dangerouslySetInnerHTML={{__html: idFood.summary}}></h4> 
            
            {idFood.analyzedInstructions && idFood.analyzedInstructions.length ? <h4 className="summary">Step by Step:</h4> : null} 
  
            {idFood.analyzedInstructions ? <h4 > {Array.isArray(idFood.analyzedInstructions) ? idFood.analyzedInstructions.map(e => e.steps.map(f => f.step)) : idFood.analyzedInstructions }</h4>:null}
          </div>
  </div>
 
  }
  </div>
  )
}

export default FoodDetails