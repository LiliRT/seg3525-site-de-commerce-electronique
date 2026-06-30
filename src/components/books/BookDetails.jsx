import Button from "../common/Button";
import { useCart } from "../../context/CartContext";
import BookCover from "./BookCover";

export default function BookDetails({ book }) {

    const { addToCart } = useCart();

    return (
        <div className="book-details">

            <div className="book-details-cover">
                <BookCover
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                />
            </div>

            <div className="book-details-info">

                <h1>{book.title}</h1>

                <p className="author">{book.author}</p>

                <p className="description">{book.description}</p>

                <p className="price">
                    <strong>{book.price.toFixed(2)} $</strong>
                </p>

                <Button onClick={() => addToCart(book)}>
                    Ajouter au panier
                </Button>

            </div>

        </div>
    );
}