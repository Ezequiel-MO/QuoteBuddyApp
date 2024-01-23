import { useRef, useState, FC } from 'react'
import * as yup from 'yup'
import { NotificationFormFields } from "./NotificationFormFields"
import { getInitialValues } from "./NotificationFormInitialValues"
import { SubmitInput } from 'src/components/atoms'
import { VALIDATIONS } from 'src/constants'
import { useFormHandling } from 'src/hooks'
import { INotafication } from "@interfaces/notification"
import { IEntertainment } from 'src/interfaces/entertainment'


interface NotificationMasterFormProps {
    submitForm: (
        data: INotafication,
        files: File[],
        endpoint: string,
        update: boolean
    ) => Promise<void>
    notification: INotafication // Assuming this is the correct type based on usage
    textContent: string
    setTextContent: React.Dispatch<React.SetStateAction<string>>
    update: boolean
}



export const NotificationMasterForm: FC<NotificationMasterFormProps> = ({
    submitForm,
    notification,
    textContent,
    setTextContent,
    update
}) => {

    const initialValues = getInitialValues(notification)
    const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.notification

    const { data, setData, errors, handleChange, handleBlur, validate } = useFormHandling(initialValues, validationSchema)

    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const isValid = await validate()
        const dataSubmit: INotafication = data
        dataSubmit.textContent = textContent  !== "<p><br></p>"  ? textContent : ""
        if (isValid) {
            submitForm(dataSubmit, [], "notifications", update)
        }
    }

    return (
        <div className="justify-center items-center">
            <form className="space-y-2" onSubmit={handleSubmitForm}>
                <NotificationFormFields
                    data={data}
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    textContent={textContent}
                    setTextContent={setTextContent}
                    update={update}
                />
                <div className="flex justify-center items-center">
                    <SubmitInput update={false} title="Notification" />
                </div>
            </form>
        </div>
    )
}