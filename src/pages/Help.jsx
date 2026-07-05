import { useEffect } from "react";

export default function Help() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <main className="container section help-page">

            <h1>Centre d’aide</h1>

            <p className="help-intro">
                Retrouvez ici les réponses aux questions les plus fréquentes.
            </p>

            <div className="help-accordion">

                <details open>
                    <summary>Acheter un livre</summary>

                    <div className="help-content">
                        <ol>
                            <li>Ajoutez un livre au panier.</li>
                            <li>Ouvrez votre panier.</li>
                            <li>Vérifiez votre sélection.</li>
                            <li>Cliquez sur <strong>Passer commande</strong>.</li>
                            <li>Remplissez le formulaire de livraison puis cliquez sur <strong>Suivant</strong>.</li>
                            <li>Remplissez le formulaire de paiement puis cliquez sur <strong>Suivant</strong>.</li>
                            <li>Vérifiez votre commande et utilisez <strong>Retour</strong> si nécessaire.</li>
                            <li>Cliquez sur <strong>Confirmer la commande</strong>.</li>
                            <li>Vous pouvez ensuite remplir le sondage d’appréciation.</li>
                        </ol>
                    </div>
                </details>

                <details>
                    <summary>Utiliser les filtres</summary>

                    <div className="help-content">
                        <p>
                            Dans le catalogue, utilisez les filtres pour affiner votre recherche.
                        </p>

                        <p className="help-tip">
                            Astuce : combinez plusieurs filtres pour des résultats plus précis.
                        </p>
                    </div>
                </details>

                <details>
                    <summary>Suivi de commande</summary>

                    <div className="help-content">
                        <p>
                            Dès que votre commande est traitée, vous recevez un courriel de confirmation avec votre numéro de commande.
                        </p>

                        <p>
                            Lors de l’expédition, un numéro de suivi vous sera envoyé. Les commandes sont généralement expédiées sous 24 à 48 heures.
                        </p>
                    </div>
                </details>

                <details>
                    <summary>Support</summary>

                    <div className="help-content">
                        <p>
                            Notre équipe est disponible tous les jours de 8 h à 17 h.
                        </p>

                        <a href="mailto:info@codex.ca" className="help-btn">
                            Contacter le support
                        </a>
                    </div>
                </details>

            </div>

        </main>
    );
}