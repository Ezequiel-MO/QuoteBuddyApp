import { FormEvent, useState } from 'react'
import { IAlert } from './Login'
import baseAPI from 'src/axios/axiosConfig'
import { IProject } from '@interfaces/project'

interface Props {
	email: string
	password: string
	setAlert: (alert: IAlert) => void
	onClientSuccess: (data: any) => void
	onMultipleProjects: (projects: IProject[]) => void
	onError: (error: Error) => void
}

export const useClientLoginSubmit = ({
	email,
	password,
	setAlert,
	onClientSuccess,
	onMultipleProjects,
	onError
}: Props) => {
	const [loading, setLoading] = useState<boolean>(false)

	const handleClientSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		if ([email, password].includes('')) {
			setAlert({
				error: true,
				msg: 'Please fill in all fields'
			})
			setLoading(false)
			throw new Error('Please fill all fields')
		}

		try {
			// First, check if this user has any projects without using the password as a filter
			const {
				data: { token }
			} = await baseAPI.post('/users/client_login', {
				email,
				password
			})

			if (!token) {
				throw new Error('Invalid Email or Password')
			}

			// Get all projects for this client email
			const allProjectsResponse = await baseAPI.get(
				`/projects/client/${email}`,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)

			const allProjects = allProjectsResponse.data.data.data || []

			// If no projects found
			if (allProjects.length === 0) {
				setLoading(false)
				throw new Error('No projects found for this account')
			}

			// Filter projects that match the provided password
			const currentProject = allProjects.find(
				(project: IProject) => project.code === password
			)

			// If we didn't find a project matching this password
			if (!currentProject) {
				setLoading(false)
				throw new Error('Invalid project code')
			}

			// Store token for authenticated requests
			localStorage.setItem('token', token)

			// If there's only one project, or if "Remember Me" was checked and this was the last project
			if (allProjects.length === 1) {
				// Proceed with single project login
				onClientSuccess && onClientSuccess(currentProject)
			} else {
				// Multiple projects exist - present project selection UI
				onMultipleProjects && onMultipleProjects(allProjects)
			}
		} catch (error: any) {
			setLoading(false)
			onError && onError(error)
		}
	}

	return { handleClientSubmit, loading }
}
