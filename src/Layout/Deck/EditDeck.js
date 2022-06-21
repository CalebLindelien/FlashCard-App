import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState(initialDeckState);

  useEffect(() => {
    async function fetchData() {
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
    fetchData();
  }, []);

  function handleChange({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  async function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <div className="col-0 p-">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Edit Deck</li>
          </ol>
        </nav>
      </div>
      <header>
        <h2>Edit Deck</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label>Name</label>
              <input
                id="name"
                name="name"
                className="form-control"
                onChange={handleChange}
                type="text"
                value={deck.name}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                onChange={handleChange}
                type="text"
                value={deck.description}
              />
            </div>
            <button
              className="btn btn-secondary mx-1"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button className="btn btn-primary mx-1" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditDeck;
