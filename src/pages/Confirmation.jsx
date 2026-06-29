import { Link } from "react-router-dom";

export default function Confirmation() {

    return (
        <main className="container section">

            <h1>Commande confirmée 🎉</h1>

            <p>
                Merci pour votre achat ! Votre commande est en cours de traitement.
            </p>

            <Link to="/catalogue">
                Retour au catalogue
            </Link>

            <Link to="/survey">
                Donner votre avis
            </Link>

        </main>
    );
}