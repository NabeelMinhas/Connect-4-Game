import useGameStore from "../store/GameStore";

const SelectOpponent = () => {
  const { setOpponent } = useGameStore((state) => state);

  const clickHandler = () => {
    setOpponent("human");
  }

  return (
    <>
      <button onClick={() => clickHandler()}>Play with Human</button>
    </>
  )
}

export default SelectOpponent;
