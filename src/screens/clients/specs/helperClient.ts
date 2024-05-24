import baseAPI from '../../../axios/axiosConfig'
import { IClientCompany } from "@interfaces/clientCompany"


export const addClientToCompany = async (nameCompany: string, idClient: string) => {
    let company = {} as IClientCompany
    if (nameCompany) {
        const encodedName = encodeURIComponent(nameCompany)
        company = (await baseAPI.get(`client_companies?name=${encodedName}`)).data.data.data[0] as IClientCompany
        // console.log(company)
    }
    if (Object.values(company).length > 0) {
        const employeesId = company.employees.map(el => el._id)
        if (!employeesId.includes(idClient)) {
            const employees = [...company.employees, idClient]
            const { name, country, address, postCode, VATNr } = company
            const dataPath = {
                employees,
                name,
                country,
                address,
                postCode,
                VATNr
            }
            await baseAPI.patch(`client_companies/${company._id}`, dataPath)
        }
    }
}