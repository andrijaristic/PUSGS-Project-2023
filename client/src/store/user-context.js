import React, { useState, useCallback, useEffect } from "react";
import {
  UpdateUser,
  GetUserInformation,
  GetUserAvatar,
} from "../services/UserServices";

const UserContext = React.createContext({
  user: {},
  onUpdate: () => {},
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});

  const getUserInfo = useCallback(async () => {
    const data = await GetUserInformation();
    if (data.status !== 200) {
      //...
      return;
    }

    const image = await GetUserAvatar(data.userData.id);
    if (image.status !== 200) {
      //...
      return;
    }

    const userInformation = {
      ...data.userData,
      image: image.imageSrc,
    };

    console.log(userInformation);
    setUser(userInformation);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const updateHandler = useCallback(async (updateData) => {
    const data = await UpdateUser(updateData);
    if (data.status !== 200) {
      //
      return;
    }
  }, []);

  const contextObject = {
    user,
    onUpdate: updateHandler,
  };

  return (
    <UserContext.Provider value={contextObject}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
