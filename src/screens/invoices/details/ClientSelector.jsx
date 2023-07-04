import { useEffect, useState } from 'react'
import Proptypes from 'prop-types'
import { useGetClientsFromCompany } from '../../../hooks'
import { ModalComponent } from '../../../components/atoms/modal/Modal'
import ClientMasterForm from '../../clients/specs/ClientMasterForm'

export const ClientSelector = ({
	isEditable,
	selectedCompany,
	selectedClient,
	handleChange
}) => {
	const [companyName, setCompanyName] = useState('')
	const [localEmployees, setLocalEmployees] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { isLoading, employees } = useGetClientsFromCompany(companyName)

	useEffect(() => {
		if (selectedCompany) {
			setCompanyName(selectedCompany)
		}
	}, [selectedCompany])

	useEffect(() => {
		if (!isLoading) {
			setLocalEmployees(employees)
		}
	}, [isLoading, employees])

	return (
		<div
			className={
				isEditable
					? 'mt-1 font-bold text-lg flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md'
					: 'flex justify-between items-center border-b border-dashed'
			}
		>
			<div className={isEditable ? 'whitespace-nowrap' : 'font-medium text-lg'}>
				SEND INVOICE TO:
			</div>
			{isEditable ? (
				<select
					name="client"
					className="ml-2 w-1/2 rounded-md border border-gray-300 px-2 cursor-pointer"
					disabled={isLoading || !companyName || !employees.length}
					onChange={handleChange}
				>
					<option value="">Select a client</option>
					{localEmployees.map((employee, index) => (
						<option key={index} value={employee.name}>
							{employee.firstName + ' ' + employee.familyName}
						</option>
					))}
				</select>
			) : (
				<p className="ml-2 font-normal">{selectedClient}</p>
			)}
			{isEditable && (
				<div className="mt-1 font-bold text-lg flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md">
					<button
						className="ml-2bg-gray-100 text-lg font-medium rounded-md border border-gray-300 px-2 py-1 cursor-pointer"
						type="button"
						onClick={() => setIsModalOpen((prev) => !prev)}
					>
						ADD CLIENT
					</button>
					<ModalComponent open={isModalOpen} setOpen={setIsModalOpen}>
						<ClientMasterForm />
					</ModalComponent>
				</div>
			)}
		</div>
	)
}

Proptypes.ClientSelector = {
	isEditable: Proptypes.bool.isRequired,
	selectedCompany: Proptypes.string.isRequired,
	selectedClient: Proptypes.string.isRequired,
	handleChange: Proptypes.func.isRequired
}
