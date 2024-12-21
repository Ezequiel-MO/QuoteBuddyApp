import { useEffect, useState } from 'react'
import baseAPI from '../axios/axiosConfig'
import {IProject} from '@interfaces/project'

export const useGetProject = (projectCode: string) => {
	const [project, setProject] = useState<IProject[]>()
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const res = await baseAPI.get(`projects?code=${projectCode}`)
				setProject(res.data.data.data)
			} catch (error: any) {
				setError(error)
			}
		}

		if (projectCode) {
			fetchProject()
		}
	}, [projectCode])

	return { project, error }
}
