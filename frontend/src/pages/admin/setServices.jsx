import React,{useContext, useState} from 'react'
import { AuthContext } from '../../context-api/authContext'
import Nav from '../../components/nav'

const SetServices = () => {

    const api = import.meta.env.VITE_API_URL
    const [details,setDetails] = useState({
        service:'',
        description:'',
        price:'',
        duration:''
    })
    const {token} = useContext(AuthContext)

    function handleChange(e){
        const {name,value} = e.target;

        setDetails(prev => ({...prev,[name]:value}))
    }

    async function handleSet(){
        await fetch(`${api}/admin/service`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${token}`,
                "Content-Type":'application/json'
            },
            body:JSON.stringify(details)
        }).then(res => res.json())
        .then(data => alert(data.msg))
        .catch(err => console.log(err))
    }

  return (
    <>
    <Nav></Nav>
    <div className="d-flex justify-center items-center h-screen">
 <div className=" bg-violet-400 p-4 rounded border-2 border-black">

            <p className='font-bold text-2xl text-center pb-3'>Add - Services</p>

            <select name="" id="" className='w-full rounded-sm outline-none mb-3' name="service" onChange={handleChange}>
                <option value="">select - services</option>
                <option value="electrician">electrician</option>
                <option value="plumber">plumber</option>
                <option value="mechanic">mechanic</option>
                <option value="musician">musician</option>
                <option value="carpenter">carpenter</option>
            </select>

            <div>
                <label htmlFor="" className='font-medium'>Description</label>
                <div>
                    <textarea placeholder='i am electric worker' onChange={handleChange} name="description" value={details.description} id="" className='w-full rounded-sm outline-none ps-1 mb-2'></textarea>
                </div>
            </div>

            <div>
                <label htmlFor="" className='font-medium'>Price</label>
                <div >
                    <input placeholder='1000' onChange={handleChange} type="number" name='price' value={details.price} className='w-full rounded-sm outline-none mb-2 ps-1'/>
                </div>
            </div>

            <div>
                <label htmlFor=""  className='font-medium'>Duration</label>
                <div>
                    <input  onChange={handleChange} type="text" name="duration" value={details.value} placeholder='1hrs or 20min' className='mb-2 w-full rounded-sm outline-none ps-1'/>
                </div>
            </div>

            <div className='flex justify-center'>
               <button className='font-medium px-4 bg-violet-500 hover:bg-violet-600 rounded-sm my-3 text-white py-1' onClick={handleSet}>Add</button>
            </div>

        </div>
    </div>
    </>
  )
}

export default SetServices