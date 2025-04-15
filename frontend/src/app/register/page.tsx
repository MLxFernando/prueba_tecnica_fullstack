'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">Crear cuenta</h1>

        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          value={form.email}
          className="w-full border border-gray-300 px-4 py-2 rounded text-gray-800 placeholder-gray-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={form.password}
          className="w-full border border-gray-300 px-4 py-2 rounded text-gray-800 placeholder-gray-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Registrarse
        </button>

        <p className="text-center text-sm">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 underline">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}
