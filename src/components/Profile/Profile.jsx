import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleAddButtonClick, handleItemClick, clothingItems, handleChangeProfileClick, handleLogout, handleCardLike }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar 
          handleChangeProfileClick={handleChangeProfileClick}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleAddButtonClick={handleAddButtonClick}
          handleItemClick={handleItemClick}
          clothingItems={clothingItems}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
