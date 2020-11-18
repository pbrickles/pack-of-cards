import React from "react";
import { DeckInterface } from "../../contexts/GameContext/interfaces";

interface DeckProps {
  deck: DeckInterface;
}

const Deck: React.FC<DeckProps> = ({ deck }) => {
  return (
    <ul>
      <li>id: {deck.deck_id}</li>
      <li>remaining: {deck.remaining}</li>
    </ul>
  );
};

export default Deck;
