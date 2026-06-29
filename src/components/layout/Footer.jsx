import { Link } from "react-router-dom";

export default function Footer() {

    return (

        <footer className="footer">

            <div className="container footer-grid">

                <div>

                    <h3>BookNest</h3>

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

                    <p>info@booknest.ca</p>

                    <p>+1 (555) 555-1234</p>

                </div>

            </div>

            <div className="copyright">

                © 2026 BookNest

            </div>

        </footer>

    );

}