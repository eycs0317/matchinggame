import Matching from "./Matching.jsx";
import Puzzle from "./Puzzle.jsx";
import { useState } from "react";
import "./App.css";
function App() {
  const [switchGame, setSwitchGame] = useState(false);
  return (
    <>
      <p className='text-6xl font-bold text-center p-4'>Matching Game</p>
      <div className='flex justify-center space-x-4 mb-4'>
        <button onClick={() => setSwitchGame(!switchGame)}>
          Matching Game
        </button>{" "}
        {/* <Matching /> */}
        <button onClick={() => setSwitchGame(!switchGame)}>Puzzle Game</button>
      </div>

      {switchGame ? <Matching /> : <Puzzle />}
    </>
  );
}

export default App;
