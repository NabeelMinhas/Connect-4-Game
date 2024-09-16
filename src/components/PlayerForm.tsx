import { useState } from "react";
import useGameStore from "../store/GameStore";

const PlayerForm = () => {
  const [formData, setFormData] = useState({
    playerOneName: "",
    playerTwoName: "",
  });

  const { updatePlayerName, startGame } = useGameStore((state) => state)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.playerOneName && formData.playerTwoName) {
      updatePlayerName("one", formData.playerOneName);
      updatePlayerName("two", formData.playerTwoName);
      startGame("human");
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        name="playerOne"
        placeholder="Player 1 Name"
        className="p-2"
        required={true}
        onChange={(e) =>
          setFormData({ ...formData, playerOneName: e.target.value })
        }
      />
      <input
        type="text"
        name="playerTwo"
        className="p-2"
        placeholder="Player 2 Name"
        required={true}
        onChange={(e) =>
          setFormData({ ...formData, playerTwoName: e.target.value })
        }
      />
      <input
        type="submit"
        className="bg-black hover:bg-gray-700 text-white rounded-md px-2 py-2 cursor-pointer"
      />
    </form>
  );
};

export default PlayerForm;
