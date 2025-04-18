import React from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(e);
      toast.error(e);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded w-full px-3 py-2 border border-gray-700"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
            ></input>
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded w-full px-3 py-2 border border-gray-700"
              type="password"
              placeholder="your password"
              autoComplete="current-password"
              required
            ></input>
          </div>
          <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
