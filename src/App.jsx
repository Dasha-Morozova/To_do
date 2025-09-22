import React, { useEffect, useReducer, useState } from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import Stats from '../components/Stats';
import { reducer } from '../context/reducer';
import { STORAGE_KEY, loadInitial } from '../utils/storage';

// Основной компонент приложения
export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);
  const [filter, setFilter] = useState('all');

  // Сохраняем состояние в localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Не удалось сохранить задачи', e);
    }
  }, [state]);

  // Подсчёт статистики
  const counts = {
    total: state.tasks.length,
    pending: state.tasks.filter((t) => t.status === 'pending').length,
    active: state.tasks.filter((t) => t.status === 'active').length,
    completed: state.tasks.filter((t) => t.status === 'completed').length,
  };

  // Фильтрация задач
  function filteredTasks() {
    switch (filter) {
      case 'pending':
        return state.tasks.filter((t) => t.status === 'pending');
      case 'active':
        return state.tasks.filter((t) => t.status === 'active');
      case 'completed':
        return state.tasks.filter((t) => t.status === 'completed');
      default:
        return state.tasks;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 p-3 sm:p-6">
      <div className="w-full max-w-md sm:max-w-3xl bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-10">
        <header className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-indigo-700 mb-2">
            Менеджер задач
          </h1>
        </header>

        <TaskInput onAdd={(text) => dispatch({ type: 'ADD', payload: { text } })} />

        <div className="mt-6 sm:mt-8 flex flex-col gap-4">
          <FilterBar filter={filter} onChange={setFilter} counts={counts} />
          <Stats
            counts={counts}
            onClearCompleted={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          />
        </div>

        <TaskList
          tasks={filteredTasks()}
          onNext={(id) => dispatch({ type: 'NEXT', payload: { id } })}
          onDelete={(id) => dispatch({ type: 'DELETE', payload: { id } })}
          onEdit={(id, text) =>
            dispatch({ type: 'EDIT', payload: { id, text } })
          }
        />
      </div>
    </div>
  );
}
