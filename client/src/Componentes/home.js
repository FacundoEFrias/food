import React from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FilterAZ from "./filterAz.js";
import FilterType from "./FilterType.js";
import { Link } from "react-router-dom";
import "./home.css";
import image from "../images/bakery.png"


import { allFood } from "../Redux/action";
import Card from "./card";

import { Paginacion } from "./paginacion.js";
import Search from "./search";
import FilterHead from "./filterHead.js";


export default function Home() {
    let dispatch = useDispatch()
    let all_Food = useSelector((state) => state.Food)
    const [pagina, setPagina] = useState(1)
    const [porPagina, setPorPagina] = useState(9)
    const maximo = all_Food.length / porPagina

    useEffect(() => {
        dispatch(allFood());
    }, [dispatch])


    return (
        <div className="back">

            
            
            <br />
            
                <Link style={{ textDecoration: "none", color: "yellow" }} to="/recipe">
                    <img className="imgCreate" src={image} alt="add" />
                </Link>
            
           
                <div className="Search-Bar">
                <Search/>
                </div>
            <div className="padre">
           
            <div >
                <FilterAZ/>
            </div>
            
            <div >
                <FilterHead/>
           </div>
            
           <div >
                <FilterType/>
            </div>
            </div>
            <div className="click">
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
            </div>
            <br />
            <div className="wrapper" >
                {
                  all_Food   && all_Food.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map(e => {
                        return <Card 
                            key={e.id}
                            id={e.id}
                            title={e.title}
                            image={e.image}

                            diets={e.diets.map(e=>e.name).join(" , ")} 
                            healthScore={e.healthScore}/>



                    })
                }
            </div>
        </div>

    )
}