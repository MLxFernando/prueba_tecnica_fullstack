'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { fetchTasks, restoreTask } from '@/lib/api';
import PrivateLayout from '../private-layout/layout';
export default function EliminadasPage() {
  const router = useRouter();
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    fetchTasks(token)
      .then((allTasks) => {
        const deletedOnly = allTasks.filter((t: any) => t.deletedAt !== null);
        setDeletedTasks(deletedOnly);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  const handleRestore = async (taskId: string) => {
    const token = getToken();
    if (!token) return;

    await restoreTask(token, taskId);
    const updated = await fetchTasks(token);
    setDeletedTasks(updated.filter((t: any) => t.deletedAt !== null));
  };

  return (
    <PrivateLayout>  
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🗃 Tareas Eliminadas</h1>
      {deletedTasks.length === 0 ? (
        <p>No hay tareas eliminadas.</p>
      ) : (
        <ul className="space-y-4">
          {deletedTasks.map((task: any) => (
            <li key={task.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">
                Eliminada el: {new Date(task.deletedAt).toLocaleDateString()}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleRestore(task.id)}
              >
                Restaurar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </PrivateLayout> 
  );
}
