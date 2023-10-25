import { FC } from 'react'
import { Spinner } from '@components/atoms'
// import { TransferMasterForm } from './TransferMaster'
import {TransferMasterForm} from "./TransferMasterForm"
import { useLocation } from 'react-router-dom'
import {
    useOnErrorFormSubmit,
    useOnSuccessFormSubmit,
    useSubmitForm
} from 'src/hooks'
import { TransferFormData } from './TransferFormData'
import { ITransfer } from 'src/interfaces'

export const TransferSpecs: FC = () => {
    const {
        state: { transfer }
    } = useLocation()

    const update = Object.keys(transfer).length > 0 ? true : false

    const { onSuccess } = useOnSuccessFormSubmit(
        'Transfer',
        'transfer',
        update
    )

    const { onError } = useOnErrorFormSubmit('Transfer')

    const { isLoading, handleSubmit , prevValues } = useSubmitForm({
        onSuccess,
        onError,
        item: transfer as ITransfer,
        formDataMethods: TransferFormData
    })

    return (
        <div className="">
            {isLoading ? (
                <Spinner />
            ) : (
                <TransferMasterForm
                    submitForm={handleSubmit}
                    transfer={transfer}
                    update={update}
                    prevValues={prevValues}
                />
            )}
        </div>
    )
}

