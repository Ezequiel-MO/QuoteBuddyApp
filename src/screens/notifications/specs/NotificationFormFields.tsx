import { FC } from 'react'
import { TextInput } from '@components/atoms'
import { RichTextEditor } from '../../../components/molecules'
import { INotafication } from "@interfaces/notification"

interface NotificationFormFieldsProps {
    data: INotafication
    errors: { [key: string]: string | undefined }
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    setTextContent: React.Dispatch<React.SetStateAction<string>>
    textContent: string
    update: boolean
}

export const NotificationFormFields: FC<NotificationFormFieldsProps> = ({
    data,
    errors,
    handleChange,
    handleBlur,
    setTextContent,
    textContent,
    update
}) => {

    return (
        <fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
            <legend >
                <h1 className="text-3xl text-white-0">General Notification Data</h1>
            </legend>
            <div className="space-y-4">
                <TextInput
                    label={"Title"}
                    placeholder='Title the notification'
                    type='text'
                    name="title"
                    value={data.title}
                    handleChange={handleChange}
                    errors={errors.title}
                    handleBlur={handleBlur}
                />
            </div>
            <div className="my-3 text-white-100">
                <RichTextEditor
                    screen={data}
                    setTextContent={setTextContent}
                    textContent={textContent}
                    update={update}
                    style={{ width: '101%', marginBottom: '15px' }}
                />
            </div>
        </fieldset>
    )
}
