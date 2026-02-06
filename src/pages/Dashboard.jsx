import Sidebar from '../components/Sidebar';
import React from 'react';

function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500">Placeholder layout – data coming later</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((card) => (
            <div
              key={card}
              className="bg-white rounded-lg shadow p-6 h-24 flex items-center justify-center text-gray-400"
            >
              Stat Card
            </div>
          ))}
        </div>

        {/* Main Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table / Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 h-64 flex items-center justify-center text-gray-400">
            Table / Chart Placeholder
          </div>

          {/* Activity */}
          <div className="bg-white rounded-lg shadow p-6 h-64 flex items-center justify-center text-gray-400">
            Activity / Notes Placeholder
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
