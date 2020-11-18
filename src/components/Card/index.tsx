import React from "react";

export interface CardProps {
  image: string;
  value: string;
  suit: "SPADES" | "HEARTS" | "CLUBS" | "DIAMONDS";
  code: string;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div>
      <img src={image} style={{ width: 50 }} />
    </div>
  );
};

export default Card;
