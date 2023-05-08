import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from "../axios/axiosConfig"
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'

export const useGetGifts = (price) =>{
    const [isLoading , setIsLoading] = useState(false)
    const [gifts ,setGifts] = useState([])

    useEffect(()=>{
        const getGifts = async (price) =>{
            const filterOptions = ['price[lte]']
            const valuesRute = [
				{ name: 'price[lte]', value: price === 'none' ? undefined : price },
			]
            let url = "gifts"
            if(price){
                url = filter({
                    url:"gifts",
                    valuesRute:valuesRute,
                    filterOptions:filterOptions,
                    limit:100
                })
            }
            setIsLoading(true)
            try{
                const response = await baseAPI.get(url)
                setGifts(response.data.data.data)
                setIsLoading(false)
            }catch(error){
                toast.error(error , toastOptions)
            }
        }
        getGifts(price)
    },[price])
    return{gifts , setGifts , isLoading }
}