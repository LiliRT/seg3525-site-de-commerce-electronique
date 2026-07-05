import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import SearchBar from "../components/layout/SearchBar";
import books from "../data/books";
import BookGrid from "../components/books/BookGrid";

export default function Home() {

    const navigate = useNavigate();
    const featuredIds = [1, 7, 16, 23];
    const featuredBooks = books.filter(book => featuredIds.includes(book.id));
    const [search, setSearch] = useState("");
    const submitSearch = () => { navigate(`/catalogue?search=${encodeURIComponent(search)}`); };
    
    useEffect(() => {window.scrollTo({ top: 0, behavior: "smooth" });}, []);

    return (
        <main>
            {/* HERO */}
            <section className="section">

                <div className="container home-hero">
                    <h1>Découvrez votre prochaine lecture</h1>

                    <p>Explorez des romans, essais et bandes dessinées soigneusement sélectionnés pour enrichir votre expérience de lecture.</p>

                    <SearchBar value={search} onChange={setSearch} onSubmit={submitSearch} showButton/>

                    <div className="home-actions">

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/catalogue", {
                                state: {
                                    scrollToTop: true
                                }
                            })}
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

                    <h2>Offre spéciale du moment</h2>

                    <p className="promo-text">📚 Cette semaine seulement : profitez de -20 % sur une sélection de romans classiques et philosophiques.</p>

                    <button
                        className="btn btn-secondary"
                        onClick={() =>
                            navigate(
                                "/catalogue?genre=Roman%20classique&genre=Philosophie", {
                                    state: {
                                        scrollToTop: true
                                    }
                                }
                            )
                        }
                    >
                        Magasiner les livres en promotion
                    </button>

                </div>

            </section>

            {/* NOUVEAUTÉS */}
            <section className="section">

                <div className="container">

                    <h2>Nouveautés</h2>

                    <p>Découvrez les derniers ajouts à notre collection.</p>

                    <BookGrid books={featuredBooks} />

                </div>

            </section>

        </main>
    );
}