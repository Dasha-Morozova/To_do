import React from 'react';

// Статистика по задачам
export default function Stats({ counts, onClearCompleted }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 mt-4 bg-gray-50 px-4 py-2 rounded-xl shadow-inner gap-2">
      <div>
        <span className="font-medium">{counts.pending}</span> в ожидании |{' '}
        <span className="font-medium">{counts.active}</span> активных |{' '}
        <span className="font-medium">{counts.completed}</span> выполнено
      </div>
      <button
        onClick={onClearCompleted}
        disabled={counts.completed === 0}
        className="text-red-600 hover:underline disabled:text-gray-400"
      >
        🗑 Очистить
      </button>
    </div>
  );
}
