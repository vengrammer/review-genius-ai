import { Loader } from "lucide-react";
import { React, createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const TOKEN_KEY = "user_token";

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const decoded = decodeToken(token);
    if (!decoded || decoded.exp * 1000 < Date.now()) {
      setToken(null);
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
    }

    setLoading(false);
  }, [token]);

  const login = (jwt) => {
    localStorage.setItem(TOKEN_KEY, jwt);
    setToken(jwt);
    setUser(decodeToken(jwt));
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

   if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center dark:bg-zinc-950">
        <Loader
          size={50}
          className="animate-spin text-violet-500"
        />
      </div>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
