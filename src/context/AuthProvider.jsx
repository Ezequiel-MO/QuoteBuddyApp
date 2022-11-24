import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../axios/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      if (token) {
        try {
          const { data } = await baseAPI.get("v1/users/profile", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setAuth(data);
          navigate("/app");
        } catch (error) {
          setAuth({});
        } finally {
          setLoading(false);
        }
      }
    };
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContext.Provider value={{ setAuth, auth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
