import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CartSnackbar() {

    const [snacks, setSnacks] = useState([]);
    const { setCart } = useCart();
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    useEffect(() => {

        const addSnack = (type, payload) => {

            const id = crypto.randomUUID();

            const snack = {
                id,
                type,
                data: payload
            };

            setSnacks(prev => [...prev, snack]);

            setTimeout(() => {
                setSnacks(prev => prev.filter(s => s.id !== id));
            }, 5000);
        };

        const onAdd = (e) => addSnack("add", e.detail.book);
        const onRemove = (e) => addSnack("remove", e.detail.item);
        const onClear = (e) => addSnack("clear", e.detail.items);

        window.addEventListener("cart:add", onAdd);
        window.addEventListener("cart:remove", onRemove);
        window.addEventListener("cart:clear", onClear);

        return () => {
            window.removeEventListener("cart:add", onAdd);
            window.removeEventListener("cart:remove", onRemove);
            window.removeEventListener("cart:clear", onClear);
        };

    }, []);

useEffect(() => {

    const handler = (e) => {

        const isMac = navigator.userAgent.includes("Mac");

        const shortcutPressed =
            (isMac && e.metaKey && e.key.toLowerCase() === "z") ||
            (!isMac && e.ctrlKey && e.key.toLowerCase() === "z");

        if (!shortcutPressed) return;

        if (snacks.length === 0) return;

        e.preventDefault();

        const lastSnack = snacks[snacks.length - 1];

        undo(lastSnack);
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);

}, [snacks]);

    const closeSnack = (id) => {
        setSnacks(prev => prev.filter(s => s.id !== id));
    };

    const undo = (snack) => {

        switch (snack.type) {

            case "add":
                setCart(prev => prev.filter(i => i.id !== snack.data.id));
                break;

            case "remove":
                setCart(prev => [...prev, snack.data]);
                break;

            case "clear":
                setCart(snack.data);
                break;
        }

        closeSnack(snack.id);
    };

    const renderText = (snack) => {

        switch (snack.type) {

            case "add":
                return `📚 ${snack.data.title} ajouté au panier`;

            case "remove":
                return `🗑️ ${snack.data.title} retiré du panier`;

            case "clear":
                return `🧹 Panier vidé`;

            default:
                return "";
        }
    };

    const tag = document.activeElement?.tagName;

    if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        document.activeElement?.isContentEditable
    ) {
        return;
    }

    return (
        <div className="snackbar-stack">

            {snacks.map(snack => (
                <div key={snack.id} className="cart-snackbar">

                    <div>{renderText(snack)}</div>

                    <div className="cart-snackbar-actions">

                        <button onClick={() => undo(snack)}>
                            Annuler{" "}
                            {!isMobile && (
                                <span className="shortcut">
                                    (Cmd/Ctrl + Z)
                                </span>
                            )}
                        </button>

                        <button onClick={() => closeSnack(snack.id)}>
                            <i className="bi bi-x"></i>
                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
}