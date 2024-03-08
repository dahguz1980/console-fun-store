import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './components/CartProvider/CartProvider';
import CartContainer from './components/CartContainer/CartContainer';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <CartProvider>
        <BrowserRouter>
            <NavBar/>
          <Routes>
            <Route  path="/" element={<ItemListContainer  />} />
            <Route  path="/category/:category_id" element={<ItemListContainer  />} />
            <Route  path="/item/:id" element={<ItemDetailContainer  />} />
            <Route  path="/cart" element={<CartContainer  />} />
            <Route  path="/checkout" element={<Checkout  />} />
          </Routes>
        </BrowserRouter>
    </CartProvider>
  );
}

export default App;
