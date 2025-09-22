// Утилиты для работы с localStorage и генерации ID

const STORAGE_KEY = 'todo_app_v1';

// Генерация уникального ID
export const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random().toString(36).slice(2);

// Загрузка задач из localStorage
export function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { tasks: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.tasks)) return { tasks: [] };

    const migrated = parsed.tasks.map((t) => {
      if (t.status && ['pending', 'active', 'completed'].includes(t.status))
        return { ...t };
      if (typeof t.completed === 'boolean') {
        return {
          id: t.id ?? uid(),
          text: t.text ?? '',
          status: t.completed ? 'completed' : 'pending',
          createdAt: t.createdAt ?? Date.now(),
        };
      }
      return {
        id: t.id ?? uid(),
        text: t.text ?? '',
        status: 'pending',
        createdAt: t.createdAt ?? Date.now(),
      };
    });
    return { tasks: migrated };
  } catch (e) {
    console.warn('Ошибка при загрузке сохранённых задач', e);
    return { tasks: [] };
  }
}

export { STORAGE_KEY };
