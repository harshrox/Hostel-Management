import Layout from "../../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Bed,
  Home,
  CalendarCheck,
  FileWarning,
  UserCircle
} from "lucide-react";

export default function WardenDashboard() {
  const { user } = useAuth(); // Get logged-in user

  const cards = [
    {
      title: "Users",
      description: "Add, update, or delete student and warden accounts.",
      icon: <Users size={24} className="text-teal-400" />,
      to: "/warden/users",
    },
    {
      title: "Rooms",
      description: "Add or manage hostel rooms and allocations.",
      icon: <Bed size={24} className="text-amber-400" />,
      to: "/warden/rooms",
    },
    {
      title: "Allocations",
      description: "View and manage student room allocations.",
      icon: <Home size={24} className="text-purple-400" />,
      to: "/warden/allocations",
    },
    {
      title: "Leaves",
      description: "Approve or reject student leave applications.",
      icon: <CalendarCheck size={24} className="text-green-400" />,
      to: "/warden/leaves",
    },
    {
      title: "Complaints",
      description: "Review and manage complaints submitted by students.",
      icon: <FileWarning size={24} className="text-red-400" />,
      to: "/warden/complaints",
    },
    {
      title: "Profile",
      description: "View your profile.",
      icon: <UserCircle size={24} className="text-blue-400" />,
      to: "/profile",
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Modern Dashboard Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg">
            Warden Dashboard
          </h1>
          <p className="mt-2 text-gray-300 text-lg md:text-xl">
            Welcome back, <span className=" text-fuchsia-500">{user?.first_name}</span>! Access all the sections below to manage hostel operations efficiently.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <NavLink
              key={idx}
              to={card.to}
              className="p-6 bg-linear-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
            >
              <div className="flex items-center mb-4">
                {card.icon}
                <h2 className="ml-3 text-xl md:text-2xl font-semibold text-white">{card.title}</h2>
              </div>
              <p className="text-gray-300">{card.description}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </Layout>
  );
}
