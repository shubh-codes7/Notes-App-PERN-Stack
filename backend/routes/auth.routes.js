import {Router} from 'express'
import { login, register } from '../controllers/user.controller.js'


export const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)