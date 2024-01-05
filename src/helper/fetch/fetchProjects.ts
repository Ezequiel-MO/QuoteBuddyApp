import baseAPI from 'src/axios/axiosConfig'

export async function fetchProjects() {
	try {
		const response = await baseAPI.get('projects')
		return response.data.data.data
	} catch (error) {
		console.error('Failed to load projects:', error)
		throw error
	}
}
