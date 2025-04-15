import request from 'supertest'
import app from '../app'

describe('Task Endpoints', () => {
  let token = ''
  const credentials = { email: 'test@example.com', password: '123456' }

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(credentials)

    if (!res.body?.token) {
      throw new Error('Error: No se pudo obtener el token. Verifica que el usuario exista y las credenciales sean correctas.')
    }

    token = res.body.token
  })

  let taskId = 0

  it('debe crear una nueva tarea', async () => {
    const nuevaTarea = {
      title: 'Tarea de prueba',
      description: 'Esta es una tarea para test',
      dueDate: '2025-04-30'
    }

    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(nuevaTarea)

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.title).toBe(nuevaTarea.title)

    taskId = res.body.id
  })

  it('debe listar las tareas del usuario', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })
})
