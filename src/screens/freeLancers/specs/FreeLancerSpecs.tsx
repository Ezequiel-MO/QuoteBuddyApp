import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { FreeLancerMasterForm, useFreeLancerForm } from '..'
import { IFreelancer } from '@interfaces/freelancer'

export const FreeLancerSpecs = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const freeLancer = (location.state as { freeLancer: IFreelancer }).freeLancer

	const onSuccess = (update: boolean) => {
		toast.success(
			`${update ? 'FreeLancer updated ' : 'FreeLancer created '}`,
			toastOptions
		)
		setTimeout(() => {
			navigate('/app/freelancer')
		}, 1000)
	}

	const onError = (error: any) => {
		toast.error(
			`Error creating/updating FreeLancer, ${error.response.data.message}`,
			errorToastOptions
		)
	}

	const { isLoading, handleSubmit } = useFreeLancerForm({
		onSuccess,
		onError,
		freeLancer
	})

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<FreeLancerMasterForm
					freeLancer={freeLancer}
					handleSubmit={handleSubmit}
				/>
			)}
		</div>
	)
}
