import {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { UserContext } from '../UserContextWrapper'
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setError] = useState(null)
  const navigate = useNavigate()

  const {setUser} = useContext(UserContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    if(!email || !password){
      setError('All fields are required')
      return
    }

    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email: email,
        password: password
      }, {
        withCredentials: true
      })
      
      setUser(response.data.user)
      
      if(response.status === 200){
        navigate('/home')
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
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10 '>
          <form onSubmit={(e) => handleLogin(e)}>
          <h4 className='text-2xl mb-7'>Login</h4>

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

            <button type='submit' className='btn-primary'>Login</button>
            <p className='text-sm mt-4 text-center'>Not registered yet? <Link to={'/signup'} className='font-medium text-primary underline'>create an account</Link></p>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Login