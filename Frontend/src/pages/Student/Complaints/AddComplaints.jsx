import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

export default function AddComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints/complaints/");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      await api.post("/complaints/complaints/", { title, description });
      setTitle("");
      setDescription("");
      fetchComplaints();
    } catch (err) {
      console.error("Error submitting complaint:", err.response?.data || err);
      setError("Failed to submit complaint");
    }
  };

  const formatDateTimeIST = (datetime) => {
    if (!datetime) return "-";
    const date = new Date(datetime);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "RESOLVED":
        return "text-green-400";
      case "IN_PROGRESS":
        return "text-yellow-400";
      default:
        return "text-red-400";
    }
  };

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 text-center">
            Submit a Complaint
          </h1>

          {/* Complaint Form */}
          <div className="bg-gray-900 p-6 rounded-2xl mb-6 shadow-inner">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows={4}
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
              >
                Submit Complaint
              </button>
            </form>
          </div>

          {/* Complaint List */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200 border border-gray-700 rounded-xl">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-600">Title</th>
                  <th className="px-4 py-3 border-b border-gray-600">Description</th>
                  <th className="px-4 py-3 border-b border-gray-600">Status</th>
                  <th className="px-4 py-3 border-b border-gray-600">Created At</th>
                  <th className="px-4 py-3 border-b border-gray-600">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-700 transition-all cursor-pointer"
                    >
                      <td className="px-4 py-3 border-b border-gray-600">{c.title}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{c.description}</td>
                      <td className={`px-4 py-3 border-b border-gray-600 font-semibold ${getStatusColor(c.status)}`}>
                        {c.status}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">{formatDateTimeIST(c.created_at)}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{formatDateTimeIST(c.updated_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-400 py-6 italic">
                      No complaints found.
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
