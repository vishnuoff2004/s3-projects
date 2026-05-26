import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export default function Auth({children}){
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [user,setUser] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const api = import.meta.env.VITE_API_URL

    useEffect(()=>{
        async function fetchUser(){
            if(!token) return

            setIsLoading(true)
            await fetch(`${api}/verification/verifyDashboard`,{
                method:"GET",
                headers:{
                    "authorization":`Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setUser(data.data))
            .catch(err => console.log(err))
            setIsLoading(false)
        }

        fetchUser()
    },[token,api])

console.log(user)
    return(
        <AuthContext.Provider value={{setToken,token,user,isLoading}}>
            {
                children
            }
        </AuthContext.Provider>
    )
}