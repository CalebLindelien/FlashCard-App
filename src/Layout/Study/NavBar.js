import React from "react";
import { Link } from "react-router-dom";

function NavBar({ deckId, deck }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Study</li>
      </ol>
    </nav>
  );
}

export default NavBar;
