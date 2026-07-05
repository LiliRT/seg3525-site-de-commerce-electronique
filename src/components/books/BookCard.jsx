import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import Button from "../common/Button";
import BookCover from "./BookCover";
import { getDiscountedPrice } from "../../utils/pricing";

export default function BookCard({ book }) {

    const { addToCart } = useCart();
    const navigate = useNavigate();
    const pricing = getDiscountedPrice(book);

    return (
        <article className="book-card">

            <Link
                to={`/livre/${book.id}`}
                className="book-card-link"
            >
                <BookCover
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                />

                <div className="book-info">

                    <h3>{book.title}</h3>

                    <p className="author">
                        {book.author}
                    </p>

                    <div className="price-block">
                        {pricing.hasDiscount && (
                            <span className="old-price">
                                {pricing.originalPrice.toFixed(2)} $
                            </span>
                        )}

                        <span className={pricing.hasDiscount ? "new-price" : "price"}>
                            {pricing.finalPrice.toFixed(2)} $
                        </span>
                    </div>

                </div>

            </Link>

            <div className="book-actions">

                <Button
                    variant="primary"
                    onClick={(e) => addToCart(book, e.currentTarget)}
                >
                    <i className="bi bi-cart-plus"/>Ajouter
                </Button>

                <Button
                    variant="secondary"
                    onClick={() => navigate(`/livre/${book.id}`)}
                >
                    <i className="bi bi-info-circle"/>Détails
                </Button>

            </div>

        </article>
    );
}