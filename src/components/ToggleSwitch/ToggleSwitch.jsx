import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function ToggleSwitch() {
  const currentTemp = useContext(CurrentTemperatureUnitContext);
  return (
    <div className="temp">
      <input
        type="checkbox"
        className="temp__switch__checkbox"
        id="temp-switch"
        onClick={currentTemp.handleToggleSwitchChange}
      />
      <label htmlFor="temp-switch" className="temp__switch__label">
        <p className="temp__swtich__text temp__switch__text_fahrenheit">F</p>
        <p className="temp__swtich__text temp__switch__text_celcius">C</p>
        <span className={`temp__switch__button`} />
      </label>
    </div>
  );
}

export default ToggleSwitch;
