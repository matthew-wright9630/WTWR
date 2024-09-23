import { useState } from "react";
import "./ItemCard.css";

function ItemCard({ item, onItemClick, handleCardLike }) {
  // const [isLiked, setIsLiked] = useState(false);
  const isLiked = item.likes.some(id => id === currentUser._id);

// Create a variable which you then set in `className` for the like button
const itemLikeButtonClassName = `...`;

  function handleLike() {
    console.log("handleLike", item._id);
    handleCardLike(item._id, true);
  }

  return (
    <div className="clothing__item">
      <div className="clothing__item__header">
        <h2 className="clothing__title">{item.name}</h2>
        <button
          type="button"
          onClick={handleLike}
          className={`clothing__like-btn ${
            isLiked ? "clothing__like-btn_liked" : "clothing__like-btn_disliked"
          }`}
        ></button>
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="clothing__image"
        onClick={() => {
          onItemClick(item);
        }}
      />
    </div>
  );
}

export default ItemCard;
