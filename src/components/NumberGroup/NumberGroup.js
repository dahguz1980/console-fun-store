import React, { useState } from 'react'
import "./NumberGroup.css"
import AddToCartButton from '../AddToCartButton/AddToCartButton';

const NumberGroup = ({item}) => {

    const [qty, setQty] = useState(1)

    const incrementQty = () => {
        // no puede superar el stock
        if (qty < item.stock) {
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
     * Controla los cambios que se hagan en el input de cantidad en caso de que se elimine el readonly
     * @param {*} event 
     */
    const inputPrevent = (event) => {
        event.preventDefault()
    };

    return (
        <>
            <div className='flex flex-col text-center'>
                <div className="flex flex-row items-center">
                    <button className="bg-light_blue text-dark_blue font-bold h-8 px-4 rounded-l" onClick={decrementQty}>-</button>
                    <input type="text" className="text-center border-t border-b border-gray-300 h-8 w-10" value={qty} onChange={(event)=>inputPrevent(event)} readOnly /> 
                    <button className="bg-light_blue text-dark-blue font-bold h-8 px-4 rounded-r" onClick={incrementQty}>+</button>
                </div>
                { item.stock >1 ? <p className='text-xs'>Max {item.stock} unidades</p> : <p className='text-xs text-red-900'>Solo queda 1 unidad</p> }
            </div>
            <AddToCartButton product={item} qty={qty} />
        </>
    )
}

export default NumberGroup
