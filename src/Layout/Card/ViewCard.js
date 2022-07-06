import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function ViewCard({ cards }) {
  const [card, setCard] = useState(0);
  const [flip, setFlip] = useState(false);
  const history = useHistory();

  const nextCard = () => {
    if (card < cards.length - 1) {
      setCard(card + 1);
    } else {
      if (window.confirm("do you want to restart card?")) {
        setCard(0);
      } else {
        history.push("/");
      }
    }
    setFlip(false);
  };

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <div className="card w-75">
      <div className="card-body">
        <h5 className="card-title">
          Card {card + 1} of {cards.length}{" "}
        </h5>
        <p className="card-text">
          {flip ? cards[card].back : cards[card].front}
        </p>
        <button onClick={handleFlip} className="btn btn-secondary">
          Flip
        </button>
        {flip ? (
          <button onClick={() => nextCard()} className="btn btn-primary mx-3">
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ViewCard;
