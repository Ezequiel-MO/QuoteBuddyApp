import { useState } from 'react'
import { Spinner } from '@components/atoms'
import { useEntertainmentSubmitForm } from './useEntertainmentSubmitForm'
import { EntertainmentMasterForm } from './EntertainmentMasterForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from '../../../helper/toast'

export const EntertainmentSpecs = () => {
	const navigate = useNavigate()
	const [textContent, setTextContent] = useState<string>('')
	const {
		state: { entertainmentShow }
	} = useLocation()

	const onSuccess = (update: boolean) => {
		toast.success(
			`${update ? 'Entertainment updated ' : 'Entertainment created '}`,
			toastOptions
		)
		setTimeout(() => {
			navigate('/app/entertainment')
		}, 1000)
	}
	const onError = (error: any) => {
		toast.error(
			`Error creating/updating Entertainment, ${error.response.data.message}`,
			errorToastOptions as any
		)
	}

	const { isLoading, handleSubmit } = useEntertainmentSubmitForm({
		onSuccess,
		onError,
		entertainmentShow
	})

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<EntertainmentMasterForm
					entertainmentShow={entertainmentShow}
					handleSubmit={handleSubmit}
					textContent={textContent}
					setTextContent={setTextContent}
				/>
			)}
		</>
	)
}
