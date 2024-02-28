import sql from 'mssql'

const objConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export const getConnection = async () => {
    try {
        const pool = await sql.connect(objConfig);
        console.log('Servidor conectado');
        return pool
    } catch (error) {
        console.log('Servidor no conectado ', error);
    }
}