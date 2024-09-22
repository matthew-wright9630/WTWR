import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleChangeProfileClick, handleLogout }) {
  const user = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          src={user.avatar}
          alt="Proflie Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__name">{user.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          type="button"
          onClick={handleChangeProfileClick}
          className="sidebar__change-info"
        >
          Change profile data
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar__logout"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
