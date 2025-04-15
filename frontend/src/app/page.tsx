
// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

// export default function Home() {
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem('token')

//     if (token) {
//       router.replace('/tasks')
//     } else {
//       router.replace('/login')
//     }
//   }, [router])

//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       <p className="text-lg text-gray-600">Redireccionando...</p>
//     </main>
//   )
// }

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/tasks');
}