import { LayoutDashboard, Ticket, BookOpen, Users, FileText, Search } from 'lucide-react';
import ControlPanel from './ControlPanel';
import NavBar from './NavBar';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-200 border-r border-gray-100 p-4">
      <ControlPanel />
      <NavBar />
    </aside>
  );
}

export default Sidebar;
