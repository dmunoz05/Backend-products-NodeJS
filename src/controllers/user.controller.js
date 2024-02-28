import sql from 'mssql'
import { getConnection } from "../database/connection.js";
import { hashPassword, verifyPassword } from "../utils/auth/handle-password.js"
import { generateToken, verifyToken } from "../utils/token/handle-token.js"

export const getUsers = async (req, res) => {
    const pool = await getConnection()
    const users = await pool.request().query('SELECT us.Id, us.Cedula, us.Nombre, us.telefono, us.Direccion, us.Estado_usuario, lo.username, lo.password  FROM tblusuario us INNER JOIN tblLogin lo ON us.id = lo.idUsuario')
    return res.send(users.recordsets[0])
}

export const createLogin = async (data) => {
    const { id, username, password } = data;
    const obj = await hashPassword({ id, username, password })
    const pool = await getConnection()
    const insert = await pool.request()
        .input('id', sql.Int, obj.id)
        .input('username', sql.VarChar, obj.username)
        .input('password', sql.VarChar, obj.password)
        .query('INSERT INTO tblLogin values(@id, @username, @password)')
    return insert
}

export const createUser = async (req, res) => {
    const { cedula, name, phone, direction, state_user, username, password } = req.body;
    const pool = await getConnection()
    const insertUser = await pool.request()
        .input('cedula', sql.Int, cedula)
        .input('name', sql.VarChar, name)
        .input('phone', sql.Int, phone)
        .input('direction', sql.VarChar, direction)
        .input('state_user', sql.VarChar, state_user)
        .query('Insert into tblusuario values(@cedula, @name, @phone, @direction, @state_user); SELECT SCOPE_IDENTITY() AS id')
    const id = insertUser.recordset[0].id
    const insertLogin = await createLogin({ id: id, username: username, password: password })
    return res.send({ user: insertUser, login: insertLogin })
}

export const searchUser = async (data) => {
    const { username } = data;
    const pool = await getConnection()
    const loginUser = await pool.request()
        .input("username", sql.VarChar, username)
        .query("SELECT * FROM tblLogin WHERE username = @username")
    return loginUser.recordset
}


export const loginUser = async (req, res) => {
    const userExist = await searchUser({ username: req.body.username, password: req.body.password })
    if (userExist.length > 0) {
        const id = userExist.idUsuario
        const username = userExist.username
        const isPassword = await verifyPassword(req.body.password, userExist[0].password)
        if (isPassword) {
            const payload = {
                sub: id,
                name: username
            }
            const token = generateToken(payload)
            res.send({ message: 'Success access', user: userExist, token: token })
        } else {
            res.send({ message: 'Invalid password or username' })
        }
    } else {
        res.send({ message: 'Invalid password or username' })
    }
}