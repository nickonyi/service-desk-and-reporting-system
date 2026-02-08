import Sidebar from '../components/dashboardcomponents/Sidebar';
import { Outlet } from 'react-router';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
