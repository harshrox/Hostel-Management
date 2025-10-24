import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState(user || {});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user) {
      api.get("/accounts/profile/").then((res) => setForm(res.data));
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/accounts/profile/", form);
      setMsg("Profile updated successfully!");
    } catch {
      setMsg("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>
      {msg && <p className="text-center text-sm text-green-600 mb-3">{msg}</p>}
      <form onSubmit={handleSubmit}>
        {["first_name", "last_name", "username"].map((f) => (
          <input
            key={f}
            name={f}
            value={form[f] || ""}
            onChange={handleChange}
            placeholder={f.replace("_", " ").toUpperCase()}
            className="w-full border p-2 mb-3 rounded-md"
            disabled={f === "username"}
          />
        ))}
        <input
          value={form.role || ""}
          disabled
          className="w-full border p-2 mb-3 rounded-md bg-gray-100"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 mt-3 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
