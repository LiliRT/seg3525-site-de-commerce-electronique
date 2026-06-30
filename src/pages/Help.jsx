export default function Help() {

    return (
        <main className="container section help-page">

            <h1>Centre d’aide</h1>

            <p className="help-intro">
                Retrouvez ici les réponses aux questions les plus fréquentes.
            </p>

            <div className="help-grid">

                <section className="help-card">

                    <h2>
                        <i className="bi bi-cart-check me-2"></i>
                        {" "}Acheter un livre
                    </h2>

                    <ol>
                        <li>Ajoutez un livre au panier</li>
                        <li>Ouvrez votre panier</li>
                        <li>Vérifiez votre sélection</li>
                        <li>Procédez au paiement</li>
                        <li>Confirmez votre commande</li>
                    </ol>

                </section>

                <section className="help-card">

                    <h2>
                        <i className="bi bi-funnel me-2"></i>
                        {" "}Utiliser les filtres
                    </h2>

                    <p>
                        Dans le catalogue, utilisez les filtres pour affiner votre recherche.
                    </p>

                    <p className="help-tip">
                        Astuce : combine plusieurs filtres pour affiner les résultats.
                    </p>

                </section>

                <section className="help-card">

                    <h2>
                        <i className="bi bi-box-seam me-2"></i>
                        {" "}Suivi de commande
                    </h2>

                    <p>
                        Consultez vos commandes depuis votre espace utilisateur.
                    </p>

                </section>

                <section className="help-card">

                    <h2>
                        <i className="bi bi-headset me-2"></i>
                        {" "}Support
                    </h2>

                    <p>
                        Ce projet est fictif, mais vous pouvez simuler un contact support.
                    </p>

                    <a href="mailto:info@codex.ca" className="btn btn-secondary">
                        Contacter le support
                    </a>

                </section>

            </div>

        </main>
    );
}