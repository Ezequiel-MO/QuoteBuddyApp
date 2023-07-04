import { useEffect, useState } from 'react'
import Proptypes from 'prop-types'
import { useGetClientsFromCompany } from '../../../hooks'

export const ClientSelector = ({
	isEditable,
	selectedCompany,
	handleChange
}) => {
	// when a client is selected, use handleChange to set the client in the context
	// when the client is set, load the client's address
	const [companyName, setCompanyName] = useState('')
	const [localEmployees, setLocalEmployees] = useState([])

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
				<>
					<input
						type="text"
						placeholder="Search Customer"
						className="ml-2 flex-1 rounded-md border border-gray-300 px-2"
					/>
					<select
						name="client"
						className="ml-2 w-1/2 rounded-md border border-gray-300 px-2 cursor-pointer"
						disabled={isLoading || !companyName || !employees.length}
						onChange={handleChange}
					>
						{localEmployees.map((employee, index) => (
							<option key={index} value={employee.name}>
								{employee.firstName + ' ' + employee.familyName}
							</option>
						))}
					</select>
				</>
			) : (
				<p className="ml-2 font-normal">client</p>
			)}
		</div>
	)
}

Proptypes.ClientSelector = {
	isEditable: Proptypes.bool.isRequired,
	selectedCompany: Proptypes.string.isRequired,
	handleChange: Proptypes.func.isRequired
}
