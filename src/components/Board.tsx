import arrowSvg from "../assets/arrow.svg";

const Board = ({
  board,
  onClick,
}: {
  board: string[][];
  onClick: (column: number) => void;
}) => {
  const renderCell = (row: number, column: number) => {
    let color = "bg-white";
    if (board[row][column]) {
      color = board[row][column] === "X" ? "bg-blue-500" : "bg-red-500";
    }
    return (
      <div
        key={`${row}-${column}`}
        className={`w-16 h-16 border border-black rounded-full my-2 mx-1 ${color}`}
      ></div>
    );
  };

  const renderRow = (row: number) => {
    return (
      <div key={row} className="flex">
        {board[row].map((_cell, index) => renderCell(row, index))}
      </div>
    );
  };

  const renderClickArrow = (column: number) => {
    return (
      <div
        className="rotate-180 hover:text-blue-400 cursor-pointer"
        onClick={() => onClick(column)}
      >
       <img src={arrowSvg} alt="arrow icon" />
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-around">
        {board[0].map((_cell, index) => renderClickArrow(index))}
      </div>
      <div className="w-fit bg-green-400 rounded-md">
        {board.map((_row, index) => renderRow(index))}
      </div>
    </div>
  );
};

export default Board;
