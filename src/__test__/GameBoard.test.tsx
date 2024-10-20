import { render, screen, fireEvent } from '@testing-library/react';
import GameBoard from '../components/GameBoard';
import useGameStore from '../store/GameStore';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

jest.mock('../assets/arrow.svg', () => 'mocked-arrow.svg');

// Helper function to reset Zustand store
const resetGameStore = () => {
  const initialState = {
    playerOne: { name: 'Player 1' },
    playerTwo: { name: 'Player 2' },
    board: [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ],
    playerOneTurn: true,
    gameEnd: { isTie: false, isWon: false },
    isStarted: null,
    opponent: null,
  };
  act(() => {
    useGameStore.setState(initialState);
  });
};

describe('GameBoard component', () => {
    beforeEach(() => {
      resetGameStore(); // Reset store before each test
    }
  );

  test('renders tie game message when the game is tied', () => {
    act(() => {
      useGameStore.setState((state) => ({
        ...state,
        gameEnd: { ...state.gameEnd, isTie: true },
      }));
    });

    render(<GameBoard />);

    // Check if the tie game message is rendered
    const tieMessage = screen.getByText('Tie Game');
    expect(tieMessage).toBeInTheDocument();
  });

  test('renders win message when a player wins', () => {
    act(() => {
      useGameStore.setState((state) => ({
        ...state,
        gameEnd: { ...state.gameEnd, isWon: true },
      }));
    });

    render(<GameBoard />);

    // Check if the win message is rendered correctly for Player 1
    const winMessage = screen.getByText('Player 1 Won');
    expect(winMessage).toBeInTheDocument();
  });

  test('renders the reset button and triggers reset when clicked', () => {
    act(() => {
      useGameStore.setState((state) => ({
        ...state,
        gameEnd: { ...state.gameEnd, isTie: true },
      }));
    });

    render(<GameBoard />);

    // Check if the reset button is rendered
    const resetButton = screen.getByRole('button', { name: 'Reset Game' });
    expect(resetButton).toBeInTheDocument();

    // Simulate a click on the reset button
    fireEvent.click(resetButton);

    // Verify that the board is reset after clicking the reset button
    const cells = screen.getAllByRole('presentation');
    cells.forEach((cell) => {
      expect(cell).toBeEmptyDOMElement(); // The board cells should be empty after reset
    });
  });
});
