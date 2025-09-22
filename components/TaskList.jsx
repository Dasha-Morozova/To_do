import React from 'react';
import TaskItem from './TaskItem';

// Список задач
export default function TaskList({ tasks, onNext, onDelete, onEdit }) {
  if (tasks.length === 0)
    return <p className="text-gray-500 mt-3 italic">Нет задач...</p>;
  return (
    <ul className="space-y-4 mt-4" role="list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onNext={onNext}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
