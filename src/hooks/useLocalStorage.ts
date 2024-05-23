import { useState, useEffect } from 'react'

export const useLocalStorage = (key: string, defaultValue: string) => {
	const [state, setState] = useState(() => {
		const storedValue = localStorage.getItem(key)
		return storedValue !== null ? JSON.parse(storedValue) : defaultValue
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	}, [key, state])

	return [state, setState]
}
