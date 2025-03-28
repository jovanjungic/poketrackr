import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register, isRegistering } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    await register({ email, username, password });
  };

  return (
    <div className="hero-bg h-[96vh] text-gray-900">
      <div className="mx-10 flex flex-col md:flex-row max-w-4xl h-screen justify-evenly items-center ">
        <div className="flex items-center justify-center">
          <div className="w-[75vw] md:w-md rounded-lg bg-white/90 p-8 shadow-md">
            <h2 className="text-2xl font-semibold">Register</h2>
            <p className="mt-2 text-sm text-gray-600">Register your account.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="email"
                  className="text-gray-900 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="username"
                  className="text-gray-900 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="text-gray-900 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-black px-4 py-2 text-white font-semibold hover:bg-gray-400 hover:text-gray-900 hover:cursor-pointer"
              >
                {isRegistering ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-gray-900 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col w-1/2 p-4">
          <h2 className="text-2xl font-bold text-gray-900">PokeTrackr</h2>
          <div className="divider divider-neutral h-0"></div>
          <p>
            PokeTrackr is a web application that allows you to track your
            Pokemon collection. It is built as a simple project to learn
            FullStack development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
