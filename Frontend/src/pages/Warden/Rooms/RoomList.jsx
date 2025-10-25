import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import { Plus } from "lucide-react";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms/rooms/");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/rooms/rooms/${id}/`);
      setRooms(rooms.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen p-8">
        <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
              Rooms
            </h1>
            <button
              onClick={() => navigate("/warden/rooms/add")}
              className="flex items-center gap-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
            >
              <Plus size={18} />
              Add Room
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200 border border-gray-700 rounded-xl">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-600">Number</th>
                  <th className="px-4 py-3 border-b border-gray-600">Type</th>
                  <th className="px-4 py-3 border-b border-gray-600">Capacity</th>
                  <th className="px-4 py-3 border-b border-gray-600">Allocated</th>
                  <th className="px-4 py-3 border-b border-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-gray-700 transition-all cursor-pointer"
                  >
                    <td className="px-4 py-3 border-b border-gray-600">{room.number}</td>
                    <td className="px-4 py-3 border-b border-gray-600">{room.room_type}</td>
                    <td className="px-4 py-3 border-b border-gray-600">{room.capacity}</td>
                    <td className="px-4 py-3 border-b border-gray-600">
                      {room.allocated_count}/{room.capacity}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-600 text-center">
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {rooms.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-400 italic"
                    >
                      No rooms available.
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
