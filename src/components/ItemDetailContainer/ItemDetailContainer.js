import React, {useEffect, useState} from "react";
import {getProductMockAPI} from '../../mockAPI/mockAPI'
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.css"
import Loading from "../Loading/Loading";


const ItemDetailContainer = () => {

    const {id} = useParams()  
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState (true)

    useEffect(() => {
        setLoading(true);
        getProductMockAPI(id).then(res => { 
            setProduct(res)
        })
        .finally (()=> setLoading(false))
    }, [id]);


    if (loading) {
        return (
            <main className="flex flex-row justify-center">
                <Loading />
            </main>
        )
    } else {
        return (
            <main>
                <section key={product.id} className="flex flex-row flex-wrap justify-center mt-10">
                        <div className="w-520">
                            <img src={product.large_image} alt={product.sku} width="520" height="392" />
                        </div>
                        <div className="w-350 flex flex-col justify-center items-center">
                            <div className="text-gray-900 font-bold text-xl mb-2">{product.name}</div>
                            <p className="text-gray-700 text-base">{product.description}</p>
                        </div>
                </section>
            </main>
            
        )
    }
}

export default ItemDetailContainer
