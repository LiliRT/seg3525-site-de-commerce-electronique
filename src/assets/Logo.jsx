export default function Logo({
    size = 32,
    color = "#8B5E3C",
    className = ""
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            className={className}
        >
            <rect
                x="10"
                y="10"
                width="44"
                height="44"
                rx="6"
                stroke={color}
                strokeWidth="3"
            />

            <line
                x1="32"
                y1="14"
                x2="32"
                y2="50"
                stroke={color}
                strokeWidth="2"
            />

            <polyline
                points="24,28 18,32 24,36"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />

            <polyline
                points="40,28 46,32 40,36"
                stroke={color}
                strokeWidth="2"
                fill="none"
            />
        </svg>
    );
}