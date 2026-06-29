import { useState } from "react";
import StarRating from "./StarRating";

export default function SurveyForm() {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        // simulation en console (pas de backend)
        console.log({
            rating,
            comment
        });
    };

    if (submitted) {
        return (
            <div className="survey-thanks">

                <h2>Merci pour votre retour 🎉</h2>

                <p>Votre avis nous aide à améliorer BookNest.</p>

            </div>
        );
    }

    return (
        <form className="survey-form" onSubmit={handleSubmit}>

            <h2>Comment s’est passée votre expérience ?</h2>

            <p>
                Votre avis nous aide à améliorer la lecture et la navigation.
            </p>

            <StarRating rating={rating} setRating={setRating} />

            <textarea
                placeholder="Laissez un commentaire..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <button type="submit" className="btn primary">
                Envoyer
            </button>

        </form>
    );
}