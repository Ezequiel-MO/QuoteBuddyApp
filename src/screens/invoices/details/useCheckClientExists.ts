import { useApiFetch } from '@hooks/fetchData'
import { IClient } from '@interfaces/client'
import { useState, useCallback } from 'react'

export function useCheckClientExists() {
	const [isChecking, setIsChecking] = useState(false)
	const { data: clients } = useApiFetch<IClient[]>('clients')

	const checkIfExists = useCallback(
		async (email: string): Promise<boolean> => {
			setIsChecking(true)
			try {
				return clients.some((client) => client.email === email)
			} finally {
				setIsChecking(false)
			}
		},
		[clients]
	)

	return { checkIfExists, isChecking }
}
