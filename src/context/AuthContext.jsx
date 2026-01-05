import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  // Mock credentials
  const MOCK_EMAIL = "sri@gmail.com";
  const MOCK_PASSWORD = "Sri@123";

  const login = (email, password) => {
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      localStorage.setItem("isAuth", "true");
      setIsAuth(true);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("isAuth");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
