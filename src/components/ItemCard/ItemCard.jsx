import { useContext, useState } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onItemClick, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes && item.likes.includes(item._id);

  const itemLikeButtonClassName = `...`;

  function handleLike() {
    handleCardLike({ id: item._id, isLiked });
  }

  return (
    <div className="clothing__item">
      <div className="clothing__item__header">
        <h2 className="clothing__title">{item.name}</h2>
        <button
          type="button"
          onClick={handleLike}
          className={`${
            currentUser?._id
              ? "clothing__like-btn"
              : "clothing__like-btn_hidden"
          } ${!isLiked ? "" : "clothing__like-btn_liked"}`}
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
