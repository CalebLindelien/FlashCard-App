import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";

function DisplayCard({ deckId, deck }) {
  const [card, setCard] = useState(0);
  const [flip, setFlip] = useState(true);

  const handleNext = () => {
    setFlip(true);
    if (card === deck.cards.length - 1) {
      window.confirm("Click OK to restart the deck.")
        ? setCard(0)
        : useHistory.push("/");
    } else {
      setCard((card) => card + 1);
    }
  };

  return (
    <div>
      {deck.cards && (
        <div className="row justify-content-center">
          <div className="col">
            <div className="card">
              <div className="card-body">
                {deck.cards.length < 3 ? (
                  <div>
                    <NotEnoughCards deck={deck} />
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title">
                      Card {card + 1} of {deck.cards.length}
                    </h5>
                    <p className="card-text">
                      {flip ? deck.cards[card].front : deck.cards[card].back}
                    </p>
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={() => setFlip(!flip)}
                    >
                      Flip
                    </button>
                    {!flip ? (
                      <button className="btn btn-primary" onClick={handleNext}>
                        Next
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayCard;
