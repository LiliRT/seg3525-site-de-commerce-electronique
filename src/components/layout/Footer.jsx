import { Link } from "react-router-dom";

export default function Footer() {

    return (

        <footer className="footer">

            <div className="container footer-grid">

                <div>

                    <h3>Codex</h3>

                    <p>

                        Votre librairie en ligne pour découvrir
                        des ouvrages de tous les horizons.

                    </p>

                </div>

                <div>

                    <h3>Navigation</h3>

                    <ul>

                        <li>

                            <Link to="/">Accueil</Link>

                        </li>

                        <li>

                            <Link to="/catalogue">

                                Catalogue

                            </Link>

                        </li>

                        <li>

                            <Link to="/help">

                                Aide

                            </Link>

                        </li>

                    </ul>

                </div>

                <div>

                    <h3>Nous joindre</h3>

                    <p><a href="mailto:info@codex.ca">info@codex.ca</a></p>

                    <p><a href="tel:16131231234">+1 (613) 123-1234</a></p>

                </div>

            </div>

            <div className="copyright">

                © 2026 Codex

            </div>

        </footer>

    );

}