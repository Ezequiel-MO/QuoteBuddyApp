import { FC } from "react"
import { TextInput } from '@components/atoms'
import { SelectInput } from "@components/atoms"
import { optionsStatus, optionsType } from "./helperAndConstants"
import { ICollectionFromClient } from "@interfaces/collectionFromClient"

interface CollectionFromClientFormFieldsProps {
    data: ICollectionFromClient
    setData: React.Dispatch<React.SetStateAction<ICollectionFromClient>>
    errors: { [key: string]: string | undefined }
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}



export const CollectionFromClientFormFields: FC<CollectionFromClientFormFieldsProps> = ({
    data,
    setData,
    handleChange,
    errors,
    handleBlur
}) => {

    return (
        <fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
            <legend className="text-3xl text-green-500">
                Collection From Client Details
            </legend>
            <div className='flex space-x-4'>
                <div className="w-1/2">
                    <TextInput
                        label='Date'
                        placeholder=''
                        type='date'
                        name="dueDate"
                        value={data.dueDate}
                        handleChange={handleChange}
                        errors={errors.dueDate}
                        handleBlur={handleBlur}
                    />
                </div>
                <div className="w-1/2">
                    <TextInput
                        label='Amount'
                        placeholder='example: 40'
                        type='number'
                        name="amount"
                        value={data.amount}
                        handleChange={handleChange}
                        errors={errors.amount}
                        handleBlur={handleBlur}
                    />
                </div>
            </div>
            {/* <div>
                <SelectInput
                    titleLabel="type"
                    options={optionsType}
                    placeholderOption="-- select a type --"
                    key={"type"}
                    name="type"
                    value={data.type}
                    handleChange={handleChange}
                    errors={errors}
                    errorKey="type"
                    handleBlur={handleBlur}
                />
            </div> */}
            <div className="mt-4">
                <SelectInput
                    titleLabel="status"
                    options={optionsStatus}
                    placeholderOption="-- select a status --"
                    key={"status"}
                    name="status"
                    value={data.status}
                    handleChange={handleChange}
                    errors={errors}
                    errorKey="status"
                    handleBlur={handleBlur}
                />
            </div>
        </fieldset>
    )
}