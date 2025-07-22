import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import Navbar from '../components/Navbar'
import PasswordInput from '../components/PasswordInput'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignUP = async (e) => {
    e.preventDefault()
    if(!email || !password){
      setError('All fields are required')
      return
    }

    try {
      const response = await axios.post(`${BASE_URL}auth/register`, {
        fullname: name,
        email: email,
        password: password
      }, {
        withCredentials: true
      })
      
      
      if(response.status === 201){
        navigate('/')
      }      
    }catch(error){
      if(error?.response?.data?.error) {
        setError(error.response.data.error)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    }
  }

  return (
    <div>

      <div className='flex items-center justify-center mt-20'>
        <div className='w-96 border rounded bg-white px-7 py-10 '>
          <form onSubmit={handleSignUP}>
          <h4 className='text-2xl mb-7'>Sign Up</h4>

            <input 
              type='text'
              value={name}
              placeholder='Name'
              className='input-box'
              onChange={(e) => {setName(e.target.value)}}
            />

            <input type="text" placeholder='Email' className='input-box' 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }
              }
            />

            <PasswordInput 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')}}
              placeholder={'Password'}
            />

            {err && <p className='text-red-500 text-xs pb-1'>{err}</p>}

            <button type='submit' className='btn-primary'>Create Account</button>
            <p className='text-sm mt-4 text-center'>Already have an account? <Link to={'/'} className='font-medium text-primary underline'>Login</Link></p>
          </form>
        </div>
      </div>
      
    </div>
  )
  
}

export default SignUp
