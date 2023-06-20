import { useEffect, useState } from 'react'
import baseAPI from '../axios/axiosConfig'

export const useGetProject = (id) => {
	const [project, setProject] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const res = await baseAPI.get(`projects/${id}`)
				setProject(res.data.data.data)
			} catch (error) {
				setError(error)
			}
		}

		if (id) {
			fetchProject()
		}
	}, [id])

	return { project, error }
}
