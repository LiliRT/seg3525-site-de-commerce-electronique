import { useEffect } from "react";

export default function FlyToCart() {

    useEffect(() => {

        const animate = (e) => {

            const button = e.detail?.button;
            const cart = document.getElementById("cart-button");

            if (!button || !cart) {
                console.log("FlyToCart aborted", { button, cart });
                return;
            }

            const start = button.getBoundingClientRect();
            const end = cart.getBoundingClientRect();

            const icon = document.createElement("i");
            icon.className = "bi bi-book-fill flying-book";

            document.body.appendChild(icon);

            const startX = start.left + start.width / 2;
            const startY = start.top + window.scrollY;

            const endX = end.left + end.width / 2;
            const endY = end.top + window.scrollY;

            icon.style.left = `${startX}px`;
            icon.style.top = `${startY}px`;

            requestAnimationFrame(() => {
                icon.style.left = `${endX}px`;
                icon.style.top = `${endY}px`;

                icon.style.transform =
                    "translate(-50%,-50%) scale(.6) rotate(360deg)";

                icon.style.opacity = "0";
            });

            setTimeout(() => {
                icon.remove();

                cart.classList.add("cart-bump");
                setTimeout(() => cart.classList.remove("cart-bump"), 250);

            }, 1200);
        };

        window.addEventListener("cart:fly", animate);

        return () =>
            window.removeEventListener("cart:fly", animate);

    }, []);

    return null;

}