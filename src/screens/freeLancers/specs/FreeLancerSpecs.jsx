import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from "../../../components/atoms/spinner/Spinner"
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { FreeLancerMasterForm } from "../"
import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'

export const FreeLancerSpecs = () => {
    const navigate = useNavigate()
    const { state: { freeLancer } } = useLocation()

    const freeLancerFromData = (data) => {
        let formData = new FormData()
        formData.append("firstName", data.firstName)
        formData.append("familyName", data.familyName)
        formData.append("email", data.email)
        formData.append("phone", data.phone)
        formData.append("halfDayRate", data.halfDayRate)
        formData.append("fullDayRate", data.fullDayRate)
        formData.append("languageSupplement", data.languageSupplement)
        formData.append("weekendHDRate", data.weekendHDRate)
        formData.append("weekendFDRate", data.weekendFDRate)
        formData.append("type", data.type)
        formData.append("city", data.city)
        return {
            firstName: formData.get("firstName"),
            familyName: formData.get("familyName"),
            email: formData.get("email"),
            phone: formData.get("phone") ,
            halfDayRate: formData.get("halfDayRate"),
            fullDayRate: formData.get("fullDayRate"),
            languageSupplement: formData.get("languageSupplement"),
            weekendHDRate: formData.get("weekendHDRate"),
            weekendFDRate: formData.get("weekendFDRate"),
            type: formData.get("type"),
            city: formData.get("city")
        }
    }

    const submitForm = async (event, data) => {
        event.preventDefault()
        let formData = freeLancerFromData(data)
        try{
            console.log(formData)
            await baseAPI.post("v1/freelancers" ,formData)
            toast.success("FreeLancer created" , toastOptions)
            setTimeout(() => {
				navigate('/app/freelancers')
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