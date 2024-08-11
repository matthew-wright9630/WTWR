import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
    return (
        <div className="sidebar">
        <img src={avatar} alt="Proflie Avatar" className="sidebar__avatar" />
        <p className="sidebar__name">Terrence Tegene</p>
      </div>
    );
}

export default SideBar;