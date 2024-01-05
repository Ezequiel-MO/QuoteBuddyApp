import { useState, useEffect } from 'react'
import { useNavigation } from 'react-router-dom'

export const useNavigationLoader = () => {
	const navigation = useNavigation()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (navigation.state === 'loading') {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [navigation.state])

	return { isLoading }
}
