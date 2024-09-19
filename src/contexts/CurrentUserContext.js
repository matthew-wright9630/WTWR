import { React } from "react";
import { createContext } from "react";

const CurrentUserContext = createContext({
    CurrentUserContext: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentUserContext };