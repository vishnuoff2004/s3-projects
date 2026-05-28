import React, { useEffect } from 'react'
import Nav from "../../components/nav";
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const SelectedServices = () => {
  const [services,setServices] = useState([])
  const {id} = useParams()
  const api = import.meta.env.VITE_API_URL
  console.log(api)

  useEffect(()=>{
    async function fetchSelectedServices(){
      await fetch(`${api}/user/selected-services?id=${id}`)
      .then(res => res.json())
      .then(data => setServices(data.data))
      .catch(err => console.log(err))
    }

    fetchSelectedServices()
  },[])

  return (
    <>
      <Nav/>

            <table class="border-collapse border-2 border-black rounded-sm text-center">
              <thead className='bg-violet-400'>
                <tr>
                    <th>worker_Name</th>
                    <th>phone</th>
                    <th>skill</th>
                    <th>description</th>
                    <th>price</th>
                    <th>action</th>
                </tr>
              </thead>
              <tbody>
                  {
                    services.map(i => (
                     <tr className='' key={i.id}>
                        <td>{i.name}</td>
                        <td> {i.phone}</td>
                        <td>{i.service_name}</td>
                        <td>{i.description}</td>
                        <td>{i.price}</td>
                        <td>
                          <button
                          className='bg-violet-400 hover:bg-violet-500 text-white font-medium px-3 rounded-sm'
                          >book now</button>
                        </td>
                     </tr>
                    ))
                  }
              </tbody>

            </table>
    </>
  )
}

export default SelectedServices