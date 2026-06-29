// import { useNavigate } from "react-router-dom";
// import SearchBar from "../components/layout/SearchBar";

// export default function Home() {

//     const navigate = useNavigate();

//     return (
//         <main>

//             <section className="section">

//                 <div className="container home-hero">

//                     <h1>
//                         Découvrez votre prochaine lecture
//                     </h1>

//                     <p>
//                         Explorez romans, essais, bandes dessinées et ouvrages spécialisés grâce à une recherche simple et intuitive.
//                     </p>

//                     <SearchBar />

//                     <div className="home-actions">

//                         <button
//                             className="btn btn-primary"
//                             onClick={() => navigate("/catalogue")}
//                         >
//                             <i className="bi bi-grid"></i>{" "}
//                             Explorer le catalogue
//                         </button>

//                     </div>

//                 </div>

//             </section>

//         </main>
//     );
// }

import { useNavigate } from "react-router-dom";
import SearchBar from "../components/layout/SearchBar";
import books from "../data/books";
import BookGrid from "../components/books/BookGrid";

export default function Home() {

    const navigate = useNavigate();

    const featuredBooks = books.slice(0, 4);

    return (
        <main>

            {/* HERO */}
            <section className="section">

                <div className="container home-hero">

                    <h1>
                        Découvrez votre prochaine lecture
                    </h1>

                    <p>
                        Explorez des romans, essais et bandes dessinées soigneusement sélectionnés pour enrichir votre expérience de lecture.
                    </p>

                    <SearchBar />

                    <div className="home-actions">

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/catalogue")}
                        >
                            <i className="bi bi-grid"></i>{" "}
                            Explorer le catalogue
                        </button>

                    </div>

                </div>

            </section>

            {/* PROMOTION */}
            <section className="section promo-section">

                <div className="container promo-box">

                    <h2>
                        Offre spéciale du moment
                    </h2>

                    <p className="promo-text">
                        📚 Cette semaine seulement : profitez de -20% sur une sélection de romans classiques et philosophiques.
                    </p>

                    <button
                        className="btn btn-secondary"
                        onClick={() =>
                            navigate("/catalogue", {
                                state: {
                                    genre: ["Roman classique", "Philosophie"]
                                }
                            })
                        }
                    >
                        Voir les offres
                    </button>

                </div>

            </section>

            {/* NOUVEAUTÉS */}
            <section className="section">

                <div className="container">

                    <h2>
                        Nouveautés
                    </h2>

                    <p>
                        Découvrez les derniers ajouts à notre collection.
                    </p>

                    <BookGrid books={featuredBooks} />

                </div>

            </section>

        </main>
    );
}