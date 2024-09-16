import "./App.css";
import GameBoard from "./components/GameBoard";
import PlayerForm from "./components/PlayerForm";
import SelectOpponent from "./components/SelectOpponnent";
import useGameStore from "./store/GameStore";

function App() {
  const { isStarted, opponent } = useGameStore((state) => state);

  return (
    <>
      <div className="space-y-4 h-full">
        <h1>Connect Four Game</h1>
        {!opponent ? (
          <SelectOpponent />
        ) : isStarted ? (
          <GameBoard />
        ) : (
          <PlayerForm />
        )}
      </div>
    </>
  );
}

export default App;
