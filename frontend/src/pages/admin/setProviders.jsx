import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const SetProviders = () => {
    const [services,setServices] = useState({})
    const api = import.meta.env.VITE_API_URL
    const {id} = useParams()

    // useEffect(()=>{
    //    async function fetchServices(){
    //       await fetch(`${api}/admin/services/${id}`)
    //       .then(res => res.json())
    //       .then(data => setServices(data.data))
    //       .catch(err => console.log(err))
    //    }

    //    fetchServices()
    // },[])


  return (
    <>
      <h1>manage providers</h1>

      <div className="container">

        <div>
          <label htmlFor="">name:</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">phone:</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">skill:</label>
          <input type="text" />
        </div>
        
        <div>
          <label htmlFor="">is-available:</label>
          <div>
              <input type="radio" name="available"/> available <br />
              <input type="radio" name="available"/> not-available
          </div>
        </div>

        <div>
          <button>set providers</button>
        </div>
      </div>
    </>
  )
}

export default SetProviders