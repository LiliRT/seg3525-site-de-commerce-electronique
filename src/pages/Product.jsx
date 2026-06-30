import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import books from "../data/books";
import { useCart } from "../context/CartContext";
import Button from "../components/common/Button";
import BookGrid from "../components/books/BookGrid";
import BookCover from "../components/books/BookCover";

export default function Product() {

    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const book = books.find(b => b.id === Number(id));

    const goBack = () => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/catalogue");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!book) {
        return (
            <div className="container section">
                <h2>Livre introuvable</h2>
                <Link to="/catalogue">Retour au catalogue</Link>
            </div>
        );
    }

    const similarBooks = books
        .filter(b => b.genre === book.genre && b.id !== book.id)
        .slice(0, 4);

    return (
        <main className="container section">

            <button className="back-link" onClick={goBack}>
                <i className="bi bi-arrow-left"></i> Retour
            </button>

            <div className="product-layout">

                {/* HERO COVER 3D */}
                <div className="product-cover-hero">
                    <BookCover
                        title={book.title}
                        author={book.author}
                        genre={book.genre}
                    />
                </div>

                {/* INFOS */}
                <div className="product-info">

                    <h1>{book.title}</h1>
                    <p className="author">{book.author}</p>

                    <p className="description">{book.description}</p>

                    <p className="price">{book.price.toFixed(2)} $</p>

                    <p><strong>Stock :</strong> {book.stock}</p>
                    <p><strong>Langue :</strong> {book.language}</p>
                    <p><strong>Genre :</strong> {book.genre}</p>
                    <p><strong>Formats :</strong> {book.formats.join(", ")}</p>

                    <Button onClick={() => addToCart(book)}>
                        Ajouter au panier
                    </Button>
                </div>
            </div>

            {similarBooks.length > 0 && (
                <>
                    <h2>Livres similaires</h2>
                    <BookGrid books={similarBooks} />
                </>
            )}
        </main>
    );
}