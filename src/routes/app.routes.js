import express from 'express'
import { getUsers, createUser, loginUser } from '../controllers/user.controller.js'
import { getProducts, getProduct, createProduct, deleteProduct, updateProduct } from '../controllers/product.controller.js'
import { checkApiKey } from "../middlewares/auth.api-key.js"
import { checkToken } from '../middlewares/auth.jwt.js'

const router = express.Router()

router.get("/users", checkApiKey, getUsers)

router.post("/create/user", checkApiKey, createUser)

router.post("/login", loginUser)

router.get('/products', checkToken, getProducts)

router.get('/product/:id', checkToken, getProduct)

router.post('/product', checkToken, createProduct)

router.put('/product/:id', checkToken, updateProduct)

router.delete('/product/:id', checkToken, deleteProduct )

export default router