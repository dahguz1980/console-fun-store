import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.css"
import Loading from "../Loading/Loading";
import NumberGroup from "../NumberGroup/NumberGroup";
import {doc,  getDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";


const ItemDetailContainer = () => {

    const {id} = useParams()  
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState (true)

    useEffect(() => {
        setLoading(true);
        console.log(id)
        const sku_product = doc(db, "products", id);      

        getDoc(sku_product)
        .then((doc) => {
            if (doc.exists()) {
                setProduct({ id: doc.id, ...doc.data() })
                console.log(JSON.stringify(doc))
            }
        })
        .finally (() => setLoading(false))
        
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
                    <div className="w-350 flex flex-col items-center justify-around">
                        <div className="w-350 flex flex-col justify-center items-center">
                            <div className="text-gray-900 font-bold text-xl mb-2">{product.name}</div>
                            <p className="text-gray-700 text-base">{product.description}</p>
                        </div>
                        <div className="flex flex-row justify-evenly w-1/2 items-start mt-3">
                                <NumberGroup item={product} />
                        </div>
                    </div>
                </section>
            </main>
            
        )
    }
}

export default ItemDetailContainer
