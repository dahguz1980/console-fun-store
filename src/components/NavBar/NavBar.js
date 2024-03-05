import React, {useState, useEffect} from "react";


import {
  Navbar,
  Collapse,
  IconButton
} from "@material-tailwind/react";

import CarWidget from "../CarWidget/CarWidget";
import { Link, NavLink } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebaseInit";

const NavBar = () => {
    
    const [openNav, setOpenNav] = useState(false);
    const [navItems, setNavItem] = useState([])
 
    useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );
    }, []);

    useEffect (() => {
            
        // Obtiene todas las categorias ordenadas por nombre
        const all_categories = collection(db, "categories");
        const q = query(all_categories, orderBy('title', 'asc'))

        getDocs(q)
        .then((collection) => {
            const navItems_retrieved = collection.docs.map((document)=> {
                return { id_document: document.id, ...document.data()}
            })
            setNavItem(navItems_retrieved);
        })
    },[])

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-gray-200">
            {
                // Itera sobre las categorias para mostrar el menú de opciones
                navItems.map((item) => (
                    <NavLink key={item.id} to={'category/'+item.id_document} className="p-1 font-normal flex items-center ring-deep-orange-500">{item.title}</NavLink>
                ))
            }
        </ul>
    ) 
  
    return (
        <div className="max-h-[768px] w-[100%]">
            <Navbar  className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 pt-5 lg:px-8 lg:py-5 bg-dark_blue bg-opacity-100 border-0">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <div className="flex items-center justify-evenly">
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 mr-2 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                            >
                            {openNav ? (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="#BAD4F5"
                                strokeWidth={2}
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                </svg>
                            ) : (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="#BAD4F5"
                                strokeWidth={2}
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                </svg>
                            )}
                        </IconButton>
                        <Link to="/">
                            <img src="/img/logo.png" alt="Console Fun"/>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">
                            {navList}
                        </div>
                        <div>
                            <CarWidget />
                        </div>
                     </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                </Collapse>
            </Navbar>
        </div>
  )
}

export default NavBar
