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
