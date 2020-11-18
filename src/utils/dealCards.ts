import {
  CardInterface,
  DeckInterface,
  PlayerInterface,
} from "../contexts/GameContext/interfaces";

export const dealCardsToPlayers = (
  cards: Array<CardInterface>,
  players: Array<PlayerInterface>
) => {
  const cardCountPerPlayer = cards.length / players.length;
  const playersToUpdate = players.map((player) => {
    const playerHand = cards.splice(0, cardCountPerPlayer);
    return { ...player, hand: playerHand };
  });
  return playersToUpdate;
};

export const clearPlayerHands = (players: Array<PlayerInterface>) =>
  players.map((player) => {
    player.hand = player.hand.splice(0);
    return player;
  });

export const updateDeckCount = (
  decks: Array<DeckInterface>,
  deckId: string,
  remaining: number,
  newDeckId: string
) =>
  decks.map((d) => {
    if (d.deck_id === deckId) {
      return { ...d, remaining, deck_id: newDeckId };
    } else {
      return d;
    }
  });
