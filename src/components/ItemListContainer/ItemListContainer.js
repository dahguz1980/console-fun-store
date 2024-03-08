import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import NumberGroup from "../NumberGroup/NumberGroup";
import {collection, doc, getDocs, query, where} from "firebase/firestore"
import { db } from "../../firebaseInit";
import CurrencyConverter from "../CurrencyConverter/CurrencyConverter";

const ItemListContainer = () => {

    const {category_id} = useParams()  
    const [products, setProduct] = useState([])
    const [loading, setLoading] = useState (true);

    useEffect(() => {
        setLoading(true);
            
        let all_products = collection(db, "products");

        if (category_id !== undefined) {
            const categoryRef = doc(db, "categories", category_id);
            all_products = query(all_products, where("category","==",categoryRef))
        }
            
        getDocs(all_products)
        .then((collection) => {
            const products_retrieved = collection.docs.map((document)=> {
                const data = document.data()
                return { 
                         id: document.id,  
                         description: data.description, 
                         large_image: data.large_image, 
                         name: data.name, 
                         price: data.price, 
                         sku: data.sku,
                         stock: data.stock,
                         thumbnail: data.thumbnail 
                        }

            })            
            setProduct(products_retrieved);
        })
        .finally (() => {
            setLoading(false)})
    
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
                        <div key={item.id} className="w-80 overflow-hidden m-2 flex flex-col justify-center items-center  h-410px">
                            
                            <Link to={"/item/"+item.id}
                                ><img src={item.thumbnail} alt={item.sku} width="260" height="196"/>
                            </Link>
                            <div className="text-center flex justify-center">
                                <Link to={"/item/"+item.id}>
                                    <div className="mt-4 h-24 font-bold text-xl mb-2">
                                        {item.name}
                                        <div className="font-bold text-xl"><CurrencyConverter currency='CLP' value={item.price} /></div>        
                                    </div>
                                </Link>
                                
                            </div>
                            <div className="flex flex-row justify-evenly w-full items-start">
                                <NumberGroup item={item}   />
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            
        )
    }
}

export default ItemListContainer
