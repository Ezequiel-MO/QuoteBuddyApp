import { IClientCompany } from '@interfaces/clientCompany'
import { useEffect, useState } from 'react'
import { useApiFetch } from './useApiFetch'

interface Props {
	id: string
	forceRefresh?: number
}

export const useFetchCompany = ({ id, forceRefresh }: Props) => {
	const [url, setUrl] = useState<string>(`client_companies/${id}`)

	useEffect(() => {
		setUrl(`client_companies/${id}`)
	}, [id])
	const { data, isLoading } = useApiFetch<IClientCompany>(url, forceRefresh)
	const company = data

	return { company, isLoading }
}
