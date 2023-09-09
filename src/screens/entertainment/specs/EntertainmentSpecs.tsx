import { useState } from 'react'
import { Spinner } from '@components/atoms'
import { useEntertainmentSubmitForm } from './useEntertainmentSubmitForm'
import { EntertainmentMasterForm } from './EntertainmentMasterForm'
import { useLocation } from 'react-router-dom'

export const EntertainmentSpecs = () => {
	const [textContent, setTextContent] = useState<string>('')
	const {
		state: { entertainmentShow }
	} = useLocation()
	const { isLoading, handleSubmit } = useEntertainmentSubmitForm()

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
