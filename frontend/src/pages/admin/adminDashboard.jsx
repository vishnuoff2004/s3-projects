import React, { useEffect } from 'react'
import Nav from "../../components/nav"
import { useState,useContext} from 'react'
import { AuthContext } from '../../context-api/authContext'

const AdminDashboard = () => {
  const [data,setData] = useState([])
  const api = import.meta.env.VITE_API_URL
  const {token,user} = useContext(AuthContext)
  
  const [openModal,setOpenModal] = useState(false)

  const [editData,setEditData] = useState({
    id:'',
    name:'',
    phone:'',
    service_name:'',
    description:'',
    price:'',
    isAvailable:''
  })

  useEffect(()=>{
    async function fetchProvider(){
      await fetch(`${api}/admin/fetchProviders`,
        {
          method:"GET",
          headers:{
            "authorization":`Bearer ${token}`,
            "Content-Type":'application/json'
          }
        }
      )
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch(err => console.log(err))
    }

    fetchProvider()
  },[])


  async function handleEdit(data){

      setOpenModal(true)

      setEditData({
        id:data.id,
        name:data.name,
        phone:data.phone,
        service_name:data.service_name,
        description:data.description,
        price:data.price,
        isAvailable:data.isAvailable
      })
  }

  async function handleDelete(id){
      await fetch(`${api}/admin/deleteProviders/${id}`,
        {
        method:'DELETE',
        headers:{
            "authorization":`Bearer ${token}`,
        }
      }
    )
      .then(res => res.json())
      .then(data => alert(data.msg))
      .catch(err => console.log(err))

       setData(prev => prev.filter(i => i.id != id))
  }

  async function handleUpdate(){
        await fetch(`${api}/admin/updateProviders`,
            {
            method:'PUT',
            headers:{
                "authorization":`Bearer ${token}`,
                "Content-Type":'application/json'
            },
            body:JSON.stringify(editData)
          }
      ).then(res => res.json())
      .then(data => alert(data.msg))
      .catch(err => console.log(err))

      setData(prev => prev.map(i => i.id === editData.id ? editData : i))
  }

  return (
    <div>
        <Nav></Nav>
        

        <div className='flex justify-center align-items-center tab-con'>
        <div>
        <div className='mb-2'>
           <input type="text" placeholder='search ..' className='me-5 ps-2'/>

           <select name="" id="">
            <option value="">select-available-status</option>
            <option value="">avaialble</option>
            <option value="">not-available</option>
           </select>
        </div>
            <table class="border-collapse border-2 border-black rounded-sm text-center">
              <thead className='bg-violet-400'>
                <tr>
                    <th>worker_Name</th>
                    <th>phone</th>
                    <th>skill</th>
                    <th>description</th>
                    <th>price</th>
                    <th>set-available-status</th>
                    <th>actions</th>
                </tr>
              </thead>
              <tbody>
                  {
                    data.map(i => (
                     <tr className='' key={i.id}>
                        <td>{i.name}</td>
                        <td> {i.phone}</td>
                        <td>{i.service_name}</td>
                        <td>{i.description}</td>
                        <td>{i.price}</td>
                        <td>{i.isAvailable == 0 ? <span className='bg-green-400 rounded-full px-2'>available</span>: <span className='bg-red-400 rounded-full px-2'>not-available</span>}</td>
                        <td>
                          <div className='flex justify-around'>
                            <button className='bg-green-300 rounded-sm me-1 p-1' onClick={()=>handleEdit(i)}>
                            edit
                            </button>
                            <button className='bg-red-300 rounded-sm' onClick={()=>handleDelete(i.id)}>delete</button>
                          </div>
                        </td>
                     </tr>
                    ))
                  }
              </tbody>

            </table>
                  <div className='flex justify-around mt-4'>
                      <div>no.of pages 2/4</div>
                      <div>
                        <button className='bg-gray-500 px-3 me-2 py-1 text-light'>prev</button>
                        <button className='bg-gray-500 px-3 py-1 text-light'>next</button>
                      </div>
                  </div>

                                        {
                        openModal &&
                        <div className='fixed inset-0 bg-violet-100  flex justify-center items-center'>

                            <div className='bg-white p-4 rounded w-[400px]'>

                                <div className='flex justify-between mb-3'>
                                    <h3>Edit Provider</h3>

                                    <button
                                    onClick={()=>setOpenModal(false)}
                                    className='bg-red-400 px-2 rounded'
                                    >
                                      x
                                    </button>
                                </div>


                                <input
                                type="text"
                                value={editData.name}
                                onChange={(e)=>setEditData({...editData,name:e.target.value})}
                                placeholder='name'
                                className='border w-full mb-2 ps-2'
                                />



                                <input
                                type="text"
                                value={editData.phone}
                                onChange={(e)=>setEditData({...editData,phone:e.target.value})}
                                placeholder='phone'
                                className='border w-full mb-2 ps-2'
                                />



                                <input
                                type="text"
                                value={editData.service_name}
                                onChange={(e)=>setEditData({...editData,service_name:e.target.value})}
                                placeholder='service'
                                className='border w-full mb-2 ps-2'
                                />



                                <input
                                type="text"
                                value={editData.description}
                                onChange={(e)=>setEditData({...editData,description:e.target.value})}
                                placeholder='description'
                                className='border w-full mb-2 ps-2'
                                />



                                <input
                                type="text"
                                value={editData.price}
                                onChange={(e)=>setEditData({...editData,price:e.target.value})}
                                placeholder='price'
                                className='border w-full mb-2 ps-2'
                                />



                                <select
                                value={editData.isAvailable}
                                onChange={(e)=>setEditData({...editData,isAvailable:e.target.value})}
                                className='border w-full mb-3 ps-2'
                                >
                                    <option value="0">available</option>
                                    <option value="1">not available</option>
                                </select>



                                <button className='bg-green-400 px-3 py-1 rounded ' onClick={()=>handleUpdate()}>
                                    update
                                </button>

                            </div>

                        </div>
                      }
        </div>
        </div>
    </div>
  )
}

export default AdminDashboard