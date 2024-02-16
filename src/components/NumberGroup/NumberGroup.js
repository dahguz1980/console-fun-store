import React, { useState } from 'react'
import "./NumberGroup.css"

const NumberGroup = ({maxQty}) => {

    const [qty, setQty] = useState(1)

    const incrementQty = () => {
        // no puede superar el stock
        if (qty < maxQty) {
            setQty(qty + 1); 
        }
        
    };

    const decrementQty = () => {
        // El mínimo siempre será 1
        if (qty>1) {
            setQty(qty -1); 
        }
    };

    /**
     * Controla los cambios que se hagan en el input de cantidad
     * @param {*} event 
     */
    const inputChangedHandler = (event) => {
   
        // Si tiene un valor numerico
        if (!isNaN(event.target.value)) {
            const val = parseInt(event.target.value);
        
            //  menor o igual a cero setea 1
            if (val<=0) {
                setQty(1)
            } else if (val>maxQty) { // si es mayor al max permitido, setear al máximo
                setQty(maxQty)
            } else { // sino setear el valor ingresado
                setQty(val);
            } 
        } else {
            setQty(1) //si no es numero setear a 1
        }
        

    };


    return (
        <div className='flex flex-col text-center'>
            <div className="flex flex-row items-center">
                <button className="bg-light_blue text-dark_blue font-bold h-8 px-4 rounded-l" onClick={decrementQty}>-</button>
                <input type="text" className="text-center border-t border-b border-gray-300 h-8 w-10" value={qty} onChange={(event)=>inputChangedHandler(event)} />
                <button className="bg-light_blue text-dark-blue font-bold h-8 px-4 rounded-r" onClick={incrementQty}>+</button>
            </div>
            <p className='text-xs'>Max Stock: {maxQty} </p>
        </div>
    )
}

export default NumberGroup
