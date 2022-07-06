import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";

function EditDeck() {
  const [deck, setDeck] = useState({});
  const params = useParams();
  const deckId = params.deckId;
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setFormData({
        id: response.id,
        name: response.name,
        description: response.description,
      });
    }
    loadDeck();
  }, [deckId]);

  const changeHandler = ({ target }) =>
    setFormData({
      ...formData,
      [target.name]: target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(formData);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form>
        <label htmlFor="name">Name</label> <br></br>
        <input
          name="name"
          type="text"
          placeholder="Deck Name"
          onChange={changeHandler}
          defaultValue={formData.name}
        ></input>{" "}
        <br></br>
        <label htmlFor="description">Description</label> <br></br>
        <textarea
          name="description"
          placeholder="Brief description of the deck"
          onChange={changeHandler}
          defaultValue={formData.description}
        ></textarea>
        <Link to="/">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </Link>
        <Link to="./">
          <button value="Cancel" className="btn btn-secondary">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
}

export default EditDeck;
