export default function SearchBar({
    value = "",
    onChange = () => {},
    onSubmit,
    showButton = false
}) {

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && onSubmit) {
            onSubmit();
        }
    };

    return (
        <div className="search-bar">

            {showButton && (
                <button
                    className="search-btn"
                    onClick={onSubmit}
                    aria-label="Rechercher"
                >
                    <i className="bi bi-search"></i>
                </button>
            )}

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher un livre..."
            />

            {value && (
                <button
                    className="search-clear"
                    onClick={() => onChange("")}
                    aria-label="Effacer la recherche"
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            )}

        </div>
    );
}