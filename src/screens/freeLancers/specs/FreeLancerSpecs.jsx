import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from "../../../components/atoms/spinner/Spinner"
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { FreeLancerMasterForm, freeLancerFromData } from "../"
import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'

export const FreeLancerSpecs = () => {
    const navigate = useNavigate()
    const { state: { freeLancer } } = useLocation()

    const submitForm = async (event, data) => {
        event.preventDefault()
        let formData = freeLancerFromData(data)
        try{
            await baseAPI.post("v1/freelancers" ,formData)
            toast.success("FreeLancer created" , toastOptions)
            setTimeout(() => {
				navigate('/app/freelancer')
			}, 1000)
        }catch(err){
            toast.error("Error creating FreeLancer" , errorToastOptions)
        }
    }

    return (
        <div>
            <FreeLancerMasterForm
                freeLancer={freeLancer}
                handleSubmit={submitForm}
            />
        </div>
    )

}