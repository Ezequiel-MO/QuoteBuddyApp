import { useState, FC, useCallback } from 'react'
import { toast } from 'react-toastify'
import ClientMasterForm from '../specs/ClientMasterForm'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { Spinner } from '../../../components/atoms'
import { IClient } from 'src/interfaces'
import { useCheckClientExists } from '@screens/invoices/details/useCheckClientExists'
import { useGetCompanyByName } from '@screens/clients/hooks/useGetCompanyByName'
import { addEmployeeToCompany, createClient } from '@services/clientService'

interface AddClientToCompanyProps {
	selectedCompanyName: string
	setOpen: () => void
}

// Type guard to check if an employee is a string ID or object
function isString(value: any): value is string {
	return typeof value === 'string'
}

export const AddClientToCompany: FC<AddClientToCompanyProps> = ({
	selectedCompanyName,
	setOpen
}) => {
	const [isLoading, setIsloading] = useState(false)
	const [, setPrevValues] = useState<Partial<IClient>>()

	const { checkIfExists } = useCheckClientExists()
	const { company, isLoading: isLoadingCompany } =
		useGetCompanyByName(selectedCompanyName)

	const handleAddClientToCompany = useCallback(
		async (values: IClient) => {
			if (!selectedCompanyName) {
				toast.error('Company name is required', errorToastOptions)
				return
			}

			if (!company) {
				toast.error(
					`Company "${selectedCompanyName}" not found`,
					errorToastOptions
				)
				return
			}
			setIsloading(true)

			try {
				const clientExists = await checkIfExists(values.email)
				if (clientExists) {
					throw new Error(
						`This client already exists. Please check the email: ${values.email}`
					)
				}

				const clientWithCompany = {
					...values,
					clientCompany: selectedCompanyName
				}

				const newClient = await createClient(clientWithCompany)

				// Handle the Mongoose populated/unpopulated issue
				// Map the employees array to ensure we have string IDs regardless of population
				const employeeIds = company.employees
					.map((emp) => (isString(emp) ? emp : emp._id))
					.filter((id): id is string => id !== undefined)

				await addEmployeeToCompany(company._id, {
					country: company.country,
					name: selectedCompanyName,
					employees: [...employeeIds, newClient._id!]
				})

				toast.success('Client added successfully!', toastOptions)
				setOpen()
				return newClient
			} catch (error: any) {
				setPrevValues(values)
				toast.error(error.message || 'Failed to add client', errorToastOptions)
				console.error('Error adding client:', error)
			} finally {
				setIsloading(false)
			}
		},
		[selectedCompanyName, company, checkIfExists, setOpen]
	)

	return (
		<div
			className="p-4 bg-white-0 rounded-lg shadow"
			data-testid="add-client-form"
		>
			<h2 className="text-xl font-semibold mb-4">
				Add Client to {selectedCompanyName}
			</h2>
			{isLoading || isLoadingCompany ? (
				<div className="flex justify-center p-8">
					<Spinner />
				</div>
			) : (
				<ClientMasterForm handleAddClient={handleAddClientToCompany} />
			)}
		</div>
	)
}
