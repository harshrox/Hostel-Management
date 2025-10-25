import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";
import { Plus } from "lucide-react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [available, setAvailable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/accounts/users/");
      setUsers(res.data);
      setAvailable(true);
    } catch (err) {
      console.error("Error fetching users:", err);
      setAvailable(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/accounts/users/${id}/`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen p-8">
        <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
              All Users
            </h1>
            <button
              onClick={() => navigate("/warden/users/add")}
              className="flex items-center gap-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
            >
              <Plus size={18} />
              Add User
            </button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200 border border-gray-700 rounded-xl">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-600">Username</th>
                  <th className="px-4 py-3 border-b border-gray-600">Email</th>
                  <th className="px-4 py-3 border-b border-gray-600">Role</th>
                  <th className="px-4 py-3 border-b border-gray-600">Name</th>
                  <th className="px-4 py-3 border-b border-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-700 transition-all cursor-pointer"
                  >
                    <td className="px-4 py-3 border-b border-gray-600">{u.username}</td>
                    <td className="px-4 py-3 border-b border-gray-600">{u.email}</td>
                    <td className="px-4 py-3 border-b border-gray-600">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.role === "WARDEN"
                            ? "bg-blue-800 text-blue-400"
                            : "bg-green-800 text-green-400"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-600">{`${u.first_name} ${u.last_name}`}</td>
                    <td className="px-4 py-3 border-b border-gray-600 text-center">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Loading & Empty States */}
                {users.length === 0 && available === false && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                      No users found.
                    </td>
                  </tr>
                )}
                {users.length === 0 && available === true && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
