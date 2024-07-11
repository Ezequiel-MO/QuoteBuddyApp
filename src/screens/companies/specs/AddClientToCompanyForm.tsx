import { Button } from '@components/atoms'
import { Icon } from '@iconify/react'
import { IClient } from '@interfaces/client'
import { ChangeEvent, FocusEvent, useState } from 'react'
import { useApiFetch } from 'src/hooks/fetchData'
import AddClientModal from './AddClientModal'
import { useClient } from '@screens/clients/context/ClientContext'

interface Props {
	employees: IClient[]
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
	handleBlur: (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement, Element>
	) => void
	removeEmployee: (id: string) => void
}

export const AddClientToCompanyForm: React.FC<Props> = ({
	employees,
	handleChange,
	handleBlur,
	removeEmployee
}) => {
	const { dispatch } = useClient()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [openModal, setOpenModal] = useState<boolean>(false)
	const { data: clients } = useApiFetch<IClient[]>('clients')

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const handleClick = () => {
		dispatch({ type: 'RENDER_ADD_COMPANY_IN_FORM', payload: false })
		setOpenModal((prev) => !prev)
	}

	const closeModal = () => {
		setOpenModal(false)
	}

	const filteredClients = clients.filter(
		(client) =>
			client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			client.familyName.toLowerCase().includes(searchTerm.toLowerCase())
	)
	return (
		<div className="mx-auto p-4 bg-slate-600 shadow-md rounded-md">
			<label
				htmlFor="client"
				className="block text-lg font-medium text-gray-300 mb-2"
			>
				Client
			</label>
			<div className="flex flex-col space-y-2">
				{employees.length > 0 && (
					<div className="mb-4">
						<h3 className="text-lg font-semibold text-gray-300 mb-2">
							Current Company Employees
						</h3>
						<ul>
							{employees.map((employee) => (
								<li
									key={employee._id}
									className="flex justify-between items-center bg-gray-700 text-white rounded-md px-3 py-2 mb-2"
								>
									<span>
										{employee.firstName} {employee.familyName}
									</span>
									<button
										onClick={() => removeEmployee(employee._id as string)}
										className="text-red-500 hover:text-red-700"
									>
										<Icon icon="mdi:delete" width="20" />
									</button>
								</li>
							))}
						</ul>
					</div>
				)}

				<div className="flex items-center bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus-within:border-blue-500">
					<input
						className="w-2/5 px-2 py-1 text-base border-none bg-gray-700 rounded focus:text-white focus:outline-none"
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<select
						id="client"
						name="client"
						onChange={handleChange}
						onBlur={handleBlur}
						className="flex-1 w-4/6 py-1 px-2 border-none rounded-md bg-gray-700 text-center text-white cursor-pointer ml-2 focus:outline-none"
					>
						{searchTerm === '' ? (
							<option value="">-- Select client --</option>
						) : (
							filteredClients.slice(0, 6).map((client) => (
								<option key={client._id} value={client._id}>
									{client.firstName} {client.familyName}
								</option>
							))
						)}
					</select>
				</div>
				<Button
					newClass="flex items-center justify-center gap-2 w-full py-2 rounded-md text-center cursor-pointer bg-slate-600 text-white hover:bg-blue-700 font-bold uppercase"
					handleClick={handleClick}
					type="button"
					icon="ic:outline-person-add"
					widthIcon={20}
				>
					CREATE NEW CLIENT
				</Button>
				<AddClientModal isOpen={openModal} onClose={closeModal} />
			</div>
		</div>
	)
}
