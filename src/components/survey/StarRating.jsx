import { useState } from "react";

export default function StarRating({ rating, setRating }) {

    const [hover, setHover] = useState(null);

    return (
        <div className="stars">

            {[1, 2, 3, 4, 5].map((star) => (

                <span
                    key={star}
                    className={star <= (hover || rating) ? "star active" : "star"}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                >
                    ★
                </span>

            ))}

        </div>
    );
}