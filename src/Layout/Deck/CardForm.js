import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link, useLocation } from "react-router-dom";
import {
  createCard,
  readDeck,
  updateDeck,
  readCard,
  updateCard,
} from "../../utils/api/index";

function CardForm() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "", deckId: "" });
  const [isEdit, setIsEdit] = useState(null);
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const [front, setFront] = useState({ front: "" });
  const [back, setBack] = useState({ back: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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

  useEffect(() => {
    async function fetchCard() {
      const abortController = new AbortController();
      try {
        const response = await readCard(cardId);
        setCard(response);
      } catch (error) {
        console.error(error);
      }
      return () => {
        abortController.abort();
      };
    }
    function addOrEdit() {
      if (pathname.includes("new")) {
        setIsEdit(false);
      } else {
        setIsEdit(true);
        fetchCard();
      }
    }
    addOrEdit();
  }, [pathname, cardId]);
  //useEffect for the validation
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      return front, back;
    }
  }, [formErrors]);

  //edit card
  const validateEdit = (values) => {
    const errors = {};

    if (!values.front) {
      errors.front = "card front must include information";
    }
    if (!values.back) {
      errors.back = "card back must include information";
    }
    return errors;
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    setFormErrors(validateEdit(card));
    setIsSubmit(true);
    // history.push(`/decks/${deck.id}`);
  };

  function handleEditFront(e) {
    setCard({ ...card, front: e.target.value });
  }
  function handleEditBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  //   //addCard
  const validateAdd = (values) => {
    const errors = {};

    if (!values.front) {
      errors.front = "card front must include information";
    }
    if (!values.back) {
      errors.back = "card back must include information";
    }
    return errors;
  };

  function handleAddFront(event) {
    setFront({ ...front, front: event.target.value });
  }

  function handleAddBack(event) {
    setBack({ ...back, back: event.target.value });
  }

  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    createCard(parseInt(deckId), { ...front, ...back });
    setFormErrors(validateEdit({ ...front, ...back }));
    setIsSubmit(true);
    setFront({ front: "" });
    setBack({ back: "" });
  }

  return (
    <div>
      <form onSubmit={handleAddSubmit}>
        <p>
          {
            //this is to show an error if there are formErrors for the front
            isEdit ? formErrors.front : formErrors.front
          }
        </p>

        <div className="form-group">
          <label>
            <strong>Front:</strong>
          </label>
          <textarea
            required
            className="form-control"
            id="front"
            rows="3"
            placeholder={isEdit ? null : "Front side of card"}
            value={isEdit ? card.front : front.front}
            onChange={isEdit ? handleEditFront : handleAddFront}
          ></textarea>
        </div>
        <p>
          {
            //this is to show an error if there are formErrors for the back
            isEdit ? formErrors.back : formErrors.back
          }
        </p>
        <div className="form-group">
          <label>
            <strong>Back:</strong>
          </label>

          <textarea
            required
            className="form-control"
            id="back"
            rows="3"
            placeholder={isEdit ? null : "Back side of card"}
            value={isEdit ? card.back : back.back}
            onChange={isEdit ? handleEditBack : handleAddBack}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-1"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={isEdit ? handleEditSubmit : handleAddSubmit}
        >
          {isEdit ? "Submit" : "Add Card"}
        </button>
      </form>
    </div>
  );
}

export default CardForm;
