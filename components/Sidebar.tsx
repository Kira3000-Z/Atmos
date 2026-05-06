import { Cloud, Map, Calendar, BarChart2 } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { id: 'dashboard', icon: <Cloud size={24} />, active: true },
    { id: 'maps', icon: <Map size={24} />, active: false },
    { id: 'monthly', icon: <Calendar size={24} />, active: false },
    { id: 'trends', icon: <BarChart2 size={24} />, active: false },
  ];

  return (
    <aside className="w-20 flex flex-col items-center py-8 bg-[#0f101a]/50 border-r border-white/5 z-50">
      <div className="flex flex-col gap-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl transition-all duration-300 cursor-default ${
              item.active 
                ? 'text-blue-400 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-500/20' 
                : 'text-gray-600'
            }`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </aside>
  );
}