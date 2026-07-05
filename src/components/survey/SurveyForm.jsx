import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import StarRating from "./StarRating";
import Logo from "../../assets/Logo";

export default function SurveyForm() {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [ratingError, setRatingError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating === 0) {
            setRatingError("Veuillez choisir une note (1 à 5 étoiles) avant d'envoyer votre réponse.");
            return;
        }

        setRatingError("");

        setSubmitted(true);

        console.log({ rating, comment });
    };

    if (submitted) {

        return (

            <div className="survey-thanks">
                <h2>Merci pour votre retour ! 🎉</h2>

                <p>
                    Votre évaluation a bien été enregistrée. Vos commentaires nous aident à améliorer votre expérience chez Codex.
                </p>

                <Link className="btn btn-primary" to="/catalogue">
                    Continuer mes achats
                </Link>
            </div>

        );

    }

    return (

        <form className="survey-form" onSubmit={handleSubmit}>

            <h2>Comment s’est passée votre expérience ?</h2>

            <p className="survey-subtext">Ce sondage est optionnel et prend moins d’une minute à remplir.</p>

            <StarRating
                rating={rating}
                setRating={(value) => {
                    setRating(value);
                    setRatingError("");
                }}
            />
            {ratingError && (
                <div className="form-error">
                    {ratingError}
                </div>
            )}

            <textarea
                placeholder="Laissez un commentaire sur votre expérience"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <div className="survey-actions">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/catalogue", {
                            state: { scrollToTop: true }
                        })
                    }
                >
                    Plus tard
                </button>
                
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </div>

        </form>

    );

}