import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { message } from "antd";

const useUserLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find((u) => u.email === values.email);
      if (!user) throw new Error("User not found! Please register.");

      if (user.password !== values.password) {
        throw new Error("Incorrect password!");
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      message.success("Login successful!");
      login(user);
    } catch (error) {
      message.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return { loading, error, loginUser };
};

export default useUserLogin;