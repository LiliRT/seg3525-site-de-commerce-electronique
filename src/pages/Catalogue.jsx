import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import books from "../data/books";
import genres from "../data/genres";
import formats from "../data/formats";
import languages from "../data/languages";
import publishers from "../data/publishers";

import BookGrid from "../components/books/BookGrid";
import FacetFilters from "../components/filters/FacetFilters";
import SearchBar from "../components/layout/SearchBar";
import { getDiscountedPrice } from "../utils/pricing";

const getInitialFilters = (searchParams) => ({
    genre: searchParams.getAll("genre"),
    language: searchParams.getAll("language"),
    publisher: searchParams.getAll("publisher"),
    format: searchParams.getAll("format"),
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 40,
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "title"
});

export default function Catalogue() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState(() => getInitialFilters(searchParams));

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const isMounted = useRef(false);

    const navigate = useNavigate();

    const location = useLocation();

    const enrichedBooks = useMemo(() => {
        return books.map(book => {
            const pricing = getDiscountedPrice(book);

            return {
                ...book,
                finalPrice: pricing.finalPrice
            };
        });
    }, []);

    useEffect(() => {window.scrollTo({ top: 0, behavior: "smooth" });}, []);

    const goBack = () => {
        if (window.history.state?.idx > 0) {
            navigate(-1);
        } else {
            navigate("/catalogue");
        }
    };

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

            const matchPrice = book.finalPrice <= filters.maxPrice;

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

    const filteredBooks = applyFilters(enrichedBooks, filters).sort((a, b) => {

        switch (filters.sort) {

            case "price_asc":
                return a.finalPrice - b.finalPrice;

            case "price_desc":
                return b.finalPrice - a.finalPrice;

            case "year":
                return b.originalYear - a.originalYear;

            case "title":
            default:
                return a.title.localeCompare(b.title);
        }
    });

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

        return applyFilters(enrichedBooks, testFilters).length;
    };

    const countByPrice = (maxPrice) => {
        const testFilters = {
            ...filters,
            maxPrice
        };

        return applyFilters(enrichedBooks, testFilters).length;
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

    if (filters.maxPrice !== 40) {
        activeFilters.push({
            type: "maxPrice",
            value: `Prix max: ${filters.maxPrice} $`
        });
    }

    const clearFiltersExceptSearch = () => {
        setFilters(prev => ({
            genre: [],
            language: [],
            publisher: [],
            format: [],
            maxPrice: 30,
            search: prev.search,
            sort: "title"
        }));

        setIsFilterOpen(false);
    };

    useEffect(() => {

        if (location.state?.scrollToTop) {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    }, []);

    useEffect(() => {

        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const params = {};

        if (filters.search) params.search = filters.search;
        if (filters.sort !== "title") params.sort = filters.sort;
        if (filters.maxPrice !== 40) params.maxPrice = filters.maxPrice;

        if (filters.genre.length) params.genre = filters.genre;
        if (filters.language.length) params.language = filters.language;
        if (filters.publisher.length) params.publisher = filters.publisher;
        if (filters.format.length) params.format = filters.format;

        setSearchParams(params, { replace: true });

    }, [filters]);
    
    useEffect(() => {
        const next = getInitialFilters(searchParams);

        setFilters(prev => {
            const same =
                JSON.stringify(prev) === JSON.stringify(next);

            return same ? prev : next;
        });

    }, [searchParams]);
    
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
                    onReset={clearFiltersExceptSearch}
                    countByFacet={countByFacet}
                    countByPrice={countByPrice}
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                />

                {/* RESULTATS */}
                <div>

                    {activeFilters.length > 0 && (
                        <div className="active-filters-bar">

                            <span className="active-filters-label">
                                Filtres actifs :
                            </span>

                            <div className="active-filters compact">

                                {activeFilters.map((f, i) => (
                                    <div key={i} className="chip small">

                                        {f.value}

                                        <button
                                            onClick={() => {
                                                setFilters(prev => {
                                                    if (f.type === "maxPrice") {
                                                        return {
                                                            ...prev,
                                                            maxPrice: 40
                                                        };
                                                    }

                                                    return {
                                                        ...prev,
                                                        [f.type]: prev[f.type].filter(v => v !== f.value)
                                                    };
                                                });
                                            }}
                                        >
                                            <i className="bi bi-x"></i>
                                        </button>

                                    </div>
                                ))}

                            </div>

                        </div>
                    )}        

                    <div className="catalogue-top">

                        <p className="results-text">
                            <strong>{filteredBooks.length}</strong>{" "}
                            {filteredBooks.length > 1 ? "livres trouvés" : "livre trouvé"}
                        </p>

                        <select
                            className="sort-select"
                            value={filters.sort}
                            onChange={(e) =>
                                setFilters({ ...filters, sort: e.target.value })
                            }
                        >
                            <option value="title">Titre</option>
                            <option value="price_asc">Prix croissant</option>
                            <option value="price_desc">Prix décroissant</option>
                            <option value="year">Date de sortie</option>
                        </select>

                    </div>

                    {filteredBooks.length > 0 ? (

                        <BookGrid books={filteredBooks} />

                    ) : (

                        <div className="empty-results">

                            <i className="bi bi-search"></i>

                            <h3>Aucun livre trouvé</h3>

                            <p>
                                Aucun ouvrage ne correspond à votre recherche ou à vos filtres.
                            </p>

                            {/* FILTRES ACTIFS */}
                            {activeFilters.length > 0 && (
                                <div className="empty-active-filters compact-centered">

                                    <p className="empty-label">
                                        Filtres actifs :
                                    </p>

                                    <div className="active-filters compact centered">

                                        {activeFilters.map((f, i) => (
                                            <div key={i} className="chip small">

                                                {f.value}

                                                <button
                                                    onClick={() => {
                                                        setFilters(prev => {
                                                            if (f.type === "maxPrice") {
                                                                return {
                                                                    ...prev,
                                                                    maxPrice: 40
                                                                };
                                                            }

                                                            return {
                                                                ...prev,
                                                                [f.type]: prev[f.type].filter(v => v !== f.value)
                                                            };
                                                        });
                                                    }}
                                                >
                                                    <i className="bi bi-x"></i>
                                                </button>

                                            </div>
                                        ))}

                                    </div>

                                    <button
                                        className="btn btn-secondary compact-btn"
                                        onClick={clearFiltersExceptSearch}
                                    >
                                        <i className="bi bi-funnel"></i>
                                        Réinitialiser les filtres
                                    </button>

                                </div>
                            )}
                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}