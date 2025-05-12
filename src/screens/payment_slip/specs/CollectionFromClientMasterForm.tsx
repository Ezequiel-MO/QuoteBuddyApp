import { FC } from 'react'
import { SubmitInput } from '../../../components/atoms'
import { VALIDATIONS } from '../../../constants'
import { getInitialValues } from './CollectionFromClietInitialValues'
import { usePaymentSlip } from '../context/PaymentSlipContext'
import { CollectionFromClientFormFields } from './CollectionFromClientFormFields'
import { ICollectionFromClient } from 'src/interfaces'
import * as yup from 'yup'
import { useFormHandling } from '../hooks/useFormHandling'

interface CollectionFromClientMasterFormProps {
	submitForm: (values: ICollectionFromClient) => Promise<void>
}

export const CollectionFromClientMasterForm: FC<
	CollectionFromClientMasterFormProps
> = ({ submitForm }) => {
	const { isUpdate, stateProject, collectionFromClient } = usePaymentSlip()

	const initialValues = getInitialValues(
		collectionFromClient as ICollectionFromClient
	)
	const validationSchema: yup.ObjectSchema<any> =
		VALIDATIONS.collectionFromClient

	const { data, setData, handleChange, errors, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()
		const collectionFromClientData: ICollectionFromClient = data
		collectionFromClientData.projectId = stateProject?._id ?? ''
		collectionFromClientData.clientCompanyId =
			stateProject?.clientCompany[0]._id ?? ''
		if (isValid) {
			submitForm(collectionFromClientData)
		}
	}

	return (
		<div className="justify-center items-center">
			<form className="space-y-2" onSubmit={handleSubmit}>
				<CollectionFromClientFormFields
					data={data}
					setData={setData}
					handleChange={handleChange}
					errors={errors}
					handleBlur={handleBlur}
				/>
				<div className="flex justify-center items-center">
					<SubmitInput update={isUpdate} title="" />
				</div>
			</form>
		</div>
	)
}
