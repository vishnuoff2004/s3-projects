import React,{useState} from 'react'
import { useParams } from 'react-router-dom'

const SetProviders = () => {
    const [provider,setProvider] = useState([])
    
    const {id} = useParams()


  return (
    <>
    <h1>set provider</h1>
    </>
  )
}

export default SetProviders