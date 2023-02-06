import { useState, useRef } from "react"
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import {
    useGetClients
} from '../../../hooks'
import CompanyMasterForm from "./CompanyMasterForm"

const CompanySpecs = () => {
    const fileInput = useRef()
    const {clients, isLoading , setClients} = useGetClients({all:"yes"})
    // console.log(clients)

    const [country, setCountry] = useState('')

    const [data, setData] = useState({
        name: "",
        address: "",
        employes: [],
        colorPalette: [],
        fonts: "",
        employees:[]
    })
    // console.log(country)


    const submitForm = async (event, files) => {
        event.preventDefault();
        let formData = new FormData()
        formData.append("name", data.name)
        formData.append("country", country)
        formData.append("address" , data.address)
        if (data.colorPalette.length > 0) {
            for (let i = 0; i < data.colorPalette.length; i++) {
                formData.append("colorPalette", data.colorPalette[i])
            }
        }
        for (let i = 0; i < files.files.length; i++) {
            formData.append('imageContentUrl', files.files[i])
        }
        if (data.fonts.length > 0) {
            const fonts = data.fonts.split(",").filter(el => el !== " ")
            for (let i = 0; i < fonts.length; i++) {
                formData.append("fonts", fonts[i])
            }
        }
        if(data.employees.length >0){
            let employees =data.employees.join(" ").split(" ").
            filter(el => el.length > 15)
            // console.log(employees)
            for(let i=0; i<employees.length; i++){
                formData.append("employees" , employees[i])
            }
        }

        try {
            // console.log(formData)
            //   await baseAPI.post('v1/company_features',formData)
            toast.success('Company Features Created', toastOptions)
            //   setTimeout(() => {
            //             navigate('/app/project')
            //         }, 1000)
        } catch (err) {
            console.log(err.response);
            toast.error(`Error Creating/Updating Company Features, ${err.response.data.msg}`,
                errorToastOptions)
        }
    }

    return (
        <>
            {/* <h1>Comming soon company form</h1> */}
            <CompanyMasterForm
                clients={clients}
                country={country}
                setCountry={setCountry}
                data={data}
                setData={setData}
                fileInput={fileInput}
                handleSubmit={submitForm}
            />
        </>
    )
}

export default CompanySpecs