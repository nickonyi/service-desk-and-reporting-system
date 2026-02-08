import Sidebar from '../components/dashboardcomponents/Sidebar';
import MainBoard from './dashboardcomponents/MainBoard';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import KnowledgeBase from './KnwoledgeBase';

import AddArticle from './AddarticleModal';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      <Sidebar />
      <AddArticle />
    </div>
  );
}
