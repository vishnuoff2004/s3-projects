import React,{useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context-api/authContext'

const SetProviders = () => {
    const [services,setServices] = useState({})
    const [data,setData] = useState({
      name:'',
      phone:'',
      skill_type:"",
      isAvailable:false
    })
    const api = import.meta.env.VITE_API_URL
    const {token} = useContext(AuthContext)
    const {id} = useParams()

    useEffect(()=>{
       async function fetchServices(){
          await fetch(`${api}/admin/service?id=${id}`,
            {
              method:'GET',
              headers:{
                "authorization":`Bearer ${token}`
              }
            }
          )
          .then(res => res.json())
          .then(data => setServices(data.data))
          .catch(err => console.log(err))
       }

       fetchServices()
    },[])

    async function setProvider(){
      await fetch(`${api}/admin/addProviders`,{
        method:"POST",
        headers:{
          "authorization":`Bearer ${token}`,
          "Content-Type":'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(res =>res.json())
      .then(data => alert(data.msg))
      .catch(err => console.log(err))
    }

    function handleChange(e){
      const {name,value} = e.target;

      setData(prev => ({...prev,[name]:
        name == "isAvailable" ? !prev.isAvailable :
        value,skill_type:services[0]?.id}))
    }


    console.log(data)

  return (
    <>
    <div className='flex justify-center items-center h-screen'>
        <div className='container bg-violet-400 w-1/4 p-3 rounded-sm'>
          <h1 className='text-black font-serif text-3xl font-medium mb-3'>manage providers</h1>
          <h5 className='text-2xl font-medium'>service : {services[0]?.service_name}</h5>

        <div className="container">

          <div className='mt-2'>
            <label htmlFor="" className='text-black'>name:</label>
            <div className='border-2 border-white  rounded-md py-1'>
            <input 
            type="text" name="name" value={data.name} 
            className='outline-none ps-3  bg-transparent w-full placeholder:text-white' placeholder='vishnu' 
            onChange={handleChange}
            />
            </div>
          </div>


          <div className='mt-2'>
            <label htmlFor="" className='text-black'>phone:</label>
                    <div className=''>
                      <div className='flex items-center rounded-md bg-white-500 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-800 border-2'>
                          <div className='font-bold'>+91</div>
                          <input 
                          type="number" 
                          name="phone" value={data.phone}
                          placeholder=' 8148929450'
                          className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-white focus:outline-none sm:text-sm/6"
                          onChange={handleChange}
                      />
                        </div>
                      </div>
          </div>

          <div className='mt-2'>
            <label htmlFor="" className='text-black'>skill:</label>
            <div className='border-2 border-white-50  rounded-md py-1 py-1'>
            <input disabled placeholder={services[0]?.service_name} value={services.service_name} type="text" className='outline-none ps-1   bg-transparent w-full diabled:placeholder:opacity-75' placeholder:text-black-200/>
            </div>
          </div>
          
          <div className='mt-2'>
            <label htmlFor="" className='text-black'>is-available:</label>
            <div className='ms-8 ps-4'>
                <input type="radio" name="isAvailable"   onChange={handleChange}/> available <br />
                <input type="radio" name="isAvailable"  onChange={handleChange}/> not-available
            </div>
          </div>

          <div className='my-4 flex justify-center'>
            <button className='bg-violet-600 hover:bg-violet-700 px-3 py-1 rounded-md text-light text-medium' onClick={setProvider}>set providers</button>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default SetProviders




