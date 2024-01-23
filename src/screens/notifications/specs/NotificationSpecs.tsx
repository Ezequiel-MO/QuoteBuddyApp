import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import {
    useOnErrorFormSubmit,
    useOnSuccessFormSubmit,
    useSubmitForm
} from '../../../hooks'
import { NotificationFormData } from "./NotificationFormData"
import { NotificationMasterForm } from "./NotificationMasterForm"
import { INotafication } from "@interfaces/notification"

export const NotificationSpecs = () => {

    const location = useLocation()
    const notification = (
        location.state as { notification: INotafication }
    ).notification

    const update = Object.keys(notification).length > 0

    const [textContent, setTextContent] = useState<string>("")

    const { onSuccess } = useOnSuccessFormSubmit(
        'Notification',
        'notification',
        update
    )
    const { onError } = useOnErrorFormSubmit('Notification')

    const { isLoading, handleSubmit } = useSubmitForm({
        onSuccess,
        onError,
        item: notification,
        formDataMethods: NotificationFormData
    })


    return (
        <>
            {
                isLoading ?
                    <Spinner />
                    :
                    <NotificationMasterForm
                        notification={notification}
                        textContent={textContent}
                        setTextContent={setTextContent}
                        update={update}
                        submitForm={handleSubmit}
                    />
            }
        </>
    )
}