import React from "react"
import { Link } from "react-router-dom";
import "./card.css"





export default function Card({ id, title, image, diets, healthScore }) {



    return (
        <div className="card">

            <div className="container">
                <Link className="Link" to={`${id}`}>
                    <img className="imgCard" src={image} alt="Imagen" />
                
                    <h2 >{title}</h2>
                    
                    {diets ? <h3 className="h3">Diets: {diets}</h3> : null}
                    <h3 className="Head">healthScore: {healthScore}</h3>

                </Link>

            </div>



        </div >
    );
};
