import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

export default function AddAllocation() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/accounts/users/?role=STUDENT");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms/rooms/");
      const available = res.data.filter((r) => !r.is_allocated);
      setRooms(available);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedRoom || !startDate) return;

    const payload = {
      student_id: selectedStudent.id,
      room_id: selectedRoom.id,
      start_date: startDate,
    };
    console.log("Payload before POST:", payload);

    try {
      await api.post("/rooms/allocations/", payload);
      navigate("/warden/allocations");
    } catch (err) {
      console.error("Error creating allocation:", err.response?.data || err);
      setError("Failed to create allocation");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Allocate Room
          </h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="student"
              value={selectedStudent?.id || ""}
              onChange={(e) =>
                setSelectedStudent(
                  students.find((s) => s.id === parseInt(e.target.value))
                )
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.username} ({s.email})
                </option>
              ))}
            </select>

            <select
              name="room"
              value={selectedRoom?.id || ""}
              onChange={(e) =>
                setSelectedRoom(
                  rooms.find((r) => r.id === parseInt(e.target.value))
                )
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Room</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.number} - {r.room_type}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Allocate
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
