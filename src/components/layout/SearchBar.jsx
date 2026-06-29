export default function SearchBar({ value, onChange }) {

    return (
        <div className="search-bar">

            <i className="bi bi-search"></i>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Rechercher un livre..."
            />

        </div>
    );
}