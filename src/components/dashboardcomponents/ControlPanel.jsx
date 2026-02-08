import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

import { LogOut } from 'lucide-react';

function ControlPanel() {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`w-full relative p-2 rounded-xl hover:cursor-pointer hover:bg-gray-300 ${isOpen && 'bg-white '}`}
      ref={ref}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex">
        <div>
          <img src="/helpdesk.svg" alt="help desk logo" className="h-12 w-12" />
        </div>
        <div className="pl-2 ">
          <h1 className="block text-md text-black font-bold">{user?.username || 'Helpdesk'}</h1>
          <p className="block text-sm text-black font-light">{user?.role || 'Administrator'}</p>
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-2 left-0 top-14 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <button
            onClick={logout}
            className="w-full text-left  cursor-pointer flex gap-2 px-4 py-2 hover:bg-gray-100 text-gray-800 rounded-t-lg"
          >
            {' '}
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
