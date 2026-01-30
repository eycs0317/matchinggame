import "./Puzzle.css";

import React, { useState, useEffect } from "react";
import "./Puzzle.css";

// Use a high-quality square image for the best effect
const IMG_URL = "/milktchi.png";

export default function Puzzle() {
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null); // Index of first clicked tile

  // Initialize the game
  useEffect(() => {
    shuffleTiles();
  }, []);

  const shuffleTiles = () => {
    // Create 9 pieces
    const newTiles = [...Array(9)].map((_, index) => ({
      initialId: index, // This tells the CSS which part of the image to show
    }));

    // Randomize the order
    newTiles.sort(() => Math.random() - 0.5);
    setTiles(newTiles);
    setSelectedTile(null);
  };

  const handleTileClick = (index) => {
    if (selectedTile === null) {
      // First tile clicked
      setSelectedTile(index);
    } else {
      // Second tile clicked - Swap them
      const newTiles = [...tiles];
      const temp = newTiles[selectedTile];
      newTiles[selectedTile] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedTile(null);

      // Check for win
      const isWin = newTiles.every((tile, i) => tile.initialId === i);
      if (isWin) {
        setTimeout(() => alert("You fixed the image! 🎉"), 100);
      }
    }
  };

  return (
    <div className='puzzle-container'>
      <h1 className='text-3xl font-bold mb-4'>Image Swap Puzzle</h1>

      <div className='puzzle-board'>
        {tiles.map((tile, index) => {
          // Calculate background position based on the initialId
          const x = (tile.initialId % 3) * 100;
          const y = Math.floor(tile.initialId / 3) * 100;

          return (
            <div
              key={index}
              onClick={() => handleTileClick(index)}
              className={`puzzle-tile ${selectedTile === index ? "tile-selected" : ""}`}
              style={{
                backgroundImage: `url(${IMG_URL})`,
                backgroundPosition: `-${x}px -${y}px`,
                backgroundSize: "300px 300px",
              }}
            />
          );
        })}
      </div>

      <button
        onClick={shuffleTiles}
        className='mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors'
      >
        Shuffle Puzzle
      </button>
    </div>
  );
}
