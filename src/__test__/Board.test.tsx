import { render, screen, fireEvent } from '@testing-library/react';
import Board from '../components/Board';
import '@testing-library/jest-dom';

jest.mock('../assets/arrow.svg', () => 'mocked-arrow.svg');

describe('Board component', () => {
  const mockOnClick = jest.fn();

  const renderComponent = (board: string[][]) => {
    render(<Board board={board} onClick={mockOnClick} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the board correctly', () => {
    const board = [
      ['X', 'O', 'X', 'X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X', 'X', 'O', 'X']      
    ];

    renderComponent(board);
    const cells = screen.getAllByTestId(/cell-/);
    expect(cells).toHaveLength(42);
  });

  test('renders correct cell colors for X and O', () => {
    const board = [
      ['X', '', '', '', '', '', ''],
      ['O', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];

    renderComponent(board);

    const cellX = screen.getByTestId('cell-0-0');
    expect(cellX).toHaveClass('bg-blue-500');

    const cellO = screen.getByTestId('cell-1-0');
    expect(cellO).toHaveClass('bg-red-500');

    const emptyCell = screen.getByTestId('cell-2-0');
    expect(emptyCell).toHaveClass('bg-white');
  });

  test('renders arrow icons correctly', () => {
    const board = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];

    renderComponent(board);

    const arrows = screen.getAllByRole('img', { name: 'arrow icon' });
    expect(arrows).toHaveLength(7); // One arrow per column
  });

  test('calls onClick with the correct column index when arrow is clicked', () => {
    const board = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];

    renderComponent(board);

    const arrows = screen.getAllByRole('img', { name: 'arrow icon' });

    fireEvent.click(arrows[3]); // Simulate a click on the 4th column arrow
    expect(mockOnClick).toHaveBeenCalledWith(3); // Ensure onClick is called with column 3

    fireEvent.click(arrows[5]); // Simulate a click on the 6th column arrow
    expect(mockOnClick).toHaveBeenCalledWith(5); // Ensure onClick is called with column 5
  });

  test('renders an empty board with default cell color (white)', () => {
    const emptyBoard = Array(6).fill(Array(7).fill('')); // Empty 6x7 board

    renderComponent(emptyBoard);

    const cells = screen.getAllByTestId(/cell-/);
    cells.forEach((cell) => {
      expect(cell).toHaveClass('bg-white'); // Ensure all cells are white initially
    });
  });

  test('updates the cell colors when the board state changes', () => {
    const initialBoard = [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];

    const updatedBoard = [
      ['X', '', '', '', '', '', ''],
      ['O', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '']
    ];

    const { rerender } = render(<Board board={initialBoard} onClick={mockOnClick} />);

    // Re-render with updated board state
    rerender(<Board board={updatedBoard} onClick={mockOnClick} />);

    const cellX = screen.getByTestId('cell-0-0');
    expect(cellX).toHaveClass('bg-blue-500'); // X -> blue

    const cellO = screen.getByTestId('cell-1-0');
    expect(cellO).toHaveClass('bg-red-500'); // O -> red
  });
});
