import baseAPI from '../axios/axiosConfig'
import { IClient } from '../interfaces'

/**
 * Creates a new client
 */
export async function createClient(clientData: IClient): Promise<IClient> {
	const response = await baseAPI.post('clients', clientData)
	return response.data.data.data
}

/**
 * Updates a company by adding a new employee to its employees array
 */
export async function addEmployeeToCompany(
	companyId: string,
	companyData: { country: string; name: string; employees: string[] }
): Promise<any> {
	const response = await baseAPI.patch(
		`client_companies/${companyId}`,
		companyData
	)
	return response.data.data.data
}
