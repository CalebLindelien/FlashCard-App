import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "", deckId: "" });
  const { deckId, cardId } = useParams();
  const history = useHistory();

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
            Edit Card
          </li>
        </ol>
      </nav>
      <div>
        <CardForm />
      </div>
    </div>
  );
}

export default EditCard;
