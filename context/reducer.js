// Редьюсер для управления состоянием задач

import { uid } from '../utils/storage';

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { text } = action.payload;
      const trimmed = text.trim();
      if (!trimmed) return state;
      const newTask = {
        id: uid(),
        text: trimmed,
        status: 'pending',
        createdAt: Date.now(),
      };
      return { ...state, tasks: [newTask, ...state.tasks] };
    }
    case 'DELETE': {
      const id = action.payload.id;
      return { ...state, tasks: state.tasks.filter((t) => t.id !== id) };
    }
    case 'NEXT': {
      const id = action.payload.id;
      const nextStatus = (s) =>
        s === 'pending' ? 'active' : s === 'active' ? 'completed' : 'pending';
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, status: nextStatus(t.status) } : t
        ),
      };
    }
    case 'EDIT': {
      const { id, text } = action.payload;
      const trimmed = text.trim();
      if (!trimmed) return state;
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, text: trimmed } : t
        ),
      };
    }
    case 'CLEAR_COMPLETED': {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.status !== 'completed'),
      };
    }
    case 'SET': {
      return action.payload;
    }
    default:
      return state;
  }
}
