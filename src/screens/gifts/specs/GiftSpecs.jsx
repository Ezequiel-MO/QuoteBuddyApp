import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { GiftMasterForm, useGiftForm } from "../"

export const GiftSpecs = () => {
    const navigate = useNavigate()
    const { state: { gift } } = useLocation()
    const [formData, setFormData] = useState(null)

    const status = {
        create: 'Gift Created',
        updateGift: 'Gift Updated',
        error: "Error Creating/Updating gift"
    }

    const onSuccess = (update) => {
        toast.success(`${update ? status.updateGift : status.create}`, toastOptions)
        setTimeout(() => {
            navigate('/app/gift')
        }, 1000)
    }

    const onError = (error) => {
        toast.error(`${status.error}, ${error.response.data.message}`, errorToastOptions)
    }

    const { isLoading, handleSubmit } = useGiftForm({
        onSuccess: (update) => onSuccess(update),
        onError: (error) => onError(error),
        gift
    })

    return (
        <div>
            {
                isLoading ?
                    <Spinner />
                    :
                    <GiftMasterForm
                        gift={gift}
                        handleSubmit={handleSubmit}
                        formData={formData}
                        setFormData={setFormData}
                    />
            }
        </div>
    )
}