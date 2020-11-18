export interface DeckResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}
export type DeckInterface = Omit<DeckResponse, "success">;

export interface CardInterface {
  image: string;
  value: string;
  suit: "SPADES" | "HEARTS" | "CLUBS" | "DIAMONDS";
  code: string;
}

export interface DealResponse {
  cards: Array<CardInterface>;
  deck_id: string;
  remaining: number;
  success: boolean;
}

export interface PlayerInterface {
  name: string;
  id: string;
  hand: Array<CardInterface>;
  playerNumber: number;
}

export type LoadInitialDeck = (deckCount: number) => Promise<void>;
export type DealCards = (
  deckId: string,
  cardsPerHand: number,
  clearhands?: boolean
) => Promise<void>;
export type CreatePlayer = (player: PlayerInterface) => void;
export type RemovePlayer = (playerID: string) => void;
export type ClearPlayers = () => void;

export interface GameContextState {
  decks: Array<DeckInterface>;
  loading: boolean;
  error?: Error;
  players: Array<PlayerInterface>;
  loadInitialDeck: LoadInitialDeck;
  dealCards: DealCards;
  createPlayer: CreatePlayer;
  removePlayer: RemovePlayer;
  clearPlayers: ClearPlayers;
}
