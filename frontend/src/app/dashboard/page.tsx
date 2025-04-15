'use client';
import PrivateLayout from '../private-layout/layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import {
  fetchTasks,
  createTask,
  toggleTaskCompleted,
  deleteTask,
  restoreTask
} from '@/lib/api';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  deletedAt?: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    fetchTasks(token)
      .then(setTasks)
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;

    try {
      await createTask(token, form);
      const updated = await fetchTasks(token);
      setTasks(updated);
      setForm({ title: '', description: '', dueDate: '' });
    } catch (err) {
      alert('Error al crear tarea');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  
  return (
  <PrivateLayout>
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 Mis Tareas</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Cerrar sesión
      </button>
      {/* Formulario para nueva tarea */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear tarea
        </button>
      </form>

      {/* Tareas */}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No tienes tareas aún.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="border p-4 rounded shadow space-y-2">
              <div className="flex justify-between items-center">
                <h3
                  className={`text-lg font-semibold ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    className={`px-2 py-1 text-sm rounded ${
                      task.completed ? 'bg-yellow-500' : 'bg-green-600'
                    } text-white`}
                    onClick={async () => {
                      const token = getToken();
                      if (!token) return;
                      await toggleTaskCompleted(token, task.id, !task.completed);
                      const updated = await fetchTasks(token);
                      setTasks(updated);
                    }}
                  >
                    {task.completed ? 'Deshacer' : 'Completar'}
                  </button>

                  {!task.deletedAt ? (
                    <button
                      className="bg-red-600 text-white px-2 py-1 text-sm rounded"
                      onClick={async () => {
                        const token = getToken();
                        if (!token) return;
                        await deleteTask(token, task.id);
                        const updated = await fetchTasks(token);
                        setTasks(updated);
                      }}
                    >
                      Eliminar
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
                      onClick={async () => {
                        const token = getToken();
                        if (!token) return;
                        await restoreTask(token, task.id);
                        const updated = await fetchTasks(token);
                        setTasks(updated);
                      }}
                    >
                      Restaurar
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">
                Vence: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </PrivateLayout>  
  );
}
