import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.username, form.password);
    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "WARDEN") navigate("/warden/dashboard");
      else navigate("/student/dashboard");
    } else setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-gray-100 px-6">
      {/* App Title */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-lg">
          Hostel Management System
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Sign in to continue to your dashboard
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-pink-400">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Hostel Management System. All rights reserved.
      </p>
    </div>
  );
}
