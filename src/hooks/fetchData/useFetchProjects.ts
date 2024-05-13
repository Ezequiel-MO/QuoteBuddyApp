import { useState, useEffect } from 'react'
import { useApiFetch } from './useApiFetch'
import { IProject } from '@interfaces/project'

interface Props {
	id?: string
	forceRefresh?: number
	initialProjects?: IProject[]
}

export const useFetchProjects = ({
	id = '',
	forceRefresh = 0,
	initialProjects
}: Props = {}) => {
	const [url, setUrl] = useState<string>(id ? `projects/${id}` : 'projects')
	const shouldFetch = !initialProjects || id !== '' || forceRefresh > 0

	useEffect(() => {
		setUrl(id ? `projects/${id}` : 'projects')
	}, [id])

	const {
		data,
		setData: setProjects,
		isLoading
	} = useApiFetch<IProject[]>(url, forceRefresh, shouldFetch)

	useEffect(() => {
		if (initialProjects && !shouldFetch) {
			setProjects(initialProjects)
		}
	}, [initialProjects, shouldFetch, setProjects])

	const project = id ? data[0] : null
	const projects = id ? null : data

	return { project, projects, setProjects, isLoading }
}
