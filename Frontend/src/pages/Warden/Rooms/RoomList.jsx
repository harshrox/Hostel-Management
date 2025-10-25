import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";

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
        <div className="bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
                <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-semibold">Rooms</h1>
                <button
                    onClick={() => navigate("/warden/rooms/add")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Room
                </button>
                </div>

                <table className="min-w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="px-4 py-2 border">Number</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Capacity</th>
                    <th className="px-4 py-2 border">Allocated</th>
                    <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{room.number}</td>
                        <td className="px-4 py-2 border">{room.room_type}</td>
                        <td className="px-4 py-2 border">{room.capacity}</td>
                        <td className="px-4 py-2 border">
                        {room.allocated_count}/{room.capacity}
                        </td>
                        <td className="px-4 py-2 border text-center">
                        <button
                            onClick={() => deleteRoom(room.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    </Layout>
  );
}
