import React from "react";
import "./card.css";

function Card({ index, name, image, flip, handleOnClick }) {
  // const [flip, setFlip] = useState(false)
  const handleImageClick = (e) => {
    handleOnClick(index, name);
  };
  // console.log("image", image, "flip", flip);
  return (
    <div onClick={handleImageClick} className=''>
      {flip ? (
        <img
          src={image}
          alt={name}
          className='w-full h-full object-contain'
          name={name}
          index={index}
        ></img>
      ) : (
        <img
          src='./card.png'
          alt={name}
          className='w-full h-full object-contain'
        ></img>
      )}
    </div>
  );
}

export default Card;
