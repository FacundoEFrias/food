
import { useDispatch } from 'react-redux'
import { SortHead } from '../Redux/action'
import "./filterHead.css"

export const HeadLong = "HeadLong"
export const HeadDown = "HeadDown"
export const ALL = "ALL"


function FilterHead({setPagina}) {
    let dispatch = useDispatch()
    function onChangeHead(e){
        dispatch(SortHead(e.target.value))
        setPagina(1)
    }
  return (
    <div className="select" >
        <select onChange={(e)=>onChangeHead(e)}>
          <option value={ALL}>All</option>
            <option value={HeadLong}>High Health Score</option>
            <option value={HeadDown}>Low Health Score</option>
        </select>
    </div>
  )
}
export default FilterHead