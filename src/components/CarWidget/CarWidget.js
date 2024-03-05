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

  return (
    <>
      <Link to={'/cart'}>
          <Badge content={totalProducs} withBorder>
              <IconButton>
                  <ShoppingCartIcon className="h-4 w-4" />
              </IconButton>
          </Badge>
      </Link>
    </>
  )
}

export default CarWidget


