import React, { useState, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Deck from "../../components/Deck";
import { useGame } from "../../contexts/GameContext/GameContext";
import Player from "../../components/Player";

const Game = () => {
  const {
    loadInitialDeck,
    error,
    loading,
    decks,
    createPlayer,
    players,
    dealCards,
  } = useGame();
  const [playerName, setPlayerName] = useState<string>("");

  const handleAddPlayer = () => {
    if (playerName.length > 0) {
      createPlayer({
        name: playerName,
        id: uuidv4(),
        hand: [],
        playerNumber: players.length + 1,
      });
      setPlayerName("");
    }
  };
  return (
    <>
      {error && "Error"}
      {decks.length > 0 ? (
        <>
          <ul>
            Decks:
            {decks.map((deck) => (
              <Fragment key={deck.deck_id}>
                <Deck deck={deck} key={deck.deck_id} />
                <Button
                  onClick={() => {
                    console.log(deck.deck_id);

                    dealCards(deck.deck_id, 4);
                  }}
                >
                  Deal
                </Button>
              </Fragment>
            ))}
          </ul>

          <ul>
            Players:
            {players.map((player) => (
              <li key={player.id}>
                <Player {...player} />
              </li>
            ))}
          </ul>
          <FormControl id="playerAdd" isRequired>
            <FormLabel>Add player</FormLabel>
            <Input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter name"
            />
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => handleAddPlayer()}
            >
              Submit
            </Button>
          </FormControl>
        </>
      ) : (
        <Button colorScheme="blue" size="sm" onClick={() => loadInitialDeck(1)}>
          {loading ? "Loading deck" : "Load deck"}
        </Button>
      )}
    </>
  );
};

export default Game;
