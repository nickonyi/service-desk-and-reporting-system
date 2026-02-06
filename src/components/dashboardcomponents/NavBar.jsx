import { LayoutDashboard, Ticket, Search, BookOpen, Users, FileText } from 'lucide-react';

function NavBar() {
  return (
    <nav className="space-y-1 text-sm">
      {[
        { label: 'Search', icon: Search },
        { label: 'Dashboard', icon: LayoutDashboard },
        { label: 'Tickets', icon: Ticket },
        { label: 'Knowledge Base', icon: BookOpen },
        { label: 'Customers', icon: Users },
        { label: 'Reports', icon: FileText },
      ].map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 px-3 py-2 rounded-md
                         text-gray-700 hover:bg-gray-100 hover:text-gray-700
                         cursor-pointer"
        >
          <Icon size={16} />
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
}

export default NavBar;
