import React,{useState} from 'react'
import { useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'

const login = () => {
  const [user,setUser] = useState({
    isAdmin:false,
    isUser:true
  })

  const [msg,setMsg] = useState('')

  const [data,setData] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate()

  const api = import.meta.env.VITE_API_URL
  console.log(api)

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
      ).then(res => res.json()).then(data =>(alert(data.msg),setMsg(data.msg),localStorage.setItem("token",data.token))).catch(err => console.log(err))
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
      ).then(res => res.json()).then(data =>(alert(data.msg),setMsg(data.msg),localStorage.setItem("token",data.token))).catch(err => console.log(err))
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
      <div className="container">
          {
            user.isUser ? <h1>Login Page</h1> : <h1>Admin Login Page</h1>
          }

          
             <button onClick={()=>setUser(prev => ({...prev,isUser:true,isAdmin:false}))} style={{backgroundColor: user.isUser ? "blue": "white",color: user.isUser ? "white": "black", }}>user</button> : <button onClick={()=>setUser(prev => ({...prev,isUser:false,isAdmin:true}))} style={{backgroundColor: user.isAdmin ? "blue": "white",color: user.isAdmin ? "white": "black" }}>admin</button>
          

          <div className="container">
              <div>
                  <label htmlFor="email">Email :</label>
                   <input type="email" value={data.email} name="email" onChange={handleChange}/> <br />

                   <label>Password :</label>
                   <input type="password" value={data.password} name="password" onChange={handleChange}/>  <br/>

                   <button onClick={handleLogin}>login</button>

                    {
                    user.isUser &&
                    <p>Don't have an account ? <Link to="/register">Register</Link></p>
                  }
              </div>
          </div>
           
      </div>
    </>
  )
}

export default login