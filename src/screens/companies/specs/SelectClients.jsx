import { useState } from 'react'
import { SelectedClientsBox } from './SelectedClientsBox'
import { MatchingClientSelect } from './MatchingClientSelect'
import { AddClient } from './AddClient'
import { ModalClientForm } from './modal_client/ModalClientForm'
import { TextInput } from '../../../components/atoms'

const SelectClients = ({
	handleChange,
	clients,
	data,
	handleDelete,
	setData
}) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [openModal, setOpenModal] = useState(false)

	const handleSearch = (event) => {
		setSearchTerm(event.target.value)
	}

	const filteredOptions = clients.filter((el) =>
		[el.firstName, el.familyName, el.email]
			.map((field) => field.toLowerCase())
			.some((field) => field.includes(searchTerm.toLowerCase()))
	)
	const handleClick = (e) => {
		setOpenModal(true)
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

export default SelectClients
