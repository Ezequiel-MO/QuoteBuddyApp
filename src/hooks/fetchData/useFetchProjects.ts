import { useState, useEffect } from 'react'
import { useApiFetch } from './useApiFetch'
import { IProject } from '@interfaces/project'

interface Props {
	id?: string
	forceRefresh?: number
}

export const useFetchProjects = ({ id = '', forceRefresh = 0 }: Props = {}) => {
	const [url, setUrl] = useState<string>(id ? `projects/${id}` : 'projects')

	useEffect(() => {
		setUrl(id ? `projects/${id}` : 'projects')
	}, [id])

	const {
		data,
		setData: setProjects,
		isLoading
	} = useApiFetch<IProject>(url, forceRefresh)

	const project = id ? data[0] : null
	const projects = id ? null : data

	return { project, projects, setProjects, isLoading }
}
