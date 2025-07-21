import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { userRouter } from './routes/user.routes.js'
import { noteRouter } from './routes/note.routes.js'
import { authRouter } from './routes/auth.routes.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/note', noteRouter)


app.get('/', (req, res) => {
  res.send("hello")
})

app.listen(process.env.PORT, ()=>{
  console.log("server running at", process.env.PORT)
})

