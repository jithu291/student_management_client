import React, { useState } from "react";
import {
  People,
  Assignment,
  BarChart,
  TrendingUp,
  School,
  Event,
  ChevronRight,
  PersonAdd,
  MenuBook,
  Search,
  Notifications,
  Add,
} from "@mui/icons-material";
import Sidebar from "../Sidebar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const stats = [
    { title: "Total Students", value: "0", change: "", icon: People, color: "bg-blue-500" },
    { title: "Active Staff", value: "0", change: "0", icon: School, color: "bg-green-500" },
    { title: "Total Courses", value: "0", change: "0", icon: MenuBook, color: "bg-purple-500" },
    { title: "Assignments", value: "0", change: "+0", icon: Assignment, color: "bg-orange-500" },
  ];

  // const recentActivities = [
  //   { id: 1, action: "New student enrolled", user: "John Doe", time: "2 hours ago", type: "enrollment" },
  //   { id: 2, action: "Assignment submitted", user: "Jane Smith", time: "4 hours ago", type: "assignment" },
  //   { id: 3, action: "Course completed", user: "Mike Johnson", time: "1 day ago", type: "completion" },
  //   { id: 4, action: "New staff added", user: "Sarah Wilson", time: "2 days ago", type: "staff" },
  // ];

  // const upcomingEvents = [
  //   { id: 1, title: "Mathematics Exam", date: "Tomorrow", time: "10:00 AM" },
  //   { id: 2, title: "Science Fair", date: "March 25", time: "2:00 PM" },
  //   { id: 3, title: "Parent Meeting", date: "March 28", time: "4:00 PM" },
  // ];

  return (
    <div className="h-screen bg-gray-50 flex">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Notifications className="w-6 h-6" />
              </button>
             
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All
                </button>
              </div>
              {/* <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All
                </button>
              </div>
              {/* <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Event className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date} • {event.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <PersonAdd className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Add Student</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <MenuBook className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Create Course</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Assignment className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">New Assignment</span>
              </button>
              <button className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <BarChart className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">View Reports</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}