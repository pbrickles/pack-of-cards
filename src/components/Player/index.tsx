import React from "react";
import { PlayerInterface } from "../../contexts/GameContext/interfaces";

const Player: React.FC<PlayerInterface> = ({ name, playerNumber, hand }) => {
  return (
    <ul>
      <li>
        Player {playerNumber}: {name}
        {hand.map((card) => {
          return <img src={card.image} style={{ width: 30 }} key={card.code} />;
        })}
      </li>
    </ul>
  );
};

export default Player;
