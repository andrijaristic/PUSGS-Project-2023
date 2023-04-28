import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Login, Register } from "../services/UserServices";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: {},
  token: null,
  onLogin: () => {},
  onLogout: () => {},
  onRegister: () => {},
});

const initToken = localStorage.getItem("token");
const initUser = localStorage.getItem("user");

export const AuthContextProvider = (props) => {
  const nav = useNavigate();
  const [token, setToken] = useState(initToken);
  const [user, setUser] = useState(initToken !== null && JSON.parse(initUser));

  const isLoggedIn = token !== null;

  const loginHandler = useCallback(
    async (loginData) => {
      const data = await Login(loginData);
      if (data.status !== 200) {
        //
        return false;
      }

      const newUser = {
        name: data.userData.name,
        role: data.userData.role,
      };

      setToken(data.userData.token);
      setUser(newUser);

      localStorage.setItem("token", data.userData.token);
      localStorage.setItem("user", JSON.stringify(newUser));

      nav("/profile");
    },
    [nav]
  );

  const logoutHandler = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const registerHandler = useCallback(async (registerData) => {
    const data = await Register(registerData);
    if (data.status !== 200) {
      //
      return;
    }
  }, []);

  const contextObject = {
    isLoggedIn,
    user,
    token,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    onRegister: registerHandler,
  };

  return (
    <AuthContext.Provider value={contextObject}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
