import { createContext, useContext, useState } from "react";
import axios from "../axios";
import PropTypes from "prop-types";

const AuthContent = createContext({
  user: null,
  setUser: () => {},
  csrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const setUser = (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      console.log("test logout");
    }

    _setUser(user);
  };

  // csrf token generation for guest methods
  const csrfToken = async () => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    return true;
  };

  return (
    <AuthContent.Provider value={{ user, setUser, csrfToken }}>
      {children}
    </AuthContent.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export const useAuth = () => {
  return useContext(AuthContent);
};
