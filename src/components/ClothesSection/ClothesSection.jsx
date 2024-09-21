import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  handleAddButtonClick,
  handleItemClick,
  clothingItems,
}) {
  const user = useContext(CurrentUserContext);
  return (
    <div className="clothing-section">
      <div className="clothing-section__header">
        <h2 className="clothing-section__title">Your items</h2>
        <button
          type="button"
          onClick={handleAddButtonClick}
          className="clothing-section__add-btn"
        >
          + Add new
        </button>
      </div>
      <div className="clothing-section__items">
        <ul className="clothing__list clothing-section__list">
          {clothingItems.filter((item) => {
            return item.isOwner === user._id;
          }).map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onItemClick={handleItemClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
