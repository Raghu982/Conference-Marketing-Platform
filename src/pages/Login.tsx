import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
  const success =
    await login(
      email,
      password
    );

  if (success) {
    navigate("/");
  } else {
    alert(
      "Invalid credentials"
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="bg-slate-800 p-8 rounded-xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6">
          Conference CRM Login
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded bg-slate-700 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded bg-slate-700 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 py-3 rounded font-bold"
        >
          Login
        </button>

        <div className="mt-4 text-sm text-slate-400">
          admin@conferencecrm.com
          <br />
          password123
        </div>
      </div>
    </div>
  );
}