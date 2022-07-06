import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../../utils/api";
import CardsForm from "./CardsForm";
function EditCard() {
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({});
  const params = useParams();
  const deckId = params.deckId;
  const cardId = params.cardId;
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const deckResponse = await readDeck(deckId, abortController.signal);
      setDeck(deckResponse);
      const response = await readCard(cardId, abortController.signal);
      setFormData(response);
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const SubmitHandler = (event) => {
    event.preventDefault();
    updateCard(formData);
    history.push(`/decks/${deckId}`);
    window.location.reload(false);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Edit card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>

      <CardsForm
        formData={formData}
        setFormData={setFormData}
        submit={SubmitHandler}
      />
    </div>
  );
}

export default EditCard;
