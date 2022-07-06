import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../../utils/api";

function Deck() {
  const [deck, setDeck] = useState({});

  const [cards, setCards] = useState([]);

  const params = useParams();
  const deckId = params.deckId;
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
      setCards(response.cards);
    }

    loadDecks();

    return () => abortController.abort();
  }, [deckId]);

  const handleDeleteDeck = (deckId) => {
    if (window.confirm("Do you really want to delete this deck?")) {
      deleteDeck(deckId);
      window.location.reload(false);
    }
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm("Do you really want to delete this card?")) {
      deleteCard(cardId);
      window.location.reload(false);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mx-1">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mx-1">
          Study
        </Link>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary mx-1"
        >
          Add Cards
        </Link>
        <button
          className="btn btn-danger mx-4"
          onClick={() => handleDeleteDeck(deckId)}
        >
          Delete
        </button>
      </div>

      <div>
        <h2>Cards</h2>

        {cards.map((card, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-body">
                <p className="card-text">{card.front}</p>
                <p className="card-text my-4">{card.back}</p>
                <Link
                  to={`./${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary mx-1"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Delete
                </button>{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Deck;
