import { useState } from 'react'
import { TextInput } from '../../../ui/inputs/nativeInputs'
import { SelectedClientsBox } from './SelectedClientsBox'
import { MatchingClientSelect } from './MatchingClientSelect'

const SelectClients = ({ handleChange, clients, data, handleDelete }) => {
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = (event) => {
		setSearchTerm(event.target.value)
	}

	const filteredOptions = clients.filter((el) =>
		[el.firstName, el.familyName, el.email]
			.map((field) => field.toLowerCase())
			.some((field) => field.includes(searchTerm.toLowerCase()))
	)
	return (
		<div className="my-2">
			<div className="flex items-center gap-2">
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
