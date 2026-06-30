import { Link } from "react-router-dom";
import Button from "../common/Button";

import { useCart } from "../../context/CartContext";
import BookCover from "../books/BookCover";

export default function BookCard({ book }) {

    const { addToCart } = useCart();

    return (
        <div className="book-card">

            <Link to={`/livre/${book.id}`}>
                <BookCover
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                />
            
                <div className="book-info">

                    <h3>{book.title}</h3>
                    <p className="author">{book.author}</p>
                    <p className="price">{book.price.toFixed(2)} $</p>

                    <div className="book-actions">

                        <Button
                            onClick={(e) => addToCart(book, e.currentTarget)}
                            variant="primary"
                        >
                            Ajouter au panier
                        </Button>

                        <Link
                            to={`/livre/${book.id}`}
                            className="btn btn-secondary"
                        >
                            Voir les détails
                        </Link>

                    </div>

                </div>
            </Link>

        </div>
    );
}