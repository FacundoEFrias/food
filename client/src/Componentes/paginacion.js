import React from 'react'
import "./paginacion.css"

export const Paginacion = ({ pagina, setPagina, maximo }) => {

    function onPrevClick() {
        setPagina(pagina - 1)
    }
    function onNextClick() {
        setPagina(pagina + 1)
    }
    return (
        <div >
            <button className='button' disabled={pagina === 1 || pagina < 1} onClick={onPrevClick}>Prev</button>
            <button className='button' disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={onNextClick}>Next</button>
        </div>
    )
}
