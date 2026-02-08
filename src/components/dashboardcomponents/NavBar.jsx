import { LayoutDashboard, Ticket, Search, BookOpen, Users, FileText } from 'lucide-react';
import { NavLink } from 'react-router';

function NavBar() {
  const menuItems = [
    { label: 'Search', icon: Search, path: '/search' },
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Tickets', icon: Ticket, path: '/dashboard/tickets' },
    { label: 'Knowledge Base', icon: BookOpen, path: '/dashboard/knowledge' },
  ];
  return (
    <nav className="space-y-1 text-sm">
      {menuItems.map(({ label, icon: Icon, path }) => (
        <NavLink
          end
          key={label}
          to={path}
          className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md
                         text-gray-700 hover:bg-gray-100 hover:text-gray-700
                         cursor-pointer  ${isActive ? 'bg-white text-black' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <Icon size={16} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBar;
