import React, { useContext} from 'react'
import { CartContext } from '../CartProvider/CartProvider'
import { Card,  IconButton,  Tooltip,  Typography } from '@material-tailwind/react'
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter'
import {  TrashIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'

const CartContainer = () => {

 const {cartItems, totalPrice, removeToCart} = useContext(CartContext)

 const TABLE_HEAD = ["SKU", "NOMBRE", "PRECIO UNITARIO", "CANTIDAD", "TOTAL", ""]


return (
    <div className='flex flex-col items-center mt-4'>
        <div className='flex justify-start w-4/5'>
            <Typography variant="h3" className='text-medium_blue'>
                CARRITO DE COMPRAS
            </Typography>
        </div>
        
        
        { cartItems.length > 0 ?
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <Card className="h-full w-4/5 rounded-none mt-10">
            <table className="w-full min-w-max table-auto text-center">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                    <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {cartItems.map(({ product, qty }, index)  => {
                    return (
                        <tr key={product.id}>
                            
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {product.sku}
                                </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {product.name}
                                </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                     <CurrencyConverter currency='CLP' value={product.price} />
                                </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {qty}
                                </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    <CurrencyConverter currency='CLP' value={qty*product.price} />
                                </Typography>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Tooltip content="Eliminar Producto ">
                                    <IconButton className='bg-white' onClick={ () => removeToCart(product)}>
                                        <TrashIcon className="h-4 w-4 text-gray-500" />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan="4" className='p-4'>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70 text-right"
                    >
                        TOTAL A PAGAR
                    </Typography>
                    </td>
                    <td className='p-4'>
                        <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold"
                                >
                            <CurrencyConverter currency='CLP' value={totalPrice} />
                        </Typography>
                    </td>
                </tr>
                </tbody>
            </table>
            </Card>
            <NavLink to="/checkout">
                <button className="bg-dark_blue text-light_blue w-40 rounded-sm h-8 mt-10">Procesar Compra</button>
            </NavLink>
        </div>        
        : 
        <div className='flex flex-col items-center w-4/5'> 
            <img className="object-cover object-center" 
                src="/img/empty-cart.png" 
                alt="Empty Cart" />
            <Typography variant="h4" className='text-dark_blue'>¡Tu Carrito esta vacío!</Typography>
            <Typography variant="small" className='text-dark_blue'>
                ¿Aún no te has decidido? Tenemos muchos productos que de seguro te encantarán. 
                Revisa el menú de arriba y compruébalo
            </Typography>
        </div>
        }
    </div>
  )
}

export default CartContainer