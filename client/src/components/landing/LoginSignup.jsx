import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { EyeClosed } from "lucide-react";
import { Eye } from "lucide-react";
import axios from "axios";

function LoginSignup() {
  const mylocation = useLocation();
  const server_url = import.meta.env.VITE_BACKEND_URL;
  const [amIInLoginRoute, setAmIInLoginRoute] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setAmIInLoginRoute(mylocation.pathname.includes("login"));
  }, [mylocation.pathname]);

  function handleSubmit(e) {
    e.preventDefault();
    if (amIInLoginRoute) {
      console.log("logic");
    } else {
      try {
        const response = axios.post(`${server_url}/api/auth/register`, {
          fullname: fullname,
          username: username,
          password: password,
        });
        console.log("Signup response:", response.data.message);
      } catch (error) {
        console.log("Error during signup:", error);
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-h-screen grid place-items-center">
        <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold">
              Review<span className="text-indigo-600">Genius</span> AI
            </h1>
            <p className="text-gray-500 mt-1">
              {amIInLoginRoute
                ? "Sign in to study smarter"
                : "Sign up to study smarter"}
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!amIInLoginRoute && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Fullname
                </label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Password</label>
              <div className="relative mt-1 ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosed className="absolute right-3 top-3 cursor-pointer" />
                  ) : (
                    <Eye className="absolute right-3 top-3 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              {amIInLoginRoute ? "Log In" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {amIInLoginRoute
              ? "Don’t have an account?"
              : "Already have an account?"}
            <a
              href={amIInLoginRoute ? "/signup" : "/login"}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {amIInLoginRoute ? "Sign up" : "Sign in"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
