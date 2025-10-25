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
      fetchComplaints(); // refresh list
    } catch (err) {
      console.error("Error submitting complaint:", err.response?.data || err);
      setError("Failed to submit complaint");
    }
  };

  const formatDateTime = (datetime) => {
    if (!datetime) return "-";
    return new Date(datetime).toLocaleString();
  };

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">My Complaints</h1>

        {/* Complaint Form */}
        <div className="bg-white shadow rounded-xl p-6 mb-6">
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit Complaint
            </button>
          </form>
        </div>

        {/* Complaint List */}
        <div className="bg-white shadow rounded-xl p-6">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{c.title}</td>
                  <td className="px-4 py-2 border">{c.description}</td>
                  <td className="px-4 py-2 border">{c.status}</td>
                  <td className="px-4 py-2 border">{formatDateTime(c.created_at)}</td>
                  <td className="px-4 py-2 border">{formatDateTime(c.updated_at)}</td>
                </tr>
              ))}
              {complaints.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
