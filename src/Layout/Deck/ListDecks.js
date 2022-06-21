import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api/index";
import ListCards from "./ListCards";
import Navbar from "./NavBar";

function ListDecks() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { deckId } = useParams();

  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
      return () => {
        abortController.abort();
      };
    }
    getDeck();
  }, [deckId]);

  async function handleDelete(deck) {
    if (
      window.confirm(`Delete this deck? You will not be able to recover it`)
    ) {
      history.push("/");
      return await deleteDeck(deck.id);
    }
  }

  if (deck.length === 0) return null;
  return (
    <div>
      <div className="col">
        <Navbar deck={deck} />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex justify-content-between">
              <div>
                <Link to={`${url}/edit`} className="btn btn-secondary mr-1">
                  Edit
                </Link>
                <Link to={`${url}/study`} className="btn btn-primary mr-1">
                  Study
                </Link>
                <Link to={`${url}/cards/new`} className="btn btn-primary">
                  + Add Card
                </Link>
              </div>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(deck)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <h1 className="mt-3">Cards</h1>
          <ListCards cards={deck.cards} />
        </div>
      </div>
    </div>
  );
}

export default ListDecks;
