import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getMe = async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, getMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
