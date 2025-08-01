import { Children, createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [opensignup, setopensignup] = useState(false);
   const [openLogin, setopenLogin] = useState(false);
   const [User, setUser] = useState("");
 
  return (
    <DataContext.Provider value={{opensignup, setopensignup, openLogin, setopenLogin,User, setUser}}>
      {children}
    </DataContext.Provider>
  );
};
