import React from 'react'
import { useDispatch } from "react-redux"
import {AllSort} from "../Redux/action"
import "./filterAz.css"

export const AZ = "AZ"
export const ZA= "ZA"

function FilterAz({setPagina}) {
    let dispatch = useDispatch()
    function handleChangeSort(e){
        dispatch(AllSort(e.target.value))
        setPagina(1)
    }
  return (
    <div className='select'>
         <select onChange={(e) => handleChangeSort(e)}>
            <option value={AZ}>A-Z</option>
            <option value={ZA}>Z-A</option>
        </select>
    </div>
  )
}

export default FilterAz