import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

const routes = (
    <Router>
      <Routes>
        <Route path='/' element = {<Login/>} />
        <Route path='/signup' element = {<SignUp/>} />
        <Route path='/home' element = {<Home/>} />
      </Routes>
    </Router>
  )

export default routes
