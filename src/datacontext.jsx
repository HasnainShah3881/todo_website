import { createContext, useState } from "react";

// Context name should be PascalCase
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState("");

  return (
    <DataContext.Provider value={{ openSignup, setOpenSignup, openLogin, setOpenLogin, user, setUser }}>
      {children}
    </DataContext.Provider>
  );
};
