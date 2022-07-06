import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ length, deckId }) {
  return (
    <div>
      <h2>Not enough cards</h2>
      <p>
        You need at least 3 cards to study. There are {length} in this deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        + Add card
      </Link>
    </div>
  );
}

export default NotEnoughCards;
