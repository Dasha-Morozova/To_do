import React, { useEffect, useRef, useState } from 'react';

// Один элемент списка задач
export default function TaskItem({ task, onNext, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current && inputRef.current.focus();
  }, [editing]);

  function saveEdit() {
    const trimmed = temp.trim();
    if (!trimmed) {
      setTemp(task.text);
      setEditing(false);
      return;
    }
    if (trimmed !== task.text) onEdit(task.id, trimmed);
    setEditing(false);
  }

  const statusStyles = {
    pending: 'bg-yellow-200 text-yellow-900 border border-yellow-300',
    active: 'bg-blue-200 text-blue-900 border border-blue-300',
    completed: 'bg-green-200 text-green-900 border border-green-300',
  };

  const statusLabel = {
    pending: 'В ожидании',
    active: 'Активная',
    completed: 'Выполнена',
  };

  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[task.status]}`}>
        {statusLabel[task.status]}
      </div>

      {!editing ? (
        <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span
            className={`text-base ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-800'}`}
          >
            {task.text}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNext(task.id)}
              className="px-3 py-1 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 text-sm shadow"
            >
              ➜ Далее
            </button>
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 rounded-lg bg-purple-500 text-white hover:bg-purple-600 text-sm shadow"
            >
              ✏ Ред.
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm shadow"
            >
              ❌ Удалить
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <input
            ref={inputRef}
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') setEditing(false);
            }}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow"
            >
              💾
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 shadow"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
