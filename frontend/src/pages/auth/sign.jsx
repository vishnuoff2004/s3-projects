import React from 'react'
import { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Sign = () => {
  const api = import.meta.env.VITE_API_URL
  const [data,setData] = useState({
    name:'',
    email:'',
    contact:'',
    password:'',
    confirmPassword:''
  })

    
  const [msg,setMsg] = useState('')
  
  useEffect(()=>{
    if(msg == "registration sucessfull"){
      navigate('/login')
    }
  },[msg])

  function handleChange(e){
    // input change logic

    const {name,value} = e.target
    setData(prev => ({...prev,[name]:value}))
  }

  async function handleRegister(){
    // registration logic

    if(data.password !== data.confirmPassword){
      alert("passwords do not match")
    }

    await fetch(`${api}/auth/register`,
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      }
    ).then(res => res.json()).then(data => (alert(data.msg),setMsg(data.msg))).catch(err => console.log(err))
  }

  return (
    <>
    <div className="container">
      <h3>USER REGISTRATION</h3>

      <div className="container d-flex flex-column align-items-center">

        <div className="container">
          <label htmlFor="name">Name:</label>
         <input type="text" value={data.name} name="name" onChange={handleChange}/> <br />

         <label htmlFor="email">Email:</label>
          <input type="email" value={data.email} name="email" onChange={handleChange}/> <br />

          <label htmlFor="contact">Contact:</label>
          <input type="text" value={data.contact} name="contact" onChange={handleChange}/> <br />

          <label>Password:</label>
          <input type="password" value={data.password} name="password" onChange={handleChange}/> <br />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" value={data.confirmPassword} name="confirmPassword" onChange={handleChange}/> <br /> 

          <button onClick={handleRegister}>Register</button>

          <div>already have an account ? <Link to="/login">Login</Link></div>
        </div>
   
      </div>
    </div>
    </>
  )
}

export default Sign