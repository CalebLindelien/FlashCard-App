import React from "react";
import { Link, useParams } from "react-router-dom";

function NotEnoughCards({ deck }) {
  const { deckId } = useParams();
  return (
    <main className="container">
      <div className="card-body">
        <div>
          <h1>Not enough cards.</h1>
        </div>
        <p className="card-text">
          You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    </main>
  );
}

export default NotEnoughCards;
