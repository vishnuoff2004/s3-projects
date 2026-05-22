import React from 'react'
import { useState } from 'react'

const ManageServices = () => {
    // API URL LINK

    const api = import.meta.env.VITE_API_URL

    const [data,setData] = useState([])

    useEffect(()=>{
        async function fetchData(){
            await fetch(`${api}/services`)
                .then(response => response.json())
                .then(data => setData(data))
                .catch(err => console.log(err))
        }

        fetchData()
    },[])

  return (
    <>
        <h1>managing - services .....</h1>

        <div>
            <div className="container">
                
                <h6>select services</h6>
                <select>
                    {
                        data.map( i =>(
                            <option>{i.name}</option>
                        ))
                    }
                </select>

            </div>
        </div>

    </>
  )
}

export default ManageServices