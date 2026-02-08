import Sidebar from '../components/dashboardcomponents/Sidebar';
import MainBoard from '../components/dashboardcomponents/MainBoard';
import NewTicketForm from '../components/NewTicketForm';
import TicketList from '../components/TicketList';
import KnowledgeBase from '../components/KnwoledgeBase';

import AddArticle from '../components/AddarticleModal';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      <Sidebar />
      <AddArticle />
    </div>
  );
}
