import { createContext, useContext, useEffect, useState, useRef } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);
    const cartRef = useRef();

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
    // const addToCart = (book, event) => {
    //     setCart((prev) => {

    //         const existing = prev.find(item => item.id === book.id);

    //         if (existing) {
    //             return prev.map(item =>
    //                 item.id === book.id
    //                     ? { ...item, quantity: item.quantity + 1 }
    //                     : item
    //             );
    //         }

    //         return [...prev, { ...book, quantity: 1 }];
    //     });

    //     window.dispatchEvent(
    //         new CustomEvent("cart:add", {
    //             detail: {
    //                 button: event.currentTarget
    //             }
    //         })
    //     );
    // };
const addToCart = (book, button = null) => {

    setCart(prev => {
        const existing = prev.find(item => item.id === book.id);

        if (existing) {
            return prev.map(item =>
                item.id === book.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }

        return [...prev, { ...book, quantity: 1 }];
    });

    window.dispatchEvent(
        new CustomEvent("cart:add", {
            detail: { book }
        })
    );

    if (button) {
        window.dispatchEvent(
            new CustomEvent("cart:fly", {
                detail: { button }
            })
        );
    }
};

const confirmAddToCart = (book, button) => {
    setCart(prev => {
        const existing = prev.find(item => item.id === book.id);

        if (existing) {
            return prev.map(item =>
                item.id === book.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }

        return [...prev, { ...book, quantity: 1 }];
    });

    window.dispatchEvent(
        new CustomEvent("cart:add", {
            detail: { button }
        })
    );

    setPendingAdd(null);
};

    // Supprimer un livre
    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
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
    const clearCart = () => {
        setCart([]);
    };

    // Total
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

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
        totalPrice,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}