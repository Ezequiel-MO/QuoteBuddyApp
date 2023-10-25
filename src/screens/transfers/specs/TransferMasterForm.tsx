import { useState, useRef, useEffect, FC } from 'react'
import { SubmitInput } from '../../../components/atoms'
import { getInitialValues } from "./TransferFormInitialValues"
import { VALIDATIONS } from '../../../constants'
import { useFormHandling } from '../../../hooks'
import { TransferFormFields } from "./TransferFormFields"
import { ITransfer } from 'src/interfaces'
import * as yup from 'yup'

interface TransferMasterFormProps {
    submitForm: (
        data: ITransfer,
        files: File[],
        endpoint: string,
        update: boolean,
    ) => Promise<void>
    transfer: ITransfer
    update: boolean
    prevValues: ITransfer
}

export const TransferMasterForm: FC<TransferMasterFormProps> = ({ submitForm, transfer, update , prevValues }) => {
    const initialValues = getInitialValues(transfer)
    const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.transfer

    const { data, setData, handleChange, errors, handleBlur, validate } = useFormHandling(initialValues, validationSchema)

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = await validate()
        if (isValid) {
            submitForm(data, [], 'transfers', update,)
        }
    }

    //seteo los valores previos para que no se renicien si el servidor manda un error
	useEffect(() => {
		if (prevValues) {
			setData(prevValues)
		}
	}, [prevValues])

    return (
        <div className="justify-center items-center">
            <form className='space-y-2' onSubmit={handleSubmitForm}>
                <TransferFormFields
                    data={data}
                    setData={setData}
                    handleChange={handleChange}
                    errors={errors}
                    handleBlur={handleBlur}
                    update={update}
                />
                <div className='flex justify-center items-center'>
                    <SubmitInput update={update} title='Transfer' />
                </div>
            </form>
        </div>
    )
}