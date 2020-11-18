import React from "react";
import "./App.css";
import { GameContextProvider } from "./contexts/GameContext/GameContext";
import Game from "./containers/Game/Game";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <GameContextProvider>
        <div className="App">A cards app?</div>
        <Game />
      </GameContextProvider>
    </ChakraProvider>
  );
}

export default App;
