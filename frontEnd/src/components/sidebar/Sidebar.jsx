import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col items-center py-8">
      {/* User Avatar and Name */}
      <div className="mb-10 flex flex-col items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="User"
          className="w-24 h-24 rounded-full mb-2"
        />
        <h2 className="text-xl font-semibold">User Name</h2>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-col space-y-4 w-full px-4">
        <button className="py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
          Home
        </button>
        <button className="py-2 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
          Projects
        </button>
        <button className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition">
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
