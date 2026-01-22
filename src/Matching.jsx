import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import music from "./assets/victory.mp3";
import endMusic from "./assets/finish.wav";
import wrongBeep from "./assets/wrong.mp3";
// import "./matching.css";
import Card from "./Card.jsx";
// import Profile from "../Profile/Profile";

//Name & pic link
const images2 = [
  {
    name: "Marutchi",
    image: "marutchi.png",
    flip: false,
  },
  {
    name: "Tamatchi",
    image: "tamatchi.png",
    flip: false,
  },
  {
    name: "Mametchi",
    image: "mametchi.png",
    flip: false,
  },
  {
    name: "Kuchipatchi",
    image: "kuchipatchi.png",
    flip: false,
  },
  {
    name: "Mimitchi",
    image: "mimitchi.png",
    flip: false,
  },
  {
    name: "Pochitchi",
    image: "pochitchi.png",
    flip: false,
  },
  {
    name: "Memetchi",
    image: "memetchi.png",
    flip: false,
  },
  {
    name: "Furawatchi",
    image: "furawatchi.png",
    flip: false,
  },
  {
    name: "Weeptchi",
    image: "weeptchi.png",
    flip: false,
  },
  {
    name: "Gozarutchi",
    image: "gozarutchi.png",
    flip: false,
  },
  {
    name: "Milktchi",
    image: "milktchi.png",
    flip: false,
  },
  {
    name: "Babytchi",
    image: "/babytchi.png",
    flip: false,
  },
];

const sound = new Howl({
  src: [music],
  volume: 0.2,
});

const endSound = new Howl({
  src: [endMusic],
  volume: 0.2,
});

const errSound = new Howl({
  src: [wrongBeep],
  volume: 0.1,
});

function Matching({ userGameStatus }) {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!! When the game is over gamOver will set to true
  const [randomImageLink, setRandomImageLink] = useState([]);
  const [userPick, setUserPick] = useState([]);
  const [move, setMove] = useState(0);
  const [score, setScore] = useState(0); // 6 = win

  // Only render for the first time
  useEffect(() => {
    // console.log('---------only run for the fist time---------')
    randomCard();
  }, []);

  // watch userPick
  useEffect(() => {
    //  console.log('Run when userPick change')
    //when the userPick state change run the checkBothCard function
    checkBothCards();
  }, [userPick]);

  useEffect(() => {
    checkGameOver();
  }, [score]);

  const checkGameOver = () => {
    if (score === 6) {
      endSound.play();
      setGameOver(true);
      userGameStatus(true);
      // randomCard()
      //random and flip the card back
    }
  };

  const randomCard = () => {
    const pickSix = [...images2].sort(() => Math.random() - 0.5).slice(0, 6);

    const pairs = [...pickSix, ...pickSix];

    // 2. Shuffle the pairs and reset the 'flip' status
    // We use the spread operator {...item} to create fresh object references
    const shuffled = pairs
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, id: index, flip: false }));

    setRandomImageLink(shuffled);
  };

  const handleOnClick = (index, name) => {
    // if image is already open - just return
    if (randomImageLink[index].flip) {
      return;
    }

    //try to use the move state to see if it work
    if (move < 2) {
      setMove((prev) => prev + 1);

      //Set the card open
      setRandomImageLink((prevState) => {
        return prevState.map((item, idx) => {
          if (idx === index) {
            return { ...item, flip: true };
          } else {
            return item;
          }
        });
      });
      if (userPick.length <= 2) {
        setUserPick((prev) => [...prev, { index: index, name: name }]);
      }
    } else {
      setMove(0);
    }
  };

  //check 2 user pick card
  const checkBothCards = () => {
    if (userPick.length > 2) {
      // console.log('userpick length are more then 2')
      return;
    }
    if (userPick.length === 2) {
      //check to see if both card name are the same
      if (userPick[0].name === userPick[1].name) {
        // console.log('user picked the right card')
        sound.play();
        setScore((prev) => (prev += 1));
        setUserPick([]);
        setMove(0);
      } else {
        // close both card
        errSound.play();
        setTimeout(() => {
          console.log("settimeout runnnnnninnnnngggg");
          setRandomImageLink((prevState) => {
            var index1 = userPick[0].index;
            var index2 = userPick[1].index;
            prevState[index1].flip = false;
            prevState[index2].flip = false;
            return [...prevState];
          });
          setUserPick([]);
          setMove(0);
        }, 400);
      }
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-slate-100 p-6 gap-6'>
      <h1 className='text-4xl font-bold text-slate-800 mb-5'>
        Let's play a matching game!
      </h1>

      {/* Use a consistent gap and define columns clearly */}
      <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-5 max-w-5xl'>
        {randomImageLink.map((item, index) => (
          <Card
            key={index}
            item={item}
            name={item.name}
            image={item.image}
            flip={item.flip}
            index={index}
            handleOnClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Matching;
