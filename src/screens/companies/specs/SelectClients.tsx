import { useState, FC, ChangeEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { SelectedClientsBox } from './SelectedClientsBox'
import { MatchingClientSelect } from './MatchingClientSelect'
import { AddClient } from './AddClient'
import { ModalClientForm } from './modal_client/ModalClientForm'
import { TextInput } from '../../../components/atoms'
import { IClientCompany } from "src/interfaces/clientCompany"
import { IClient } from "@interfaces/client"

interface SelectClientsProps {
	data: IClientCompany
	setData: React.Dispatch<React.SetStateAction<any>>
	clients: IClient[]
	handleChange: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleDelete: (client: string) => void
}

export const SelectClients: FC<SelectClientsProps> = ({
	data,
	setData,
	clients,
	handleChange,
	handleDelete
}) => {
	const location = useLocation()
	const pathnameCompany = "/app/company/specs"

	const [searchTerm, setSearchTerm] = useState('')
	const [openModal, setOpenModal] = useState(false)

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const filteredOptions = clients.filter((el) =>
		[el.firstName, el.familyName, el.email]
			.map((field) => field.toLowerCase())
			.some((field) => field.includes(searchTerm.toLowerCase()))
	)
	const handleClick = () => {
		setOpenModal(true)
	}

	if (location.pathname !== pathnameCompany) {
		return null
	}

	return (
		<div>
			<ModalClientForm
				open={openModal}
				setOpen={setOpenModal}
				dataCompany={data}
				setDataCompany={setData}
			/>
			<div className="flex items-center gap-4">
				<TextInput
					name="employees"
					value={searchTerm}
					handleChange={handleSearch}
					placeholder="search..."
				/>
				<MatchingClientSelect
					searchTerm={searchTerm}
					handleChange={handleChange}
					filteredOptions={filteredOptions}
				/>
				<AddClient handleClick={handleClick} />
			</div>
			<div className="mt-2">
				<SelectedClientsBox
					employees={data.employees}
					handleDelete={handleDelete}
				/>
			</div>
		</div>
	)
}
