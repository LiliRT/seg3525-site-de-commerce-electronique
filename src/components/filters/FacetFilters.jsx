import CheckboxFilter from "./CheckboxFilter";

export default function FacetFilters({
    genres,
    languages,
    publishers,
    formats,
    selected,
    onChange,
    onReset,
    countByFacet,
    isOpen,
    onClose
}) {
    return (
        <>
            {/* overlay */}
            <div
                className={`filters-overlay ${isOpen ? "open" : ""}`}
                onClick={onClose}
            />

            {/* drawer */}
            <aside className={`filters ${isOpen ? "open" : ""}`}>

                {/* HEADER */}
                <div className="filters-header">

                    <div className="filters-title">
                        Filtres
                    </div>

                    <div className="filters-header-actions">

                        <button className="reset-mini" onClick={onReset}>
                            <i className="bi bi-arrow-counterclockwise"></i>
                        </button>

                        <button
                            className="close-btn"
                            onClick={onClose}
                            aria-label="Fermer les filtres"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="filters-content">

                    <CheckboxFilter
                        label="Genres"
                        options={genres}
                        selected={selected.genre}
                        onChange={(val) =>
                            onChange({ ...selected, genre: val })
                        }
                        countByFacet={(value) => countByFacet("genre", value)}
                    />

                    <CheckboxFilter
                        label="Formats"
                        options={formats}
                        selected={selected.format}
                        onChange={(val) =>
                            onChange({ ...selected, format: val })
                        }
                        countByFacet={(value) => countByFacet("format", value)}
                    />

                    <CheckboxFilter
                        label="Langues"
                        options={languages}
                        selected={selected.language}
                        onChange={(val) =>
                            onChange({ ...selected, language: val })
                        }
                        countByFacet={(value) => countByFacet("language", value)}
                    />

                    <CheckboxFilter
                        label="Éditeurs"
                        options={publishers}
                        selected={selected.publisher}
                        onChange={(val) =>
                            onChange({ ...selected, publisher: val })
                        }
                        countByFacet={(value) => countByFacet("publisher", value)}
                    />

                    <button className="btn btn-secondary mobile" onClick={onReset}>
                        Réinitialiser les filtres
                    </button>

                </div>

            </aside>
        </>
    );
}