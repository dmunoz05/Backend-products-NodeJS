import jwt from 'jsonwebtoken'

// const secret = 'myCat'
// const tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwOTE0ODMzNH0.Jpf4KnjkbwAfKz3FHbQV6flf394fKGx6QZZM-cBhE7E'

// const payload = {
//     sub: 1,
//     role: 'customer'
// }

export function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15min'})
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}