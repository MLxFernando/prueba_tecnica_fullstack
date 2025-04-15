/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  completed: boolean
  deleted: boolean
}

export default function TaskPage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedHistory, setSelectedHistory] = useState<any[]>([])
  const { register, handleSubmit, reset } = useForm()
  const [showDeleted, setShowDeleted] = useState(false)


  const fetchTasks = async () => {
    try {
      const endpoint = showDeleted ? '/tasks/deleted' : '/tasks'
      const res = await api.get(endpoint)
      setTasks(res.data)
    } catch (err) {
      console.error('Error cargando tareas:', err)
    }
  }
  

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/tasks', data)
      setTasks(prev => [res.data, ...prev])
      reset()
    } catch (err) {
      console.error('Error creando tarea:', err)
    }
  }

  const toggleComplete = async (task: Task) => {
    try {
      const res = await api.put(`/tasks/${task.id}`, {
        completed: !task.completed
      })
      setTasks(prev => prev.map(t => (t.id === task.id ? res.data : t)))
    } catch (err) {
      console.error('Error actualizando tarea:', err)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error('Error eliminando tarea:', err)
    }
  }

  const getHistorial = async (id: number) => {
    try {
      const res = await api.get(`/tasks/historial/${id}`)
      setSelectedHistory(res.data)
    } catch (err) {
      console.error('Error obteniendo historial:', err)
    }
  }

  const restoreTask = async (id: number) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await api.patch(`/tasks/restore/${id}`)
      setTasks(prev => prev.filter(t => t.id !== id)) // lo quitamos de la papelera
    } catch (err) {
      console.error('Error restaurando tarea:', err)
    }
  }  

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  
    if (!isLoading && user) {
      fetchTasks()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, router, showDeleted])
  
  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tus Tareas</h1>
        <div className="flex gap-3 mt-2 mb-4">
          <button
            onClick={() => setShowDeleted(false)}
            className={`px-3 py-1 rounded ${!showDeleted ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            Tareas activas
          </button>
          <button
            onClick={() => setShowDeleted(true)}
            className={`px-3 py-1 rounded ${showDeleted ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            Papelera
          </button>
        </div>
        <button onClick={logout} className="text-sm bg-red-500 text-white px-3 py-1">Cerrar sesión</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-2">
        <input {...register('title')} type="text" placeholder="Título" className="w-full p-2 border" required />
        <input {...register('description')} type="text" placeholder="Descripción" className="w-full p-2 border" required />
        <input {...register('dueDate')} type="date" className="w-full p-2 border" required />
        <button type="submit" className="bg-emerald-500 text-white px-4 py-2">Crear tarea</button>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="border p-4 rounded shadow relative">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Fecha límite: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className="text-sm">Completada: {task.completed ? '✅' : '❌'}</p>
            <div className="flex gap-2 mt-2">
              {showDeleted ? (
                <button
                  onClick={() => restoreTask(task.id)}
                  className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                >
                  Restaurar
                </button>
              ) : (
                <>
                  <button
                    onClick={() => toggleComplete(task)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => getHistorial(task.id)}
                    className="text-xs bg-gray-700 text-white px-2 py-1 rounded"
                  >
                    Ver historial
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {selectedHistory.length > 0 && (
        <div className="mt-8 bg-gray-50 p-4 border rounded text-black">
          <h2 className="text-lg font-bold mb-2">Historial de cambios</h2>
          <ul className="space-y-1">
            {selectedHistory.map((entry, i) => (
              <li key={i} className="text-sm">
                🕓 {entry.field} cambió de &quot;{entry.oldValue}&quot; a &quot;{entry.newValue}&quot; el{' '}
                {new Date(entry.changedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
