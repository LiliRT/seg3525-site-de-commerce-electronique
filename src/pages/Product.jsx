import { useParams, Link } from "react-router-dom";
import books from "../data/books";
import { useCart } from "../context/CartContext";

import Button from "../components/common/Button";
import BookGrid from "../components/books/BookGrid";

export default function Product() {

    const { id } = useParams();

    const { addToCart } = useCart();

    const book = books.find(b => b.id === Number(id));

    if (!book) {
        return (
            <div className="container section">
                <h2>Livre introuvable</h2>
                <Link to="/catalogue">Retour au catalogue</Link>
            </div>
        );
    }

    // livres similaires (même genre)
    const similarBooks = books
        .filter(b =>
            b.genre === book.genre && b.id !== book.id
        )
        .slice(0, 4);

    return (
        <main className="container section">

            {/* BREADCRUMB */}
            <Link to="/catalogue">← Retour au catalogue</Link>

            <div className="product-layout">

                {/* IMAGE */}
                <div className="product-image">
                    <img src={book.cover} alt={book.title} />
                </div>

                {/* INFOS */}
                <div className="product-info">

                    <h1>{book.title}</h1>

                    <p className="author">{book.author}</p>

                    <p className="description">
                        {book.description}
                    </p>

                    <p className="price">
                        {book.price.toFixed(2)} $
                    </p>

                    <p>
                        <strong>Stock :</strong> {book.stock}
                    </p>

                    <p>
                        <strong>Langue :</strong> {book.language}
                    </p>

                    <p>
                        <strong>Genre :</strong> {book.genre}
                    </p>

                    <p>
                        <strong>Formats :</strong>{" "}
                        {book.formats.join(", ")}
                    </p>

                    <Button onClick={() => addToCart(book)}>
                        Ajouter au panier
                    </Button>

                </div>

            </div>

            {/* SIMILAIRES */}
            {similarBooks.length > 0 && (
                <>
                    <h2>Livres similaires</h2>
                    <BookGrid books={similarBooks} />
                </>
            )}

        </main>
    );
}