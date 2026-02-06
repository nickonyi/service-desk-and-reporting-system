import Sidebar from '../components/dashboardcomponents/Sidebar';
import MainBoard from './dashboardcomponents/MainBoard';
import TicketList from './TicketList';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <TicketList />
    </div>
  );
}
