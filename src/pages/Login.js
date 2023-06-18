import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { mutate: logFun } = useMutation({
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      if (localStorage.getItem("token")) {
        setUser(true);
        navigate("/");
      }
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    logFun();
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center absolute inset-0 z-[-1]">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-3xl text-white font-semibold mb-6">Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
