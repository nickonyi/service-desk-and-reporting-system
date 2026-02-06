import Sidebar from '../components/dashboardcomponents/Sidebar';
import MainBoard from './dashboardcomponents/MainBoard';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <MainBoard />
    </div>
  );
}
