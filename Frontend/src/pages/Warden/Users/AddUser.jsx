import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";
import { ArrowLeft } from "lucide-react";

export default function AddUser() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "STUDENT",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/accounts/register/", form);
      navigate("/warden/users");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-12 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">
          {/* Back Button */}
          <button
            onClick={() => navigate("/warden/users")}
            className="flex items-center gap-2 text-gray-100 mb-6 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft size={20} />
            Back to Users
          </button>

          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 text-center">
            Add New User
          </h2>

          {error && (
            <div className="text-red-500 text-sm mb-4 bg-red-900 bg-opacity-30 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-text"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-text"
              required
            />
            <input
              name="first_name"
              placeholder="First name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-text"
              required
            />
            <input
              name="last_name"
              placeholder="Last name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-text"
              required
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              <option value="STUDENT">Student</option>
              <option value="WARDEN">Warden</option>
            </select>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-text"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
