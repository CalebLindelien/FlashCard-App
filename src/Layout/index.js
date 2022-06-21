import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Home/Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import Study from "./Study/Study";
import CreateDeck from "./CreateDeck/CreateDeck";
import ListDecks from "./Deck/ListDecks";
import EditDeck from "./Deck/EditDeck";
import EditCard from "./Deck/EditCard";
import AddCard from "./Deck/AddCard";

function Layout() {
  return (
    <Fragment>
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route exact={true} path="/">
              <Home />
            </Route>
            <Route path={`/decks/new`}>
              <CreateDeck />
            </Route>
            <Route path={`/decks/:deckId/cards/new`}>
              <AddCard />
            </Route>
            <Route path={`/decks/:deckId/cards/:cardId/edit`}>
              <EditCard />
            </Route>
            <Route path={`/decks/:deckId/edit`}>
              <EditDeck />
            </Route>
            <Route path={`/decks/:deckId/study`}>
              <Study />
            </Route>
            <Route path={`/decks/:deckId`}>
              <ListDecks />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
