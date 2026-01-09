import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function LoginSignup() {
  const mylocation = useLocation();
  const [amIInLoginRoute, setAmIInLoginRoute] = useState(false);
  useEffect(() => {
    setAmIInLoginRoute(mylocation.pathname.includes("login"));
  }, [mylocation.pathname]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div class="min-h-screen grid place-items-center">
        <div class="w-full max-w-md bg-white border rounded-2xl shadow-lg p-8">
          <div class="text-center mb-6">
            <h1 class="text-3xl font-extrabold">
              Review<span class="text-indigo-600">Genius</span> AI
            </h1>
            <p class="text-gray-500 mt-1">
              {amIInLoginRoute
                ? "Sign in to study smarter"
                : "Sign up to study smarter"}
            </p>
          </div>
          <form class="space-y-4">
            {!amIInLoginRoute && (
              <div>
                <label class="text-sm font-medium text-gray-600">
                  Fullname
                </label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  class="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            <div>
              <label class="text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                class="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                class="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              {amIInLoginRoute ? "Log In" : "Sign Up"}
            </button>
          </form>

          <p class="text-center text-sm text-gray-600 mt-6">
            {amIInLoginRoute
              ? "Don’t have an account?"
              : "Already have an account?"}
            <a
              href={amIInLoginRoute ? "/signup" : "/login"}
              class="text-indigo-600 font-semibold hover:underline"
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
