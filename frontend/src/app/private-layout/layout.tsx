'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      {/* Barra de navegación */}
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/dashboard" className={pathname === '/dashboard' ? 'underline' : ''}>
            Dashboard
          </Link>
          <Link href="/tareas-eliminadas" className={pathname === '/tareas-eliminadas' ? 'underline' : ''}>
            Tareas eliminadas
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Cerrar sesión
        </button>
      </nav>

      {/* Contenido */}
      <main className="p-6">{children}</main>
    </div>
  );
}
