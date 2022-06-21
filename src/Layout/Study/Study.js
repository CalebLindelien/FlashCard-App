import { readDeck } from "../../utils/api/index";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import DisplayCard from "./DisplayCard";

function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDecks();
    return () => abortController.abort();
  }, [deckId]);

  return (
    <div className="col">
      <div>
        <NavBar deckId={deckId} deck={deck} />
      </div>
      <div>
        <DisplayCard deckId={deckId} deck={deck} />
      </div>
    </div>
  );
}

export default Study;
