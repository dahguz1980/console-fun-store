import React, { useContext } from 'react'
import { CartContext } from '../CartProvider/CartProvider'
import { Card, Typography } from '@material-tailwind/react'

const CartContainer = () => {

 const {cartItems, totalPrice} = useContext(CartContext)

 const TABLE_HEAD = ["SKU", "NOMBRE", "PRECIO", "CANTIDAD", "TOTAL"];

 /**
  * FORMATEA LAS CANTIDADES 
  * */
 const currencyFormatter = ({ currency, value}) =>  {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }

  return (
    <div className='flex justify-center mt-4'>
        <Card className="h-full w-4/5 rounded-none">
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
                                {currencyFormatter({currency: "CLP", value: product.price})}
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
                                {currencyFormatter({currency: "CLP", value: qty*product.price})}
                            </Typography>
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
                        {currencyFormatter({currency: "CLP", value: totalPrice})}
                    </Typography>
                </td>
            </tr>
            </tbody>
        </table>
        </Card>
    </div>
  )
}

export default CartContainer