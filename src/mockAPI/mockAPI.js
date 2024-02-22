
import productsJSON from '../data/products.json'

export function getProductsMockAPI (category_id) {
    return new Promise (( resolve, reject ) => {
        setTimeout(() => {
            if (category_id === undefined) {
                resolve(productsJSON)
            } else {
                const productsFiltered = productsJSON.filter((product)=> product.category === category_id)
                resolve(productsFiltered)
            }
        }, 2000);

    })
}

export function getProductMockAPI (id) {
    return new Promise (( resolve, reject ) => {
        setTimeout(() => {
            if (id === undefined) {
                reject("Id not valid")
            } else {
                const productsFiltered = productsJSON.find((product)=> product.sku === id)
                if (productsFiltered===undefined) {
                    reject ("Product Not Found")
                } else {
                    resolve(productsFiltered)
                }
            }
        }, 2000);

    })
}