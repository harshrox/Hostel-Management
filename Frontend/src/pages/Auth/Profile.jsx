import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout/Layout";

export default function Profile() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState(user || {});

  useEffect(() => {
    if (!user) {
      api.get("/accounts/profile/").then((res) => setForm(res.data));
    }
  }, [user]);

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

        <form>
          {["first_name", "last_name", "username"].map((f) => (
            <input
              key={f}
              name={f}
              value={form[f] || ""}
              readOnly
              placeholder={f.replace("_", " ").toUpperCase()}
              className="w-full border p-2 mb-3 rounded-md bg-gray-100"
            />
          ))}

          <input
            value={form.role || ""}
            readOnly
            className="w-full border p-2 mb-3 rounded-md bg-gray-200"
          />

          <button
            onClick={logout}
            type="button"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </form>
      </div>
    </Layout>
  );
}
