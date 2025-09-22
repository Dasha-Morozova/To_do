import React from 'react';

// Панель фильтров задач
export default function FilterBar({ filter, onChange, counts }) {
  const filters = [
    { id: 'all', label: 'Все', count: counts.total },
    { id: 'pending', label: 'В ожидании', count: counts.pending },
    { id: 'active', label: 'Активные', count: counts.active },
    { id: 'completed', label: 'Выполненные', count: counts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center sm:justify-start" role="tablist">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md ${
            filter === f.id
              ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {f.label} ({f.count})
        </button>
      ))}
    </div>
  );
}
