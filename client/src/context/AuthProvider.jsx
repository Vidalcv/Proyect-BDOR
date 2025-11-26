import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Derivar el rol desde el usuario (maestro / alumno)
  const userRole = user?.departamento?.toLowerCase() || null;

  const login = ({ user: u, token: t }) => {
    setUser(u);
    setToken(t);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        userRole,       // 👈 IMPORTANTE
        isAuthenticated: !!user, // 👈 también lo necesita AppRoutes
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
