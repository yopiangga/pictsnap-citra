import { createContext, useContext, useEffect, useState } from "react";
import { GetUser } from "services/AuthServices";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const apiPy = "http://aisoru.com:5000";
  const apiPictSnap = "https://api.pictsnap.simhive.com/api";

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("You are on the browser");
      // 👉️ can use localStorage here
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        GetUser(localStorage.getItem("token"), (res) => {
          setUser(res);
        });
        setLoading(false);
      }
    } else {
      console.log("You are on the server");
      // 👉️ can't use localStorage
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        apiPy,
        apiPictSnap,
        user,
        setUser,
        token,
        setToken,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
