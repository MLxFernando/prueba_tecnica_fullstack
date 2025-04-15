const API_BASE_URL = 'http://localhost:3001/api'; 

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error('Credenciales inválidas');
  }

  return res.json();
};

export const registerUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error('No se pudo registrar');
  }

  return res.json();
};

export const fetchTasks = async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!res.ok) throw new Error('No autorizado');
    return res.json();
  };
  
  export const createTask = async (
    token: string,
    data: { title: string; description: string; dueDate: string }
  ) => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (!res.ok) throw new Error('Error al crear la tarea');
    return res.json();
  };
  
  // Marcar como completada 
export const toggleTaskCompleted = async (token: string, taskId: string, completed: boolean) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });
  
    if (!res.ok) throw new Error('No se pudo actualizar la tarea');
    return res.json();
  };
  
  // Eliminar (soft delete)
  export const deleteTask = async (token: string, taskId: string) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!res.ok) throw new Error('No se pudo eliminar la tarea');
  };
  
  // Restaurar tarea
  export const restoreTask = async (token: string, taskId: string) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${taskId}/restore`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!res.ok) throw new Error('No se pudo restaurar la tarea');
    return res.json();
  };
  