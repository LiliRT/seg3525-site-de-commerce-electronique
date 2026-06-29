import Button from "../common/Button";
import { useCart } from "../../context/CartContext";

export default function BookDetails({ book }) {

    const { addToCart } = useCart();

    return (
        <div className="book-details">

            <img src={book.cover} alt={book.title} />

            <div>

                <h1>{book.title}</h1>

                <p>{book.author}</p>

                <p>{book.description}</p>

                <p><strong>{book.price.toFixed(2)} $</strong></p>

                <Button onClick={() => addToCart(book)}>
                    Ajouter au panier
                </Button>

            </div>

        </div>
    );
}