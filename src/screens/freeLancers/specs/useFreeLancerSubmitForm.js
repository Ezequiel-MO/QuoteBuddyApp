import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'

export const useFreeLancerForm = ({ onSuccess, onError, freeLancer }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event, data, update) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            if(update){
                await baseAPI.patch(`v1/freelancers/${freeLancer._id}`, data)
            }
            if(!update){
                await baseAPI.post("v1/freelancers" , data)
            }
            onSuccess(update)
        } catch (error) {
            onError(error)
        } finally {
            setIsLoading(false)
        }
    }
    return { handleSubmit, isLoading }

}