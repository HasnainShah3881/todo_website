import { createContext, useState } from "react";

// Context name should be PascalCase
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [User, setUser] = useState("");

  return (
    <DataContext.Provider value={{ openSignup, setOpenSignup, openLogin, setOpenLogin, User, setUser }}>
      {children}
    </DataContext.Provider>
  );
};
