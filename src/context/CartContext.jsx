import { createContext, useContext, useEffect, useState } from "react";

import { getDiscountedPrice } from "../utils/pricing";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    // Charger depuis localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("codex_cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Sauvegarder dans localStorage
    useEffect(() => {
        localStorage.setItem("codex_cart", JSON.stringify(cart));
    }, [cart]);

    // Ajouter un livre
    const addToCart = (book, button = null, quantity = 1) => {
        const pricing = getDiscountedPrice(book);

        setCart(prev => {

            const existing = prev.find(item => item.id === book.id);

            if (existing) {
                return prev.map(item =>
                    item.id === book.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...book,
                    price: pricing.finalPrice,
                    originalPrice: pricing.originalPrice,
                    hasDiscount: pricing.hasDiscount,
                    quantity
                }
            ];
        });

        window.dispatchEvent(
            new CustomEvent("cart:add", {
                detail: {
                    book,
                    button
                }
            })
        );
    };

    // Supprimer un livre
    const removeFromCart = (id) => {

        const item = cart.find(i => i.id === id);
        if (!item) return;

        setCart(prev => prev.filter(i => i.id !== id));

        window.dispatchEvent(
            new CustomEvent("cart:remove", {
                detail: { item }
            })
        );
    };

    // Modifier quantité
    const updateQuantity = (id, quantity) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    // Vider panier
    const clearCart = (showSnackbar = true) => {

        if (cart.length === 0) return;

        if (showSnackbar) {
            window.dispatchEvent(
                new CustomEvent("cart:clear", {
                    detail: { items: cart }
                })
            );
        }

        setCart([]);
    };

    // Total
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = subtotal >= 50 || subtotal === 0
        ? 0
        : 9.99;

    const taxes = (subtotal + shipping) * 0.13;

    const grandTotal = subtotal + taxes + shipping;

    // Nombre d’articles
    const cartCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        taxes,
        grandTotal,
        cartCount,
        setCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}