export default function ErrorMessage({ message }) {
    if (!message) return null;

    return (
        <p style={{ color: "red", fontSize: "0.9rem" }}>
            {message}
        </p>
    );
}