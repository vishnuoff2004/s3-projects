import React from 'react'
import { useState,useEffect } from 'react'
import Nav from "../../components/nav"
import { useNavigate } from 'react-router-dom'

const ManageServices = () => {
    // API URL LINK

    const api = import.meta.env.VITE_API_URL

    const [services,setServices] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchData(){
            await fetch(`${api}/admin/serviceProvider`)
                .then(response => response.json())
                .then(data => setServices(data.data))
                .catch(err => console.log(err))
        }

        fetchData()
    },[])

    function handleAdd(id){
       navigate(`/set-provider/${id}`)
       console.log(id)
    }

    console.log(services)

  return (
    <>
        <Nav></Nav>
        <h1 className='ms-7 mt-3 font-medium font-serif text-2xl'>managing - services .....</h1>
        
        <div className='flex justify-center'>
            <div className="container h-screen ">
                
                <div className='container my-3 font-medium'>
                    <h6 className='text-green-500'>select services</h6>
                </div>

            <div className='flex justify-center mt-4'>
                <div className="grid grid-cols-4  gap-4 ">
                    {
                       services?.map((i) =>(
                        <div className='bg-violet-400 p-2 rounded-sm'>
                            <img src="../../../public/images.jfif" alt="" />
                            <div className='mt-2'>
                                <div className='flex justify-around'>
                                    <div className='font-medium text-dark'>service :</div>
                                    <div className='text-sm text-light'>{i.service_name}</div>
                                </div>

                                <div className='flex justify-around'>
                                    <div className='font-medium text-dark'>Description :</div>
                                    <div className='text-sm text-light'>{i.description}</div>
                                </div>

                                <div className='flex justify-around'>
                                    <div className='font-medium text-dark'>Price :</div>
                                    <div className='text-sm text-light'>{i.price}</div>
                                </div>

                                <div className='flex justify-around'>
                                    <div className='font-medium text-dark'>Duration :</div>
                                    <div className='text-sm text-light'>{i.duration}</div>
                                </div>

                                <button className='ml-3 bg-violet-600 mt-3 px-4 text-light font-medium rounded-sm border-1 border-light hover:bg-violet-400'
                                onClick={()=>handleAdd(i.id)}
                                >add</button>
                            </div>
                        </div>
                        )) 
                    }
                </div>
            </div>


            </div>
        </div>

    </>
  )
}

export default ManageServices