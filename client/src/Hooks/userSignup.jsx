import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext.jsx";
import { message } from "antd";

const useUserSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      setError(null);
      setLoading(true);
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      const exists = users.find((u) => u.email === values.email);
      if (exists) throw new Error("User already exists! Try logging in.");
  
      const newUser = {
        id: Date.now(), 
        name: values.name,
        email: values.email,
        password: values.password,
      };
  
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser)); 
  
      message.success("Account created successfully!");
      login(newUser);
    } catch (error) {
      message.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };  

  return { loading, error, registerUser };
};

export default useUserSignup;
