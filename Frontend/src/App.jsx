import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import WardenDashboard from "./pages/Warden/Dashboard";
import StudentDashboard from "./pages/Student/Dashboard";
import UserList from "./pages/Warden/Users/UserList";
import AddUser from "./pages/Warden/Users/AddUser";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Profile from "./pages/Auth/Profile";
import RoomList from "./pages/Warden/Rooms/RoomList";
import AddRoom from "./pages/Warden/Rooms/AddRoom";
import AllocationList from "./pages/Warden/Rooms/AllocationList";
import AddAllocation from "./pages/Warden/Rooms/AddAllocation";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Profile Route (any logged-in user) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Warden Routes */}
      <Route
        path="/warden/dashboard"
        element={<ProtectedRoute role="WARDEN"><WardenDashboard /></ProtectedRoute>}
      />
      <Route
        path="/warden/users"
        element={<ProtectedRoute role="WARDEN"><UserList /></ProtectedRoute>}
      />
      <Route
        path="/warden/users/add"
        element={<ProtectedRoute role="WARDEN"><AddUser /></ProtectedRoute>}
      />

      <Route
        path="/warden/rooms"
        element={
          <ProtectedRoute role="WARDEN">
            <RoomList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/warden/rooms/add"
        element={
          <ProtectedRoute role="WARDEN">
            <AddRoom />
          </ProtectedRoute>
        }
      />

      <Route
        path="/warden/allocations"
        element={
          <ProtectedRoute role="WARDEN">
            <AllocationList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/warden/allocations/add"
        element={
          <ProtectedRoute role="WARDEN">
            <AddAllocation />
          </ProtectedRoute>
        }
      />



      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={<ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>}
      />

      {/* Default */}
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
