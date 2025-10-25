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
      <div className="bg-gray-900 min-h-screen p-8 flex justify-center items-start">
        <div className="max-w-md w-full mt-10 bg-gray-800 p-6 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 text-center">
            My Profile
          </h2>

          <form className="space-y-4">
            {["first_name", "last_name", "username"].map((f) => (
              <input
                key={f}
                name={f}
                value={form[f] || ""}
                readOnly
                placeholder={f.replace("_", " ").toUpperCase()}
                className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ))}

            <input
              value={form.role || ""}
              readOnly
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              onClick={logout}
              type="button"
              className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
