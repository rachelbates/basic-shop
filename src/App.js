import React, { useState, useEffect} from 'react'

import { Products, Navbar } from './components';
import { commerce } from './lib/commerce';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data)
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);


    return (
        <div>
        <Navbar />
        <Products products={products} onAddToCart={handleAddToCart} />
        </div>
    );
}

export default App;
