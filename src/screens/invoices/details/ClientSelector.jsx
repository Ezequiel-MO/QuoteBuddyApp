import { useEffect, useState } from 'react'
import Proptypes from 'prop-types'
import { useGetClientsFromCompany } from '../../../hooks'
import { ModalComponent } from '../../../components/atoms/modal/Modal'
import { editableDivClass, readOnlyDivClass } from '../styles'
import { AddClientToCompany } from '../../clients/add/AddClientToCompany'

export const ClientSelector = ({
	isEditable,
	selectedCompany,
	selectedClient,
	handleChange
}) => {
	const [companyName, setCompanyName] = useState('')
	const [localEmployees, setLocalEmployees] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [forceRefresh, setForceRefresh] = useState(0)

	const { isLoading, employees } = useGetClientsFromCompany(
		companyName,
		forceRefresh
	)

	const handleAddClient = () => {
		setForceRefresh((prevCount) => prevCount + 1)
		setIsModalOpen((prev) => !prev)
	}

	useEffect(() => {
		setCompanyName(selectedCompany)
	}, [selectedCompany])

	useEffect(() => {
		if (!isLoading) {
			setLocalEmployees(employees)
		}
	}, [isLoading, employees])

	return (
		<div className={isEditable ? editableDivClass : readOnlyDivClass}>
			<div className={isEditable ? 'whitespace-nowrap' : 'font-medium text-lg'}>
				SEND INVOICE TO:
			</div>
			{isEditable ? (
				<>
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
					<div className="mt-1 font-bold text-lg flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md">
						<button
							className="ml-2 bg-gray-100 hover:bg-gray-400 text-lg font-medium rounded-md border border-gray-300 p-1 cursor-pointer"
							disabled={isLoading || !companyName}
							onClick={() => setIsModalOpen((prev) => !prev)}
						>
							ADD CLIENT
						</button>
						<ModalComponent open={isModalOpen} setOpen={setIsModalOpen}>
							<AddClientToCompany
								selectedCompanyName={companyName}
								setOpen={handleAddClient}
							/>
						</ModalComponent>
					</div>
				</>
			) : (
				<p className="ml-2 font-normal">{selectedClient}</p>
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
