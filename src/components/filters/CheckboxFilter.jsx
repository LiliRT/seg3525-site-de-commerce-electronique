export default function CheckboxFilter({
    label,
    options,
    selected,
    onChange,
    countByFacet
}) {

    const toggle = (value) => {

        if (selected.includes(value)) {
            onChange(selected.filter(v => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    return (
        <div className="filter-block">

            <h4>{label}</h4>

            {options.map(opt => (

                <label key={opt} className="checkbox">

                    <span>
                        <input
                            type="checkbox"
                            checked={selected.includes(opt)}
                            onChange={() => toggle(opt)}
                        />

                        <span className="checkbox-mark"></span>

                        {opt}
                    </span>

                    <span className="count">
                        {countByFacet ? countByFacet(opt) : 0}
                    </span>

                </label>

            ))}

        </div>
    );
}