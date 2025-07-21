import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token 

  if(!token){
    return res.status(401).json({error: "User unauthorized"})
  }

  try{
    const decoded = await jwt.verify(token, process.env.SECRET)
    req.user = decoded
    next()
  }catch(error){
    console.log(error);
    res.status(400).json({error: "User Unauthorized"})
  }
}