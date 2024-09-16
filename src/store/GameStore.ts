import { create } from "zustand";

type Player = {
  name: string;
};

type GameStates = {
  playerOne: Player;
  playerTwo: Player;
  board: string[][];
  playerOneTurn: boolean;
  gameEnd: { isWon: boolean; isTie: boolean };
  isStarted: 'human' | null;
  opponent: "human" | null;
}

type GameActions = {
  changeTurn: () => void;
  resetGame: () => void;
  handleColumnClick: (column: number) => void;
  startGame: (value: 'human') => void;
  updatePlayerName: (player: "one" | "two", name: string) => void;
  setOpponent: (opponent: "human") => void;
};

type GameStore = GameStates & GameActions;

const BOARD_SIZE = 6;
const COLUMN_SIZE = 7;

const createEmptyBoard = (rows = BOARD_SIZE, columns = COLUMN_SIZE) => {
  return Array.from({ length: rows }, () => Array(columns).fill(""));
};

const initialState = {
  playerOne: { name: "Player 1" },
  playerTwo: { name: "Player 2" },
  board: createEmptyBoard(),
  playerOneTurn: true,
  gameEnd: { isWon: false, isTie: false },
  isStarted: null,
  opponent: null,
} satisfies GameStates;

const useGameStore = create<GameStore>((set) => ({
  playerOne: initialState.playerOne,
  playerTwo: initialState.playerTwo,
  board: initialState.board,
  playerOneTurn: initialState.playerOneTurn,
  gameEnd: initialState.gameEnd,
  isStarted: initialState.isStarted,
  opponent: initialState.opponent,
  setOpponent: (opponent: "human") => set(() => ({ opponent: opponent  })),
  changeTurn: () => set((state) => ({ playerOneTurn: !state.playerOneTurn })),
  resetGame: () =>
    set((state) => ({
      ...initialState,
      board: createEmptyBoard(),
      isStarted: state.isStarted,
      playerOne: { ...state.playerOne },
      playerTwo: { ...state.playerTwo },
    })),
  handleColumnClick: (column: number) =>
    set((state) => {
      if (state.board[0][column]) return { board: state.board };
      if (state.gameEnd.isTie || state.gameEnd.isWon)
        return { board: state.board };

      const newBoard = [...state.board];
      for (let row = BOARD_SIZE - 1; row >= 0; row--) {
        if (!newBoard[row][column]) {
          newBoard[row][column] = state.playerOneTurn ? "X" : "O";
          if (checkWin(newBoard, row, column))
            set((state) => ({ gameEnd: { ...state.gameEnd, isWon: true } }));
          else if (isTie(newBoard))
            set((state) => ({ gameEnd: { ...state.gameEnd, isTie: true } }));
          else state.changeTurn();
          break;
        }
      }

      return { board: newBoard };
    }),
  startGame: (value: 'human') => set({ isStarted: value }),
  updatePlayerName: (player: "one" | "two", name: string) => {
    set((state) => {
      if (player === "one")
        return { playerOne: { ...state.playerOne, name } };
      if (player === "two")
        return { playerTwo: { ...state.playerTwo, name } };

      return state;
    });
  },
}));

const checkWin = (board: string[][], row: number, column: number) => {
  const player = board[row][column];
  const rowLength = board.length;
  const columnLength = board[0].length;

  // vertical
  if (
    row + 3 < rowLength &&
    board[row + 1][column] === player &&
    board[row + 2][column] === player &&
    board[row + 3][column] === player
  ) {
    return true;
  }

  // horizontal
  let count = 1;
  let right = false;
  let left = false;
  for (let i = 1; i <= 3; i++) {
    if (
      column + i < columnLength &&
      board[row][column + i] === player &&
      !right
    )
      count++;
    else right = true;
    if (column - i >= 0 && board[row][column - i] === player && !left) count++;
    else left = true;
  }

  if (count >= 4) return true;

  // left diagonal
  count = 1;
  right = false;
  left = false;
  for (let i = 1; i <= 3; i++) {
    if (
      column + i < columnLength &&
      row + i < rowLength &&
      board[row + i][column + i] === player &&
      !right
    )
      count++;
    else right = true;
    if (
      column - i >= 0 &&
      row - i >= 0 &&
      board[row - i][column - i] === player &&
      !left
    )
      count++;
    else left = true;
  }

  if (count >= 4) return true;

  // right diagonal
  count = 1;
  right = false;
  left = false;
  for (let i = 1; i <= 3; i++) {
    if (
      column + i < columnLength &&
      row - i >= 0 &&
      board[row - i][column + i] === player &&
      !right
    )
      count++;
    else right = true;
    if (
      column - i >= 0 &&
      row + i < rowLength &&
      board[row + i][column - i] === player &&
      !left
    )
      count++;
    else left = true;
  }

  if (count >= 4) return true;

  return false;
};

const isTie = (board: string[][]) => {
  return board.every((row) => row.every((cell) => cell !== ""));
};

export default useGameStore;
