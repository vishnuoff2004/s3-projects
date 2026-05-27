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
  const [isLoading,setIsLoading] = useState(false)

  const [err,setErr] = useState({})
  const {token,setToken} = useContext(AuthContext)
  const [msg,setMsg] = useState('')

  const [data,setData] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate()

  const api = import.meta.env.VITE_API_URL
 
  useEffect(()=>{
    validation()
  },[data])

  useEffect(()=>{
    if(msg == "login successful"){
      navigate('/admin')
    }
  },[msg])

  console.log(isLoading)

  async function handleLogin(){
    if(user.isAdmin){
      // admin login logic
      setIsLoading(true)
      await fetch(`${api}/auth/admin`,
        {
          method:'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body:JSON.stringify(data)
        }
      ).then(res => res.json()).then(data =>(alert(data.msg),setMsg(data.msg),setToken(data.token),localStorage.setItem("token",data.token))).catch(err => console.log(err))
      setIsLoading(false)
    }
    else{
      // user login logic
    setIsLoading(true)
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
    setIsLoading(false)
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

 function validation(){

    let error ={}

    if(!data.email){
       error.email = "email is required"
    }
    else if(!data.email.includes("@gmail.com")){
      error.email = "email feild required @gmail.com"
    }
    else if(!data.password){
       error.password = 'password is required'
    }
    else if(data.password.length <6){
      error.password = "password needs at least 6 character"
    }
    else{
      error = {}
    }

    setErr(error)
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
                    {err.email && <p className='text-orange-200 ms-3 mt-1'>{err.email} !!!</p>}

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
                    {err.password && <p className='text-orange-200 ms-3 mt-1'>{err.password}  !!!</p>}

                  <div className='text-center flex justify-center'>
                    {
                      !isLoading ? 
                      <button
                       disabled={Object.keys(err).length >0}  
                       className='disabled:opacity-50 bg-violet-600 p-1 px-4 font-bold text-light rounded-sm my-3 enabled:hover:bg-violet-800' onClick={handleLogin}>login</button>
                      :
                      <button
                        type="button"
                        disabled
                        className="bg-violet-500 text-white p-1 px-4 rounded flex items-center disabled:opacity-75 my-3"
                      >
                        <svg
                          className="mr-3 size-5 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        loading ...
                      </button>
                    }
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