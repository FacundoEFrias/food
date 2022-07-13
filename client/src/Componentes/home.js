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
    const indexOfUltimareceta = pagina * porPagina
    const indexOfPrimerareceta = indexOfUltimareceta - porPagina
    const currentRecetas = all_Food.slice(indexOfPrimerareceta,indexOfUltimareceta)
    const maximo = all_Food.length / porPagina

    const paginado = (numeroDePagina) => {
        setPagina(numeroDePagina)
    }

    useEffect(() => {
        dispatch(allFood());
        
    }, [dispatch])

     
    return (
        <div className="back">

            

            
            <div className="refresh1">
                <div className="buttonRefresh">
            <button   onClick={() => window.location.reload()}>Refresh</button>
            </div>
            
            
                <div className="Search-Bar">
                <Search/>
                </div>
                <Link style={{ textDecoration: "none", color: "yellow" }} to="/recipe">
                    <img className="imgCreate" src={image} alt="add" />
                </Link>
            </div>
           
               
            <div className="padre">
           
            
                <FilterAZ setPagina={setPagina}/>
            
            
           
                <FilterHead setPagina={setPagina}/>
           
            
           
                <FilterType setPagina={setPagina}/>
            
            </div>
            

            <div className="wrapper" >
                {all_Food.length > 0  ?
                    currentRecetas.map(e => {
                        return <Card 
                            key={e.id}
                            id={e.id}
                            title={e.title}
                            image={e.image}

                            diets={e.diets.map(e=>e.name).join(" , ")} 
                            healthScore={e.healthScore}/>



                    }): <img className="imgError" src="https://media2.giphy.com/media/L1ge3nIyrXt6/giphy.gif?cid=790b7611a5f8238350d73171d81e9cae7412cd7713d95402&rid=giphy.gif&ct=g" alt="Error"></img>
                }
            </div>
            <div className="click">
{
            <Paginacion
            
            porPagina={porPagina}
            all_Food={all_Food.length}
            pagina={pagina}
            paginado={paginado}
            setPagina={setPagina}
            maximo={maximo}
            />
            
            }
            </div>
        </div>

    )
}