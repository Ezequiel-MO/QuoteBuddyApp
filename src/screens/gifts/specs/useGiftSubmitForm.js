import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import {GiftFormData} from "./GiftFormData"

export const useGiftForm = ({onSuccess, onError, gift }) =>{
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (event, values, files,  update ,endpoint ) =>{
        event.preventDefault()
        setIsLoading(true)
        try{
            if(!update){
                const dataPost = GiftFormData.create(values, files)
                await baseAPI.post("gifts", dataPost)
            }
            onSuccess(update)
        }catch(error){
            onError(error)
        }finally{
            setIsLoading(false)
        }
    }
    return{handleSubmit , isLoading}
}