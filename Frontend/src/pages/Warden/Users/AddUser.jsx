import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New User</h2>

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
