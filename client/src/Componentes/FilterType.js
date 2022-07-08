import React from 'react'
import { useDispatch } from "react-redux"
import { FilterDiet } from '../Redux/action'






export const ALLTYPE = "ALLTYPE"



function FilterType({setPagina}) {
  
    let dispatch = useDispatch()

    


    function handleOnChangeType(e){
        dispatch(FilterDiet(e.target.value))
        setPagina(1)
    }
    
  return (
    <div className='select'>
        <select  onChange={(e)=>handleOnChangeType(e)}>
    <option value={ALLTYPE}>All</option>
    <option value="gluten free">Gluten Free</option>
    <option value="ketogenic">Ketogenic</option>
    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
    <option value="paleolithic">Paleolithic</option>
    <option value="pescatarian">Pescatarian</option>
    <option value="primal">Primal</option>
    <option value="vegan">Vegan</option>
    <option value="whole 30">Whole 30</option>
</select>
</div>
  )
}

export default FilterType