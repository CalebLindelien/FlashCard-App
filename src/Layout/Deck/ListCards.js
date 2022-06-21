import React, { useState } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { deleteDeck, deleteCard } from "../../utils/api";

function ListCards({ cards }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  async function handleDelete(card) {
    if (
      window.confirm(`Delete this card? You will not be able to recover it`)
    ) {
      history.go(0);
      return await deleteCard(card.id);
    }
  }
  //TODO: I want to be able to list the cards front and back

  return (
    <div>
      {cards && cards.length && (
        <div className="row justify-content-center">
          <div className="col">
            {cards.map((card) => {
              return (
                <div className="card" key={card.id}>
                  <div className="card-body row">
                    <div className="col-6 mb-2">
                      <p className="card-text">
                        <b>front: </b>
                        {card.front}
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="card-text">
                        <b>back: </b>
                        {card.back}
                      </p>
                    </div>
                    <Link
                      to={`${url}/cards/${card.id}/edit`}
                      className="btn btn-secondary mx-1"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(card)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListCards;
