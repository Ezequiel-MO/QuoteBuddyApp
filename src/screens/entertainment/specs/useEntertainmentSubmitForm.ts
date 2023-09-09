import { useState } from 'react'

export const useEntertainmentSubmitForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const handleSubmit = () => alert('submited, hello world')

	return {
		isLoading,
		handleSubmit
	}
}
