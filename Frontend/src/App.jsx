import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import WardenDashboard from "./pages/Warden/Dashboard";
import StudentDashboard from "./pages/Student/Dashboard";
import UserList from "./pages/Warden/Users/UserList";
import AddUser from "./pages/Warden/Users/AddUser";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

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

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={<ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>}
      />

      {/* Default */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
