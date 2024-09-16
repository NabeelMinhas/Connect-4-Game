import useGameStore from "../store/GameStore";
import Board from "./Board";

const GameBoard = () => {
  const {
    board,
    playerOneTurn,
    playerOne,
    playerTwo,
    handleColumnClick,
    gameEnd,
    resetGame,
  } = useGameStore((state) => state);

  const isGameEnded = gameEnd.isTie || gameEnd.isWon;

  const renderPlayerTurn = () => {
    const playerName = playerOneTurn ? playerOne.name : playerTwo.name;
    const color = playerOneTurn ? "bg-blue-500" : "bg-red-500";
    return (
      <div className="flex justify-center items-center gap-2">
        <p>{playerName}'s Turn</p>
        <div className={`rounded-full w-6 h-6 ${color}`}></div>
      </div>
    );
  };

  const renderGameStatus = () => {
    if (gameEnd.isTie) {
      return <p>Tie Game</p>;
    } else if (gameEnd.isWon) {
      return <p>{playerOneTurn ? playerOne.name : playerTwo.name} Won</p>;
    } else {
      return renderPlayerTurn();
    }
  };
  return (
    <>
      {renderGameStatus()}
      <Board board={board} onClick={handleColumnClick} />
      <div className="h-12">
        {isGameEnded && (
          <button className="bg-black text-white" onClick={resetGame}>
            Reset Game
          </button>
        )}
      </div>
    </>
  );
};

export default GameBoard;
