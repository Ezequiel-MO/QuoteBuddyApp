import baseAPI from '../../../../axios/axiosConfig'
// import {IProject} from 'src/interfaces'




export const employeeExistsInCompany = async (data: any) => {
	const response = await baseAPI.get(`client_companies/${data.clientCompany}`)
	const companyEmployees = response.data.data.data.employees.map((el: any) => el._id)
	if (!companyEmployees.includes(data.clientAccManager)) {
		data.clientAccManager = ''
		throw new Error("Please Select an account manager of the Company")
	}
	return data
}