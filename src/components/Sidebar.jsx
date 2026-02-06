import React from 'react';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-gray-100 p-6">
      <h1 className="text-xl font-semibold mb-8">Service Desk</h1>

      <nav className="space-y-4">
        <div className="text-gray-300 hover:text-white cursor-pointer">Dashboard</div>
        <div className="text-gray-300 hover:text-white cursor-pointer">Tickets</div>
        <div className="text-gray-300 hover:text-white cursor-pointer">Users</div>
        <div className="text-gray-300 hover:text-white cursor-pointer">Reports</div>
        <div className="text-gray-300 hover:text-white cursor-pointer">Settings</div>
      </nav>
    </aside>
  );
}

export default Sidebar;
