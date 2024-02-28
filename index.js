import app from './app.js'
import { getConnection } from './src/database/connection.js'
import router from './src/routes/app.routes.js'

app.use(router)

app.listen(3000)

getConnection()