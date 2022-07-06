import React from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { useEffect, useState } from "react";
import NotEnoughCards from "./Card/NotEnoughCards";
import NavbarCards from "./Card/Navbar-cards";
import ViewCard from "./Card/ViewCard";

function Study() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const params = useParams();
  const deckId = params.deckId;
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
      setCards(response.cards);
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  if (cards.length < 3) {
    return (
      <div>
        <NavbarCards deck={deck} />
        <h1>Study: {deck.name}</h1>
        <NotEnoughCards length={cards.length} deckId={deckId} />
      </div>
    );
  }
  return (
    <div>
      <NavbarCards deck={deck} />
      <h1>Study: {deck.name}</h1>
      <ViewCard cards={cards} />
    </div>
  );
}

export default Study;
