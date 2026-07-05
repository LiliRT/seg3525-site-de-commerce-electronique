import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import BookGrid from "../components/books/BookGrid";
import books from "../data/books";

import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {

    const { cart } = useCart();

    useEffect(() => {window.scrollTo(0, 0);}, []);

    const featuredIds = [1, 3, 16, 20];

    const featuredBooks = books.filter(book =>
        featuredIds.includes(book.id)
    );

    const getRecommendations = () => {

        const authors = [...new Set(cart.map(item => item.author))];
        const genres = [...new Set(cart.map(item => item.genre))];

        const recommended = books.filter(book => {

            const inCart = cart.some(item => item.id === book.id);
            if (inCart) return false;

            const sameAuthor = authors.includes(book.author);
            const sameGenre = genres.includes(book.genre);

            return sameAuthor || sameGenre;
        });

        return recommended.slice(0, 6);
    };

    const recommendations = cart.length > 0 ? getRecommendations() : [];

    return (
        <main className="container section">

            <h1>Votre panier</h1>

            {cart.length === 0 ? (
                <div>
                    <p>Votre panier est vide.</p>
                    <Link className="btn btn-primary" to="/catalogue">Aller au catalogue</Link>
                            
                    <div className="favorites">
                        <h2><i className="bi bi-heart-fill"></i> Suggestions pour vous</h2>

                        <p>En manque d'inspiration ? Découvrez les favoris de notre équipe !</p>

                        <BookGrid books={featuredBooks} />

                    </div>
        
                </div>
                
            ) : (
                <>
                    <div className="cart-layout">

                        {/* LISTE */}
                        <div className="cart-list">

                            {cart.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}

                        </div>

                        {/* RESUME */}
                        <CartSummary />

                    </div>
                    
                    {recommendations.length > 0 && (
                        <div className="recommendations">

                            <h2>
                                <i className="bi bi-stars"></i> Vous pourriez aimer
                            </h2>

                            <BookGrid books={recommendations} />

                        </div>
                    )}
                </>
                
            )}

        </main>
    );
}