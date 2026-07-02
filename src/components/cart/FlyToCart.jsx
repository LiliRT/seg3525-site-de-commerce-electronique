import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import FlyingBook from "./FlyingBook";

export default function FlyToCart() {
    const [flyingItems, setFlyingItems] = useState([]);

    useEffect(() => {
        const animate = (e) => {
            const { button, book } = e.detail || {};
            const cart = document.getElementById("cart-button");

            if (!button || !cart || !book) return;

            const start = button.getBoundingClientRect();
            const end = cart.getBoundingClientRect();

            const id = Date.now() + Math.random();

            const newItem = {
                id,
                book,
                start,
                end
            };

            setFlyingItems((prev) => [...prev, newItem]);

            // cleanup automatique
            setTimeout(() => {
                setFlyingItems((prev) =>
                    prev.filter((item) => item.id !== id)
                );
            }, 900);
        };

        window.addEventListener("cart:add", animate);

        return () => {
            window.removeEventListener("cart:add", animate);
        };
    }, []);

    return (
        <>
            {flyingItems.map((item) => (
                <FlyingBook key={item.id} item={item} />
            ))}
        </>
    );
}