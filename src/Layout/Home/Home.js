import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api/index";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();
  //fetching the decks from API
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchDecks();
  }, []);

  async function handleDelete(deck) {
    if (
      window.confirm(`Delete this deck? You will not be able to recover it`)
    ) {
      history.go(0);
      return await deleteDeck(deck.id);
    }
  }

  return (
    <div>
      <div className="container">
        <Link className="btn btn-secondary mb-2" to="/decks/new">
          + Create Deck
        </Link>
      </div>

      <div>
        {decks.map((deck) => {
          const cards = deck.cards;
          return (
            <div className="col" key={deck.id}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{deck.name}</h5>
                    <p>{`${cards.length} cards`}</p>
                  </div>
                  <p className="card-text">{deck.description}</p>
                  <div className="d-flex ">
                    <Link
                      to={`/decks/${deck.id}`}
                      className="btn btn-secondary mx-1"
                    >
                      View
                    </Link>
                    <Link
                      to={`/decks/${deck.id}/study`}
                      className="btn btn-primary mx-1"
                    >
                      Study
                    </Link>
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
          );
        })}
      </div>
    </div>
  );
}

export default Home;
