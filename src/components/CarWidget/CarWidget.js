import React, { useContext} from 'react'
import {
    Badge,
    IconButton
} from "@material-tailwind/react";

import { ShoppingCartIcon} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import { CartContext } from '../CartProvider/CartProvider';

const CarWidget = () => {

  const {totalProducs} = useContext(CartContext);
  const shoppingCartImage = <IconButton><ShoppingCartIcon className="h-4 w-4" /></IconButton>

  return (
    <>
      <Link to={'/cart'}>
        { totalProducs >0 ? 
          <Badge content={totalProducs} withBorder>
              {shoppingCartImage}
          </Badge>
        : shoppingCartImage }
      </Link>
    </>
  )
}

export default CarWidget


