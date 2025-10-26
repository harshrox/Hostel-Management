import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

export default function HandleComplaints() {
  const [complaints, setComplaints] = useState([]);

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

  const updateStatus = async (id, status) => {
    try {
        const res = await api.patch(`/complaints/complaints/${id}/`, { status });
        const updatedComplaint = res.data;

        // Update both status and updated_at in local state instantly
        setComplaints((prev) =>
        prev.map((c) =>
            c.id === id ? { ...c, status: updatedComplaint.status, updated_at: updatedComplaint.updated_at } : c
        )
        );
    } catch (err) {
        console.error("Error updating complaint:", err);
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
        <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
              Complaints
            </h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200 border border-gray-700 rounded-xl">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-600">Student</th>
                  <th className="px-4 py-3 border-b border-gray-600">Title</th>
                  <th className="px-4 py-3 border-b border-gray-600">Description</th>
                  <th className="px-4 py-3 border-b border-gray-600">Status</th>
                  <th className="px-4 py-3 border-b border-gray-600">Created At</th>
                  <th className="px-4 py-3 border-b border-gray-600">Updated At</th>
                  <th className="px-4 py-3 border-b border-gray-600 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-700 transition-all cursor-pointer"
                    >
                      <td className="px-4 py-3 border-b border-gray-600">
                        {c.student.first_name + " " + c.student.last_name}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">{c.title}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{c.description}</td>
                      <td
                        className={`px-4 py-3 border-b border-gray-600 font-semibold ${getStatusColor(
                          c.status
                        )}`}
                      >
                        {c.status}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">
                        {formatDateTimeIST(c.created_at)}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">
                        {formatDateTimeIST(c.updated_at)}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600 text-center">
                        {c.status !== "RESOLVED" && (
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => updateStatus(c.id, "IN_PROGRESS")}
                              className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-600 transition cursor-pointer"
                            >
                              In Progress
                            </button>
                            <button
                              onClick={() => updateStatus(c.id, "RESOLVED")}
                              className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition cursor-pointer"
                            >
                              Resolve
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-400 italic"
                    >
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
