import { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import { Spinner } from './spinner/Spinner'

const NavigationLoader = () => {
	const navigation = useNavigation()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (navigation.state === 'loading') {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [navigation.state])

	return isLoading ? <Spinner /> : null
}

export default NavigationLoader
