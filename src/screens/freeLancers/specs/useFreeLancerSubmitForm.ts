import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { IFreelancer } from '@interfaces/freelancer'

interface Props {
	onSuccess: (update: boolean) => void
	onError: (error: any) => void
	freeLancer: IFreelancer
}

export const useFreeLancerForm = ({
	onSuccess,
	onError,
	freeLancer
}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
		data: IFreelancer,
		update: boolean
	) => {
		event.preventDefault()
		setIsLoading(true)
		try {
			if (update) {
				await baseAPI.patch(`freelancers/${freeLancer._id}`, data)
			}
			if (!update) {
				await baseAPI.post('freelancers', data)
			}
			onSuccess(update)
		} catch (error) {
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}
	return { handleSubmit, isLoading }
}
