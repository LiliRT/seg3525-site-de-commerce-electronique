export default function PriceSlider({ value, onChange }) {

    return (
        <div className="price-slider">

            <label>
                Prix max : {value} $
            </label>

            <input
                type="range"
                min="5"
                max="50"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />

        </div>
    );
}