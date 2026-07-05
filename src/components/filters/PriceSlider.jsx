export default function PriceSlider({ value, onChange, countByPrice }) {

    return (
        <div className="price-slider">

            <h4>Prix</h4>
            <div className="price-header">

                <span className="price-label">
                    Moins de {value} $
                </span>

                {countByPrice && (
                    <span className="count">
                        {countByPrice(value)}
                    </span>
                )}

            </div>

            <input
                type="range"
                min="10"
                max="30"
                step="5"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    "--value": value
                }}
            />

        </div>
    );
}