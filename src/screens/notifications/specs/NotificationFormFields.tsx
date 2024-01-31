import { FC } from 'react'
import { TextInput } from '@components/atoms'
import { RichTextEditor } from '../../../components/molecules'
import { SelectAccManagers } from "./SelectAccManagers"
import { SelectedAccManagersBox } from "./SelectedAccManagersBox"
import { SelectModule } from "./SelectModule"
import { INotafication } from "@interfaces/notification"

interface NotificationFormFieldsProps {
    data: INotafication
    setData: React.Dispatch<React.SetStateAction<any>>
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

const modulesTypes = [
    { value: "DBMaster", name: "DB Master" },
    { value: "Projects", name: "Projects" },
    { value: "FinancialReports", name: "Financial Reports" },
    { value: "General", name: "General" }
]


export const NotificationFormFields: FC<NotificationFormFieldsProps> = ({
    data,
    setData,
    errors,
    handleChange,
    handleBlur,
    setTextContent,
    textContent,
    update
}) => {

    return (
        <fieldset className="max-w-xl mx-auto p-4 bg-gray-800 rounded-lg">
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
            <div className='mt-3'>
                <SelectModule options={modulesTypes} handleChange={handleChange} module={data.module} />
            </div>
            <div>
                <label className="block uppercase text-lg text-gray-400 font-medium mb-0.5 mt-3">
                    Group Location
                </label>
                <SelectAccManagers data={data} setData={setData} />
                <SelectedAccManagersBox accManegers={data.accManagers as string[]} setData={setData} />
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
