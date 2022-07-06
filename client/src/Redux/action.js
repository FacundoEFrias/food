
import axios from "axios";

export const ALL_FOOD = "ALL_FOOD"
export const SEARCH = "SEARCH"
export const ID_ALL = "ID_ALL"
export const FILTER_SORT = "FILTER_SORT"
export const SORT_HEAD = "SORT_HEAD"
export const TYPE_DIET = "TYPE_DIET"
export const FILTER_TYPE = "FILTER_TYPE"


export function allFood(){
    return function(dispatch){
        axios.get("api/recipes/")
        .then((resp)=>{
            dispatch({
                type: ALL_FOOD,
                payload: resp.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

export function AllSearch(name){
    return function(dispatch){
        axios.get(`api/recipes?name=${name}`)
        .then((res)=>{
            dispatch({
                type: SEARCH,
                payload: res.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
        
    }
}
export  function AllID(id){
    return function(dispatch){
        axios.get(`api/recipes/${id}`)
        .then((res)=>{
            dispatch({
                type: ID_ALL,
                payload: res.data
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}
export  function AllSort(order){
    return {
    type: FILTER_SORT,
    payload: order,
}}
export function SortHead(order){
    return {
        type: SORT_HEAD,
        payload:order
    }
}
export function TypeDiet(){
    return function(dispatch){
        axios.get("api/types")
        .then((res)=>{
           dispatch(
            {type: TYPE_DIET,
            payload: res.data}) 
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
}
export function FilterDiet(order){
    return {
        type: FILTER_TYPE,
        payload: order
    }
}
export function PostRecipe(data){
     return async function(dispatch){
        const respon = axios.post("api/create/", data)
        return respon
        .catch((error)=>{
            console.log(error)
        })
     }
}
