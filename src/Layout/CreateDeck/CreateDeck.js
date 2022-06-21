import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
import NavBar from "./NavBar";

function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialFormState);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`decks/${response.id}`);
  }

  const handleChange = (event) => {
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });
  };

  return (
    <div className="col-0 mx-auto">
      <div>
        <NavBar />
      </div>
      <header>
        <h2>Create Deck</h2>
      </header>
      <div className="card">
        <div className="card-body">
          <form>
            <div>
              <label>Name:</label>
              <br />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Deck name"
                onChange={handleChange}
                value={newDeck.name}
                style={{ width: "100%" }}
              />
            </div>
            <br />
            <div>
              <label>description:</label>
              <br />
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Brief description of the deck"
                onChange={handleChange}
                value={newDeck.description}
                style={{ width: "100%" }}
              />
            </div>
            <Link to="/" className="btn btn-secondary mr-3">
              Cancel
            </Link>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
