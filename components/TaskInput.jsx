import React, { useRef, useState } from 'react';

// Поле ввода новой задачи
export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      inputRef.current && inputRef.current.setAttribute('aria-invalid', 'true');
      return;
    }
    onAdd(trimmed);
    setValue('');
    inputRef.current && inputRef.current.removeAttribute('aria-invalid');
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" aria-label="Добавить задачу">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите задачу..."
          className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
        />
        <button
          type="submit"
          className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:from-indigo-600 hover:to-blue-600 active:scale-95 transition-transform shadow-lg"
        >
          ➕ Добавить
        </button>
      </div>
    </form>
  );
}
