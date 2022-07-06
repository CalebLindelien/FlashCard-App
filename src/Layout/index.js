import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./Deck/CreateDeck";
import Study from "./Study";
import Deck from "./Deck/ViewDeck";
import AddCard from "./Card/AddCard";
import EditDeck from "./Deck/EditDeck";
import EditCard from "./Card/EditCard";
function Layout() {
  return (
    <div>
      <Header />

      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <Deck />
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route exact path={"/decks/:deckId/cards/new"}>
            <AddCard />
          </Route>
          <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
