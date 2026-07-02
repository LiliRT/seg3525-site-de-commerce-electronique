import { useEffect, useRef, useState } from "react";
import BookCover from "../books/BookCover";

export default function FlyingBook({ item }) {
    const ref = useRef(null);
    const [style, setStyle] = useState({
        left: item.start.left + item.start.width / 2,
        top: item.start.top + item.start.height / 2,
        opacity: 1,
        transform: "translate(-50%, -50%) scale(1)",
    });

    useEffect(() => {
        const { start, end } = item;

        const startX = start.left + start.width / 2;
        const startY = start.top + start.height / 2;

        const endX = end.left + end.width / 2;
        const endY = end.top + end.height / 2;

        // petit delay pour déclencher l’animation CSS
        requestAnimationFrame(() => {
            setStyle({
                left: endX,
                top: endY,
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.4)",
            });
        });
    }, [item]);

    return (
        <div
            ref={ref}
            className="flying-book"
            style={{
                position: "fixed",
                left: style.left,
                top: style.top,
                opacity: style.opacity,
                transform: style.transform,
                transition: "all 0.8s ease-in-out",
                zIndex: 9999,
                pointerEvents: "none",
                width: "120px",
                height: "160px",
            }}
        >
            <BookCover
                title={item.book.title}
                author={item.book.author}
                genre={item.book.genre}
                minimal={true}
            />
        </div>
    );
}