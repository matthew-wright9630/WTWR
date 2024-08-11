import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleAddButtonClick, handleItemClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleAddButtonClick={handleAddButtonClick}
          handleItemClick={handleItemClick}
        />
      </section>
    </div>
  );
}

export default Profile;
