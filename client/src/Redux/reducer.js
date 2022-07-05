import { AZ } from "../Componentes/filterAz";
import { ALL, HeadDown } from "../Componentes/filterHead";
import { ALLTYPE } from "../Componentes/FilterType";
import { ALL_FOOD, FILTER_SORT, FILTER_TYPE, ID_ALL, SEARCH, SORT_HEAD, TYPE_DIET } from "./action";


const initialState ={
    Food: [],
    Foods: [],
    FoodDetails:[],
    TypeDiet: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){         
        case ALL_FOOD:
            return {
                ...state,
                Food: action.payload,
                Foods: action.payload
            }
        case SEARCH:
            return {
                ...state,
                Food: action.payload
            }
        case ID_ALL:
            return {
            ...state,
            FoodDetails: action.payload
            }
        case FILTER_SORT:
            let filterAz = [...state.Foods]
                filterAz = filterAz.sort((a,b)=>{
                    if(a.title > b.title){
                        return action.payload === AZ ? 1: -1
                    }
                    if(b.title > a.title){
                        return action.payload === AZ ? -1 : 1                    
                    }
                    return 0
                })
            return {
                ...state,
                Food: filterAz
            }
        case SORT_HEAD:
            let sortHead = [...state.Foods]
           let sortHead1 = action.payload === ALL ? sortHead : sortHead.sort((a,b)=>{
                if(a.healthScore > b.healthScore){
                    return action.payload === HeadDown ? 1: -1
                }
                if(b.healthScore > a.healthScore){
                    return action.payload === HeadDown ? -1 : 1                    
                }
                return 0
            })
            return{
                ...state,
                Food: sortHead1
            }
        case TYPE_DIET:
            return {
                ...state,
                TypeDiet:action.payload
            }
        case FILTER_TYPE:
            let FilterType = [...state.Foods]
            let AllType = action.payload === ALLTYPE ? FilterType :  FilterType.filter(e=>e.diets.find(i=>i.name === action.payload))
            
            return {
                ...state,
                Food: AllType
            }
        case "POST":
            return {
                ...state,
                
            }
        
        
        
        
        default:
        return state
}
};

export default rootReducer;