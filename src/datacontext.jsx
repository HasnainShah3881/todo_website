import { createContext, useState } from "react";

// Context name should be PascalCase
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [openSignup, setopenSignup] = useState(false);
  const [openLogin, setopenLogin] = useState(false);
  const [User, setUser] = useState("");

  return (
    <DataContext.Provider value={{ openSignup, setopenSignup, openLogin, setopenLogin, User, setUser }}>
      {children}
    </DataContext.Provider>
  );
};
