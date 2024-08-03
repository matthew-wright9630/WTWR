import "./ItemCard.css";

function ItemCard({ item, onItemClick }) {
  return (
    <div className="clothing__item">
      <h2 className="clothing__title">{item.name}</h2>
      <img
        src={item.link}
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
