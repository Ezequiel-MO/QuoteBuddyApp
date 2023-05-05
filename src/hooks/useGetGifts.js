import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from "../axios/axiosConfig"
import { toastOptions } from '../helper/toast'

export const useGetGifts = () =>{
    const [isLoading , setIsLoading] = useState(false)
    const [gifts ,setGifts] = useState([])

    useEffect(()=>{
        const getGifts = async () =>{
            let url = "gifts"
            setIsLoading(true)
            try{
                const response = await baseAPI.get(url)
                setGifts(response.data.data.data)
                setIsLoading(false)
            }catch(error){
                toast.error(error , toastOptions)
            }
        }
        getGifts()
    },[])
    return{gifts , setGifts , isLoading }
}