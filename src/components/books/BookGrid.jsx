import BookCard from "./BookCard";

export default function BookGrid({ books }) {

    return (
        <div className="book-grid">

            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}

        </div>
    );
}