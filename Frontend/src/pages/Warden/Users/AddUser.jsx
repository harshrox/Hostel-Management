import { useState } from "react";
import api from "../../../services/api";
import Navbar from "../../../components/Layout/Navbar";
import { useNavigate } from "react-router-dom";

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
      setError("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="first_name" placeholder="First name" value={form.first_name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="last_name" placeholder="Last name" value={form.last_name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="STUDENT">Student</option>
            <option value="WARDEN">Warden</option>
          </select>
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" required />

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}
