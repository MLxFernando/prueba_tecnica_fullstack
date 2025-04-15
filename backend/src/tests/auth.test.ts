import request from 'supertest'
import app from '../app'

describe('Auth Endpoints', () => {
  const user = {
    email: `user${Date.now()}@example.com`, 
    password: '123456'
  }

  it('debe registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(user)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user.email).toBe(user.email)
  })

  it('debe loguear un usuario existente', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(user)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.user.email).toBe(user.email)
  })
})
