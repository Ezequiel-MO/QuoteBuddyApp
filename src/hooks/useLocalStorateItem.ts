import { useState, useCallback } from 'react'

export const useLocalStorageItem = <T>(
	key: string,
	defaultValue: T
): [T, (value: T) => void] => {
	const [item, setItem] = useState<T>(() => {
		try {
			const itemString = localStorage.getItem(key)
			return itemString ? JSON.parse(itemString) : defaultValue
		} catch (error) {
			console.error(`Error retrieving item '${key}' from localStorage:`, error)
			return defaultValue
		}
	})

	const setValue = useCallback(
		(value: T) => {
			setItem(value)
			localStorage.setItem(key, JSON.stringify(value))
		},
		[key]
	)

	return [item, setValue]
}
