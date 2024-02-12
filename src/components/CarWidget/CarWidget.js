import React from 'react'
import {
    Badge,
    IconButton
} from "@material-tailwind/react";

import { ShoppingCartIcon} from "@heroicons/react/24/solid";

const CarWidget = () => {
  return (
    <>
        <Badge content="5" withBorder>
            <IconButton>
                <ShoppingCartIcon className="h-4 w-4" />
            </IconButton>
        </Badge>
    </>
  )
}

export default CarWidget


