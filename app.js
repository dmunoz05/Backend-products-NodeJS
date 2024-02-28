import express from 'express'
import dotenv from './config.js'
import passport from 'passport'
// import { LocalStrategy } from './src/utils/strategies/local.strategy.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use(passport.initialize());

// passport.use(new LocalStrategy())

export default app