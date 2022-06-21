import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    async function deckInfo() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.error(error);
      }
      return () => {
        abortController.abort();
      };
    }
    deckInfo();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <div className="card">
        <div className="card-body">
          <div>
            <h1>{`${deck.name}: Add Card`}</h1>
            <div>
              <CardForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
