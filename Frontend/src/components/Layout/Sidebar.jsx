import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Bed,
  Home,
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
    <div className={`flex flex-col ${open ? "w-60" : "w-16"} bg-blue-700 text-white min-h-screen transition-all duration-300`}>
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-blue-500 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h1 className={`text-lg font-bold transition-all ${!open && "hidden"}`}>
          HostelMgmt
        </h1>
        <button className="p-1 text-blue-100 hover:text-white">
          {open ? "⟨" : "⟩"}
        </button>
      </div>

      <nav className="flex-1 mt-2">
        {links.concat(commonLinks).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm hover:bg-blue-600 ${
                isActive ? "bg-blue-600" : ""
              }`
            }
          >
            {item.icon}
            {open && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-blue-500 p-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-left hover:bg-blue-600 px-3 py-2 rounded"
        >
          <LogOut size={18} />
          {open && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
