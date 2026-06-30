import "bootstrap-icons/font/bootstrap-icons.css";

import Logo from "../../assets/Logo";

export default function BookCover({ title, author, genre }) {

    const genreMap = {
        "Roman classique": { color: "#8B5E3C", icon: "bi-book" },
        "Science-fiction": { color: "#3C5E8B", icon: "bi-stars" },
        "Policier": { color: "#2E2E2E", icon: "bi-search" },
        "Philosophie": { color: "#6B4C9A", icon: "bi-lightbulb" },
        "Histoire": { color: "#8B3C3C", icon: "bi-globe-europe-africa" },
        "Jeunesse": { color: "#3C8B6E", icon: "bi-balloon-heart" },
        "Fantasy": { color: "#3C5E8B", icon: "bi-magic" },
        "Bande dessinée": { color: "#C28C3C", icon: "bi-chat-dots" },
    };

    const config = genreMap[genre] || genreMap["Roman classique"];

    return (
        <div className="book-scene">

            <div className="book-bg" />

            <div className="book-3d">

                <div
                    className="book-face"
                    style={{ backgroundColor: config.color }}
                >

                    <i className={`bi ${config.icon} book-icon`} />

                    <div className="book-title">{title}</div>
                    <div className="book-author">{author}</div>

                </div>

                <div className="book-spine" />
            </div>

            <div className="codex-sign">
                <Logo size={16} />
                <span>Codex</span>
            </div>

        </div>
    );
}