import Layout from "../../components/Layout/Layout";
import { Users, Bed, CalendarCheck, FileWarning } from "lucide-react";

export default function WardenDashboard() {
  const cards = [
    {
      title: "Manage Users",
      description: "Add, update, or delete student and warden accounts.",
      icon: <Users size={24} className="text-indigo-400" />,
    },
    {
      title: "Rooms Management",
      description: "Add or manage hostel rooms and allocations.",
      icon: <Bed size={24} className="text-teal-400" />,
    },
    {
      title: "Leaves Management",
      description: "Approve or reject student leave applications.",
      icon: <CalendarCheck size={24} className="text-amber-400" />,
    },
    {
      title: "Complaints",
      description: "Review and manage complaints submitted by students.",
      icon: <FileWarning size={24} className="text-red-400" />,
    },
  ];

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-6">Warden Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 bg-linear-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                {card.icon}
                <h2 className="ml-3 text-xl font-semibold text-white">{card.title}</h2>
              </div>
              <p className="text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
