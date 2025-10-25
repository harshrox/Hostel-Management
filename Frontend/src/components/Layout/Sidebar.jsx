import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Bed,
  Home,
  CalendarCheck,
  FileWarning,
  LogOut,
  UserCircle,
  DoorOpen,
} from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const commonLinks = [
    { to: "/profile", label: "Profile", icon: <UserCircle size={18} /> },
  ];

  const wardenLinks = [
    { to: "/warden/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/warden/users", label: "Users", icon: <Users size={18} /> },
    { to: "/warden/rooms", label: "Rooms", icon: <Bed size={18} /> },
    { to: "/warden/allocations", label: "Allocations", icon: <Home size={18} /> },
    { to: "/warden/leaves", label: "Leaves", icon: <CalendarCheck size={18} /> },
    { to: "/warden/complaints", label: "Complaints", icon: <FileWarning size={18} /> },
  ];

  const studentLinks = [
    { to: "/student/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/student/rooms", label: "Room", icon: <Bed size={18} /> },
    { to: "/student/leaves", label: "Leaves", icon: <DoorOpen size={18} /> },
    { to: "/student/complaints", label: "Complaints", icon: <FileWarning size={18} /> },
  ];

  const links = user?.role === "WARDEN" ? wardenLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col justify-between ${
        open ? "w-64" : "w-16"
      } bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 min-h-screen transition-all duration-300 shadow-lg`}
    >
      {/* Header + Nav */}
      <div>
        {/* Sidebar Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-gray-700 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <h1 className={`text-lg font-bold transition-all ${!open && "hidden"}`}>
            Hostel Management
          </h1>
          <button className="p-1 text-gray-400 hover:text-white">
            {open ? "⟨" : "⟩"}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex flex-col gap-1">
          {links.concat(commonLinks).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all hover:bg-gray-700 ${
                  isActive ? "bg-gray-700 font-semibold" : ""
                }`
              }
            >
              {item.icon}
              {open && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="border-t border-gray-700 p-3 sticky bottom-0 bg-gray-900">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-left hover:bg-gray-700 px-3 py-2 rounded-lg transition-all"
        >
          <LogOut size={18} />
          {open && <span>Logout</span>}
        </button>
      </div>

    </div>
  );
}
