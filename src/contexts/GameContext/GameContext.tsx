import React, { createContext, useContext, useState } from "react";
import useFetch from "use-http";
import {
  clearPlayerHands,
  dealCardsToPlayers,
  updateDeckCount,
} from "../../utils/dealCards";

import {
  ClearPlayers,
  CreatePlayer,
  DealCards,
  DealResponse,
  DeckResponse,
  GameContextState,
  PlayerInterface,
  RemovePlayer,
} from "./interfaces";

const initialPromiseMethod = () => {
  return Promise.resolve(undefined);
};

const initialMethod = () => {
  return undefined;
};

const initialState: GameContextState = {
  decks: [],
  loading: false,
  loadInitialDeck: initialPromiseMethod,
  dealCards: initialPromiseMethod,
  createPlayer: initialMethod,
  clearPlayers: initialMethod,
  removePlayer: initialMethod,
  players: [],
};

const GameContext = createContext(initialState);

export const GameContextProvider: React.FC<{
  value?: GameContextState;
}> = ({ value, children }) => {
  const { get, response, loading, error } = useFetch(
    "https://deckofcardsapi.com",
    []
  );
  const [decks, setDecks] = useState(value?.decks || []);
  const [players, setPlayers] = useState(value?.players || []);

  const loadInitialDeck = async (deckCount = 1) => {
    const { shuffled, deck_id, remaining }: DeckResponse = await get(
      `/api/deck/new/shuffle/?deck_count=${deckCount}`
    );
    if (response.ok) setDecks([{ shuffled, deck_id, remaining }]);
  };

  const createPlayer: CreatePlayer = (player: PlayerInterface) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const removePlayer: RemovePlayer = (playerID: string) =>
    setPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== playerID));

  const clearPlayers: ClearPlayers = () => setPlayers([]);

  const dealCards: DealCards = async (deckId, cardsPerHand, clearHands) => {
    const deck = decks.find((d) => d.deck_id === deckId);
    if (!deck || !players.length) return;

    // clear hands if required
    if (clearHands) setPlayers((p) => clearPlayerHands(p));

    //establish number of cards needed
    const requiredCardCount = players.length * cardsPerHand;

    // draw from deck
    const { cards, remaining, success, deck_id }: DealResponse = await get(
      `/api/deck/${deckId}/draw/?count=${requiredCardCount}`
    );
    if (response.ok && success) {
      const newPlayers = dealCardsToPlayers(cards, players);
      setDecks((d) => updateDeckCount(d, deckId, remaining, deck_id));
      setPlayers(newPlayers);
    }

    // createDrawPile?
  };

  return (
    <GameContext.Provider
      value={{
        decks,
        loading,
        error,
        loadInitialDeck,
        dealCards,
        players,
        createPlayer,
        clearPlayers,
        removePlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

export default GameContext;
