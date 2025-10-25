import Layout from "../../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Bed, DoorOpen, FileWarning, UserCircle } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth(); // Logged-in student

  // Cards based on student sidebar links
  const cards = [
    {
      title: "Room",
      description: "View your room allocation details.",
      icon: <Bed size={24} className="text-amber-400" />,
      to: "/student/rooms",
    },
    {
      title: "Leaves",
      description: "Apply for leaves and view leave status.",
      icon: <DoorOpen size={24} className="text-green-400" />,
      to: "/student/leaves",
    },
    {
      title: "Complaints",
      description: "Submit and track complaints.",
      icon: <FileWarning size={24} className="text-red-400" />,
      to: "/student/complaints",
    },
    {
      title: "Profile",
      description: "View and update your profile information.",
      icon: <UserCircle size={24} className="text-blue-400" />,
      to: "/profile",
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Modern Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg">
            Student Dashboard
          </h1>
          <p className="mt-2 text-gray-300 text-lg md:text-xl">
            Welcome back, {user?.first_name} {user?.last_name}! Explore your rooms, leaves, and complaints below.
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
