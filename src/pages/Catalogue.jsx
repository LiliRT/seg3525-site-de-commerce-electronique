import { useState } from "react";
import { useLocation } from "react-router-dom";

import books from "../data/books";
import genres from "../data/genres";
import formats from "../data/formats";
import languages from "../data/languages";
import publishers from "../data/publishers";

import BookGrid from "../components/books/BookGrid";
import FacetFilters from "../components/filters/FacetFilters";
import SearchBar from "../components/layout/SearchBar";

export default function Catalogue() {

    const location = useLocation();

    const [filters, setFilters] = useState(() => ({
        genre: location.state?.genre || [],
        language: [],
        publisher: [],
        format: [],
        maxPrice: 40,
        search: "",
        sort: "title"
    }));

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const applyFilters = (booksList, filters) => {

        return booksList.filter(book => {

            const matchGenre =
                filters.genre.length === 0 ||
                filters.genre.includes(book.genre);

            const matchLanguage =
                filters.language.length === 0 ||
                filters.language.includes(book.language);

            const matchPublisher =
                filters.publisher.length === 0 ||
                filters.publisher.includes(book.publisher);

            const matchFormat =
                filters.format.length === 0 ||
                book.formats.some(f => filters.format.includes(f));

            const matchPrice =
                book.price <= filters.maxPrice;

            const search = (filters.search || "").toLowerCase();

            const matchSearch =
                search === "" ||
                book.title.toLowerCase().includes(search) ||
                book.author.toLowerCase().includes(search);

            return (
                matchGenre &&
                matchLanguage &&
                matchPublisher &&
                matchFormat &&
                matchPrice &&
                matchSearch
            );
        });
    };

    const filteredBooks = applyFilters(books, filters).sort((a, b) => {

        switch (filters.sort) {

            case "price":
                return a.price - b.price;

            case "title":
                return a.title.localeCompare(b.title);

            case "year":
                return b.originalYear - a.originalYear;

            default:
                return 0;
        }
    });

    const search =
        typeof filters.search === "string"
            ? filters.search.toLowerCase()
            : "";

    const matchSearch =
        search === "" ||
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search);

    const countByFacet = (key, value) => {

        const testFilters = {
            ...filters
        };

        if (key === "genre") {
            testFilters.genre = [value];
        }

        if (key === "language") {
            testFilters.language = [value];
        }

        if (key === "publisher") {
            testFilters.publisher = [value];
        }

        if (key === "format") {
            testFilters.format = [value];
        }

        return applyFilters(books, testFilters).length;
    };

    const resetFilters = () => {
        setFilters({
            genre: [],
            language: [],
            publisher: [],
            format: [],
            maxPrice: 40,
            search: "",
            sort: "title"
        });
    };

    const activeFilters = [];

    filters.genre.forEach(v =>
        activeFilters.push({ type: "genre", value: v })
    );

    filters.language.forEach(v =>
        activeFilters.push({ type: "language", value: v })
    );

    filters.publisher.forEach(v =>
        activeFilters.push({ type: "publisher", value: v })
    );

    filters.format.forEach(v =>
        activeFilters.push({ type: "format", value: v })
    );

    return (
        <main className="container section">

            <h1>Catalogue</h1>

            {/* SEARCH */}
            <SearchBar
                value={filters.search}
                onChange={(value) =>
                    setFilters({ ...filters, search: value })
                }
            />

            {activeFilters.length > 0 && (
                <div className="active-filters">

                    {activeFilters.map((f, i) => (
                        <div key={i} className="chip">
                            {f.value}

                            <button
                                onClick={() => {
                                    setFilters(prev => ({
                                        ...prev,
                                        [f.type]: prev[f.type].filter(v => v !== f.value)
                                    }));
                                }}
                            >
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    ))}

                </div>
            )}            

            <button
                className="btn btn-secondary mobile-filter-btn"
                onClick={() => setIsFilterOpen(true)}
            >
                <i className="bi bi-funnel"></i> Filtres
            </button>

            <div className="catalogue-layout">
                
                {/* FILTRES */}
                <FacetFilters
                    genres={genres}
                    languages={languages}
                    publishers={publishers}
                    formats={formats}
                    selected={filters}
                    onChange={setFilters}
                    onReset={resetFilters}
                    countByFacet={countByFacet}
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                />

                {/* RESULTATS */}
                <div>

                    <div className="catalogue-top">

                        <p>{filteredBooks.length} résultats</p>

                        <select
                            value={filters.sort}
                            onChange={(e) =>
                                setFilters({ ...filters, sort: e.target.value })
                            }
                        >
                            <option value="title">Titre</option>
                            <option value="price">Prix</option>
                            <option value="year">Année</option>
                        </select>

                    </div>

                    <BookGrid books={filteredBooks} />

                </div>

            </div>

        </main>
    );
}