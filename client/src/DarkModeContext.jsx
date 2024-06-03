import { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

// eslint-disable-next-line react/prop-types
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const preference = localStorage.getItem("darkMode");
    setDarkMode(preference === "true");
  }, []);

  const toggleDarkMode = () => {
    // Toggle dark mode and save preference to localStorage
    setDarkMode((prevDarkMode) => {
      localStorage.setItem("darkMode", JSON.stringify(!prevDarkMode));
      return !prevDarkMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
