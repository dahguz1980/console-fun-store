import React, { useContext, useEffect, useState } from "react";

import {
  Input,
  Button,
  Typography
} from "@material-tailwind/react";

import {
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { CartContext } from "../CartProvider/CartProvider";
import Loading from "../Loading/Loading";
 
 
const Checkout = () => {
  const {cartItems, clearCart} = useContext(CartContext)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [repeatEmail, setRepeatEmail] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [orderNo, setOrderNo] = useState(0)
  const [loading, setLoading] = useState(false)
  const [activateButton, setActivateButton] = useState (false)

  const [showErrorEmail, setShowErrorEmail] = useState (false)

  useEffect (() => {
      if (email !== repeatEmail) {
        setShowErrorEmail(true)
        setActivateButton(false)
      } else {
        setShowErrorEmail(false)
        
        if (fullName && email) {
          setActivateButton(true)
        } else {
          setActivateButton(false)
        }
  
      }

  }, [email, repeatEmail, fullName])

  const handleSubmit = (e) => {
    // evitar el comportamiento normal del manejador
    e.preventDefault();

    // asegurar que todos los campos tengan datos
    // No se almacena los datos de las tc 
    if (!showErrorEmail && fullName && email) {
      setLoading(true);

      const datos = {"comprador":fullName, "Correo Electronico": email, "Forma de Pago": "Tarjeta de Credito", "items": JSON.stringify(cartItems)}
      
      const orderRef = collection(db, "orders");

      addDoc(orderRef,datos)
        .then(response => {
          setOrderNo(response.id)
          clearCart()
          setShowSuccess(true)

        })
        .catch(error => {
          setShowError(true)
        })
        .finally ( () => {
          setLoading(false);
        })
    }

  };

  if (loading) {
    return (
        <main className="flex flex-row justify-center">
            <Loading />
        </main>
    )
} 
  return (
    <div className=" flex justify-center">
      <div className="max-w-[24rem]">      
        { !showError && !showSuccess && 
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
          <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Nombres y Apellidos
              </Typography>
              <Input
                type="text"
                placeholder="Jhon Doe"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Correo Electrónico
              </Typography>
              <Input
                type="email"
                placeholder="name@mail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Repetir Correo Electrónico
              </Typography>
              <Input
                type="email"
                placeholder="name@mail.com"
                value={repeatEmail}
                onChange={(event) => setRepeatEmail(event.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {showErrorEmail && <Typography
                variant="small"
                color="red"
                className="mb-2 font-medium"
              >
                Los correos no coinciden
              </Typography>
              }          
            </div>
            { activateButton ?
            <Button type="submit" size="lg">Pagar Ahora</Button>
            : <Button type="submit" size="lg" disabled>Pagar Ahora</Button>}

            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
            >
              <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Los pagos son seguros y encriptados
            </Typography>    
          </form>
        }
        { showSuccess && 
            <div className='flex flex-col items-center w-4/5'> 
            <img className="object-cover object-center" 
                src="/img/order-processed-complete.jpeg" 
                alt="Empty Cart" width="300" height="300" />
            <Typography variant="h4" className='text-dark_blue'>¡Gracias por su Compra!</Typography>
            <Typography variant="small" className='text-dark_blue text-center'>
                La orden {orderNo} fue procesada correctamente
            </Typography>
        </div>
        }
        { showError && 
            <div className='flex flex-col items-center w-4/5'> 
            <img className="object-cover object-center" 
                src="/img/order-processed-complete.jpeg" 
                alt="Empty Cart" width="300" height="300" />
            <Typography variant="h4" className='text-dark_blue'>¡Error al Procesar la Compra!</Typography>
            <Typography variant="small" className='text-dark_blue text-center'>
                Tuvimos inconvenientes para procesar su orden por favor intentelo de nuevo. Gracias
            </Typography>
        </div>
        }
        </div>
      </div>
  );
}

export default Checkout