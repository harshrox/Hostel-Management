import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { setTokens, clearTokens, getAccessToken } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(false);

  // ---- Login ----
  const login = async (username, password) => {
    try {
      setLoading(true);
      const tokenRes = await api.post("/accounts/token/", { username, password });
      setTokens(tokenRes.data.access, tokenRes.data.refresh);

      const profileRes = await api.get("/accounts/profile/");
      setUser(profileRes.data);
      localStorage.setItem("user", JSON.stringify(profileRes.data));

      return true;
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ---- Logout ----
  const logout = () => {
    clearTokens();
    setUser(null);
  };

  // ---- Check token validity on reload ----
  useEffect(() => {
    const token = getAccessToken();
    if (token && !user) {
      api
        .get("/accounts/profile/")
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
