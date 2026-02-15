import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';

function DashboardHeader({ title, btnText }) {
  const navigate = useNavigate();
  return (
    <div className="border-b p-2 pl-6 border-gray-200 flex justify-between">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-2">
        <button
          className="bg-black text-white px-4 py-0.5 cursor-pointer rounded-lg flex items-center gap-1 transition-colors"
          onClick={() => navigate('new')}
        >
          <Plus size={18} />
          {btnText}
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
