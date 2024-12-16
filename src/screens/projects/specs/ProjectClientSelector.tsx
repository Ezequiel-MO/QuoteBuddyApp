import { ChangeEvent, FC, useEffect, useState } from 'react'
import { IClient } from '@interfaces/client'
import { useCurrentProject } from 'src/hooks'
import baseAPI from 'src/axios/axiosConfig' // Assuming you use this API config for fetching
import { Button } from '@components/atoms/buttons/Button'
import { ModalAddClientForm } from './modal/AddClientModal'
import { useClient } from '@screens/clients/context/ClientContext'
import initialState from '@screens/clients/context/initialState'


interface ProjectClientSelectorProps {
	handleChange: (name: string, value: string | string[]) => void
}

export const ProjectClientSelector: FC<ProjectClientSelectorProps> = ({
	handleChange
}) => {
	const { dispatch: dispatchClient, openAddClient, setOpenAddClient } = useClient()

	const { currentProject } = useCurrentProject()
	const [employees, setEmployees] = useState<IClient[]>([]) // Store employees
	// Store selected employee
	const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(
		typeof currentProject.clientAccManager[0] === 'object' // cuande es un update "clientAccManager" va aparecer como un object
			? currentProject.clientAccManager[0]._id
			: ''
	)

	if (!currentProject.clientCompany[0]) {
		return null
	}

	// Get company ID
	const companyId =
		typeof currentProject.clientCompany[0] === 'object' // cuande es un update "clientCompany" va aparecer como un object
			? currentProject?.clientCompany[0]._id
			: (currentProject?.clientCompany[0] as unknown as string)

	// Fetch employees based on selected company
	useEffect(() => {
		if (companyId) {
			fetchEmployees(companyId)
		}
	}, [companyId])

	const fetchEmployees = async (companyId: string) => {
		try {
			const response = await baseAPI.get(
				`client_companies/${companyId}/employees`
			)
			setEmployees(response.data.data.data) // Assuming response format
		} catch (error) {
			console.error('Failed to fetch employees:', error)
		}
	}

	//srive para setear "selectedEmployee" cuando se cambia de "Company"
	useEffect(() => {
		let employe
		if (employees.length > 0) {
			// console.log(employees)
			employe = employees.find((el) => el._id === selectedEmployee)
			!employe && setSelectedEmployee('')
		}
	}, [employees])

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedClientId = e.target.value
		setSelectedEmployee(selectedClientId)
		handleChange('clientAccManager', [selectedClientId]) // Dispatch selected client ID to redux
	}

	const handleAddClient = async () => {
		let response
		try {
			response = await baseAPI.get(`client_companies/${companyId}`)
		} catch (error: any) {
			return alert(error.response.data.message)
		}
		dispatchClient({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		dispatchClient({
			type: 'SET_CLIENT',
			payload: initialState.currentClient as IClient
		})
		dispatchClient({
			type: 'UPDATE_CLIENT_FIELD',
			payload: { name: 'clientCompany', value: response.data.data.data.name }
		})
		setOpenAddClient(prev => !prev)
	}

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full flex">
			<select
				className=" w-96 px-3 py-2 border rounded-md bg-gray-700 text-white"
				value={selectedEmployee}
				onChange={handleSelectChange}
			>
				<option value="" disabled>
					Select a Client
				</option>
				{employees?.length === 0 ? (
					<option value="">No employees available</option>
				) : (
					employees?.map((employee) => (
						<option key={employee._id} value={employee._id}>
							{employee.firstName} {employee.familyName}
						</option>
					))
				)}
			</select>
			<ModalAddClientForm
				companyId={companyId}
				companyEmployees={employees}
				setEmployees={setEmployees}
				setSelectedEmployee={setSelectedEmployee}
			/>
			<Button
				type='button'
				handleClick={(e) => {
					e.stopPropagation()
					handleAddClient()
				}}
				icon='line-md:person-add'
				widthIcon={25}
				newClass='flex ml-16 items-center uppercase mx-2 px-6 py-2 text-white-0 bg-gray-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-cyan-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'
			>
				add client
			</Button>
		</div>
	)
}
