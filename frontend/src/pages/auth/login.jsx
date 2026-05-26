import React,{useContext, useState} from 'react'
import { useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Auth from '../../context-api/authContext'
import {AuthContext} from "../../context-api/authContext"

const login = () => {
  const [user,setUser] = useState({
    isAdmin:false,
    isUser:true
  })

  const {token,setToken} = useContext(AuthContext)
  const [msg,setMsg] = useState('')

  const [data,setData] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate()

  const api = import.meta.env.VITE_API_URL

  useEffect(()=>{
    if(msg == "login successful"){
      navigate('/')
    }
  },[msg])

  async function handleLogin(){
    if(user.isAdmin){
      // admin login logic
      await fetch(`${api}/auth/admin`,
        {
          method:'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body:JSON.stringify(data)
        }
      ).then(res => res.json()).then(data =>(alert(data.msg),setMsg(data.msg),setToken(data.token),localStorage.setItem("token",data.token))).catch(err => console.log(err))
    }
    else{
      // user login logic
     await fetch(`${api}/auth/user`,
        {
          method:'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body:JSON.stringify(data)
        }
      ).then(res => res.json()).then(data =>(alert(data.msg),setMsg(data.msg),setToken(data.token),localStorage.setItem("token",data.token))).catch(err => console.log(err))
    }
    setData({
      email:'',
      password:''
    })

  }

  function handleChange(e){
    // input change logic
    const {name,value} = e.target
    setData(prev => ({...prev,[name]:value}))

  }


  return (
    <>
    <div className="container  flex justify-center items-center bg-violet-200 w-full h-screen">
         <div >
          <div className="container bg-violet-400 p-3 rounded hover:border-2 border-white">
          {
            user.isUser ? <h1 className='text-2xl font-bold text-center'>Login Page !!!</h1> : <h1 className='text-2xl font-bold text-center'>Admin Login Page</h1>
          }

          <div className='flex justify-between  bg-gray-300 p-1 rounded-sm my-3 mx-auto'>
             <button onClick={()=>setUser(prev => ({...prev,isUser:true,isAdmin:false}))}  className='w-full font-bold' style={{backgroundColor: user.isUser ? "oklch(70.2% 0.183 293.541)" : "white",color: user.isUser ? "white": "black", }}>user</button>  <button className='w-full ms-1 font-bold' onClick={()=>setUser(prev => ({...prev,isUser:false,isAdmin:true}))} style={{backgroundColor: user.isAdmin ?"oklch(70.2% 0.183 293.541)": "white",color: user.isAdmin ? "white": "black" }}>admin</button>
          </div>
          

          <div className="">
              <div>
                  <label htmlFor="email" className='font-medium text-black'>Email :</label>

                  <div className='mt-2'>
                    <div className='flex items-center rounded-md bg-white-500 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-800 border-2'>
                        <input type="email" 
                        value={data.email}
                        name="email" 
                        placeholder='vishnu@gmail.com'
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white focus:outline-none sm:text-sm/6"
                        onChange={handleChange}/>
                      </div>
                    </div>


                  <label htmlFor="email" className='font-medium text-black mt-3'>Password :</label>

                  <div className='mt-2'>
                    <div className='flex items-center rounded-md bg-white-500 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-800 border-2'>
                        <input type="email" 
                        value={data.password}
                        name="password" 
                        placeholder='* * * * * * *'
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white focus:outline-none sm:text-sm/6"
                        onChange={handleChange}/>
                      </div>
                    </div>


                  <div className='text-center'>
                   <button className='bg-violet-600 p-1 px-4 font-bold text-light rounded-sm my-3 hover:bg-violet-800' onClick={handleLogin}>login</button>
                  </div>

                    {
                    user.isUser &&
                    <p className='font-base'>Don't have an account ? <Link to="/register" className='text-white'>Register</Link></p>
                  }
              </div>
          </div>
           
      </div>
         </div>
    </div>
    </>
  )
}

export default login