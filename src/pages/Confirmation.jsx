import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Confirmation() {

    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    useEffect(() => {window.scrollTo({ top: 0, behavior: "smooth" });}, []);

    return (

        <main className="container section">

            <div className="confirmation">

                <h1>Commande confirmée 🎉</h1>

                <p className="lead">Merci pour votre achat ! Votre commande est en cours de traitement.</p>

                <p><strong>Numéro de commande :</strong> #{orderNumber}</p>

                <p>Un courriel de confirmation vous a été envoyé.</p>

                <hr />

                <div className="confirmation-actions">
                    <Link className="btn btn-primary" to="/catalogue">Continuer mes achats</Link>

                    <Link className="btn btn-secondary" to="/survey">Donner votre avis</Link>
                </div>

                <div className="confirmation-note">
                    <p>Votre commande sera préparée dans les prochaines 24 à 48 heures.</p>

                    <p>Vous recevrez un numéro de suivi par courriel dès l’expédition.</p>
                </div>

            </div>

        </main>

    );

}