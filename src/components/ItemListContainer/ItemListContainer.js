import React, {useEffect, useState} from "react";
import {getProductsMockAPI} from '../../mockAPI/mockAPI'
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import NumberGroup from "../NumberGroup/NumberGroup";
import AddToCartButton from "../AddToCartButton/AddToCartButton";


const ItemListContainer = () => {

    const {category_id} = useParams()  
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState (true);

    useEffect(() => {
        setLoading(true);
        getProductsMockAPI(category_id).then(res => { 
            setProduct(res)
        })
        .finally (()=> setLoading(false))

    
    }, [category_id]);

    if (loading) {
        return (
            <main className="flex flex-row justify-center">
                <Loading />
            </main>
        )
    } else {
        return (
            <main className="flex justify-center">
                <section className="flex flex-row flex-wrap justify-center w-4/5">
                    {products.map((item) => (
                        <div key={item.id} className="w-80 overflow-hidden m-2 flex flex-col justify-center items-center border-light_blue border-2 h-96">
                            
                            <Link to={"/item/"+item.sku}
                                ><img src={item.thumbnail} alt={item.sku} width="260" height="196"/>
                            </Link>
                            <div className="px-6 py-4 text-center min-h-24 flex items-center">
                                <Link to={"/item/"+item.sku}>
                                    <div className="font-bold text-xl mb-2">{item.name}</div>
                                </Link>
                            </div>
                            <div className="flex flex-row justify-evenly w-full items-start">
                                <NumberGroup maxQty={item.stock} />
                                <AddToCartButton />
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            
        )
    }
}

export default ItemListContainer
