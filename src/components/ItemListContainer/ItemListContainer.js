import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import NumberGroup from "../NumberGroup/NumberGroup";
import {collection, doc, getDocs, query, where} from "firebase/firestore"
import { db } from "../../firebaseInit";



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
                return { id: document.id, ...document.data()}
            })
            setProduct(products_retrieved);
        })
        .finally (() => setLoading(false))
        
    
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
                            
                            <Link to={"/item/"+item.id}
                                ><img src={item.thumbnail} alt={item.sku} width="260" height="196"/>
                            </Link>
                            <div className="px-6 py-4 text-center min-h-24 flex items-center">
                                <Link to={"/item/"+item.id}>
                                    <div className="font-bold text-xl mb-2">{item.name}</div>
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
