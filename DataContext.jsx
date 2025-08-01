import { createContext, useState } from "react";

export const datacontext = createContext();


export const DataProvider = ({ children }) => {
   const [opensignup, setopensignup] = useState(false);
   const [openLogin, setopenLogin] = useState(false);
   const [User, setUser] = useState("");
 
  return (
    <datacontext.Provider value={{opensignup, setopensignup, openLogin, setopenLogin,User, setUser}}>
      {children}
    </datacontext.Provider>
  );
};
