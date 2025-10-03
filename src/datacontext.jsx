import { createContext, useState } from "react";

// Context name should be PascalCase
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [openSignup, setopenSignup] = useState(false);
  const [openLogin, setopenLogin] = useState(false);
  const [Profile, setProfile] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <DataContext.Provider
      value={{
        openSignup,
        setopenSignup,
        openLogin,
        setopenLogin,
        Profile,
        setProfile,
        todos,
        setTodos,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
