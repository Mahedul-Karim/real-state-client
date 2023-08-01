import { createContext, useContext, useState } from "react";

const Context = createContext();

const ContextProvider = function ({ children }) {
  const [userDetails, setUserDetails] = useState({
    user:null,
    favourites: [],
    bookings: [],
    token: null,
    isLoggedIn:false
  });

  return (
    <Context.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobal = function () {
  return useContext(Context);
};
export default ContextProvider;
