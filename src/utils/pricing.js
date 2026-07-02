const PROMO_GENRES = ["Roman classique", "Philosophie"];
const PROMO_RATE = 0.2;

export function getDiscountedPrice(book) {
    const isPromo = PROMO_GENRES.includes(book.genre);

    if (!isPromo) {
        return {
            originalPrice: book.price,
            finalPrice: book.price,
            hasDiscount: false,
            discount: 0
        };
    }

    const finalPrice = book.price * (1 - PROMO_RATE);

    return {
        originalPrice: book.price,
        finalPrice,
        hasDiscount: true,
        discount: PROMO_RATE
    };
}