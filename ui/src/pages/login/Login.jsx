import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/context/AuthContext'
import './login.css'


const Login = () => {
    const [credential,setCredential] = useState({
         username:undefined,
         password:undefined
    })

   const {loading,error,dispatch} = useContext(AuthContext);
   const navigate = useNavigate()

   const handleChange =(e)=>{
       setCredential(prev=>({
           ...prev,[e.target.id]:e.target.value
       }))
   }

   const handleClick = async( e)=>{
       e.preventDefault();
       dispatch({type:"LOGIN_START"})

       try {
           const res = await axios.post("/auth/login",credential);
           dispatch({
               type:"LOGIN_SUCCESS",
               payload:res.data
           })
           navigate('/')

       } catch (error) {
           dispatch({
               type:"LOGIN_FAILURE",payload:error.response.data
           })
       }
       
   }

 

  return (
    <div className="login">
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput"/>
            <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput"/>
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}

        </div>
    </div>
  )
}

export default Login