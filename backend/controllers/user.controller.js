import prisma from "../config/db.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//@register user
export const register = async (req, res) => {
  try{
    const {fullname, email, password} = req.body

    const isUser = await prisma.user.findUnique({
      where: {email: email}
    })

    if(isUser){
      return res.status(400).json({error: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: { fullname, email, password: hashedPassword }
    })

    return res.status(201).json({message: "Success", newUser})
  }catch(error){
    console.log(error);
    res.status(500).json({error: "Server Error", details: error})
  }
}


//@login user
export const login = async (req, res) => {
  try {
    const {email, password} = req.body 

    const user = await prisma.user.findUnique({
      where: {email: email}
    })

    if(!user){
      return res.status(400).json({error: "User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).json({error: "Invalid credentials"})
    }

    const token = await jwt.sign({id: user.id}, process.env.SECRET)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    })
    res.status(200).json({message: "Logged in", user})
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Server Error", details: error})
  }
}


