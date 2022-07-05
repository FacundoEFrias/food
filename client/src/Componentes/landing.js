import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";


export default function Landing() {
    return (

        <div className="back3" >
           
            <h1 className="titulo1">Find the best</h1>
            <h2 className="Recetas">Recipes</h2>
            <Link className="button3" to="/home">
                <button  >Open</button>
            </Link>
           

            
        </div >

    )
}