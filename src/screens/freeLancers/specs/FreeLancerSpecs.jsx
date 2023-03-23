import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from "../../../components/atoms/spinner/Spinner"
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { FreeLancerMasterForm, useFreeLancerForm } from "../"

export const FreeLancerSpecs = () => {
    const navigate = useNavigate()
    const { state: { freeLancer } } = useLocation()

    const onSuccess = (update) => {
        toast.success(`${update ? "FreeLancer updated " : "FreeLancer created "}` , toastOptions)
        setTimeout(() => {
            navigate('/app/freelancer')
        }, 1000)
    }

    const onError = (error) => {
        toast.error(`Error creating/updating FreeLancer, ${error.response.data.message}`,
            errorToastOptions)
    }

    const { isLoading, handleSubmit } = useFreeLancerForm({
        onSuccess,
        onError,
        freeLancer
    })

    return (
        <div>
            {
                isLoading ?
                    <Spinner /> :
                    <FreeLancerMasterForm
                        freeLancer={freeLancer}
                        handleSubmit={handleSubmit}
                    />
            }
        </div>
    )

}