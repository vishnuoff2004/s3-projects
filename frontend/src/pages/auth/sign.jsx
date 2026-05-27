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
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()
  const [err,setErr] = useState({})   
  const [msg,setMsg] = useState('')
  
  useEffect(()=>{
    if(msg == "registration sucessfull"){
      navigate('/login')
    }
  },[msg])

    useEffect(()=>{
      validation()
    },[data])
  

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

    setIsLoading(true)
    await fetch(`${api}/auth/register`,
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      }
    ).then(res => res.json()).then(data => (alert(data.msg),setMsg(data.msg))).catch(err => console.log(err))
    setIsLoading(false)
  }

 function validation(){

    const error ={}

    if(!data.email){
       error.email = "email is required"
    }

    if(!data.name){
       error.name = "name is required"
    }

    if(data.name.length<6){
      error.name = 'name must greater than 6'
    }

    if(data.contact.length<9){
      error.contact = 'contact number must be 10 digit'
    }

    if(!data.password){
       error.password = 'password is required'
    }

    if(data.password.length <6){
      error.password = "password needs at least 6 character"
    }

    setErr(error)
 }  

  return (
    <>
    <div className="container  flex justify-center items-center bg-violet-200 w-full h-screen">
        <div>
             <div className="container bg-violet-400 p-3 rounded hover:border-2 border-white">
      <h3  className='text-2xl font-bold text-center'>USER REGISTRATION</h3>

      <div>
                  <label htmlFor="name" className='font-medium text-black mt-3'>Name :</label>

                  <div className=''>
                    <div className='flex items-center rounded-md bg-white-500 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-800 border-2'>
                        <input 
                        type="text" 
                        value={data.name}
                        name="name" 
                        placeholder='vishnu krishna'
                        className="block  min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white focus:outline-none sm:text-sm/6"
                        onChange={handleChange}/>
                      </div>
                    </div>
                    {err.name && <p className='text-orange-300 ms-3 mt-1'>{err.name} !!!</p>}


                  <label htmlFor="email" className='font-medium text-black mt-1'>Email :</label>

                  <div className=''>
                    <div className='flex items-center rounded-md bg-white-500 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-800 border-2'>
                        <input 
                        type="email" 
                        value={data.email}
                        name="email" 
                        placeholder='vishnu@gmail.com'
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white focus:outline-none sm:text-sm/6"
                        onChange={handleChange}/>
                      </div>
                    </div>
                    {err.email && <p className='text-orange-300   ms-3 mt-1'>{err.email} !!!</p>}



                  <label htmlFor="contact" className='font-medium text-black mt-1'>Contact :</label>

                  <div className=''>
                    <div className='flex items-center rounded-md bg-white-500 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-800 border-2'>
                        <div className='font-bold'>+91</div>
                        <input 
                        type="number" 
                        value={data.contact}
                        name="contact" 
                        placeholder=' 8148929450'
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white focus:outline-none sm:text-sm/6"
                        onChange={handleChange}/>
                      </div>
                    </div>
                    {err.contact && <p className='text-orange-300  ms-3 mt-1'>{err.contact} !!!</p>}


                  <label htmlFor="password" className='font-medium text-black mt-1'>Password :</label>

                  <div className=''>
                    <div className='flex items-center rounded-md bg-white-500 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-800 border-2'>
                        <input 
                        type="text" 
                        value={data.password}
                        name="password" 
                        placeholder='* * * * * *'
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white focus:outline-none sm:text-sm/6"
                        onChange={handleChange}/>
                      </div>
                    </div>
                    {err.password && <p className='text-orange-300  ms-3 mt-1'>{err.password}  !!!</p>}


                  <label htmlFor="confrimPassword" className='font-medium text-black mt-1'>confrim - password :</label>

                  <div className=''>
                    <div className='flex items-center rounded-md bg-white-500 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-800 border-2'>
                        <input 
                        type="text" 
                        value={data.confirmPassword}
                        name="confirmPassword" 
                        placeholder='* * * * * *'
                        className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white focus:outline-none sm:text-sm/6"
                        onChange={handleChange}/>
                      </div>
                    </div>


                  <div className='text-center flex justify-content-center'>
                    {
                      !isLoading ? 
                   <button 
                    disabled={Object.keys(err).length >0}
                   className='bg-violet-600 p-1 px-4 font-bold text-light rounded-sm my-3 enabled:hover:bg-violet-800 disabled:opacity-50'  onClick={handleRegister}>Register</button>
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

          <div>Already have an account ? <Link to="/login" className='text-white'>Login</Link></div>
   
      </div>
    </div>
        </div>
    </div>
   
    </>
  )
}

export default Sign