import express from 'express'
import dotenv from './config.js'
import cors from 'cors'
// import { LocalStrategy } from './src/utils/strategies/local.strategy.js'

dotenv.config()

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express()

app.use(express.json())

app.use(cors(corsOptions))

export default app