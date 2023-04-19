import { useState } from 'react'
import { TextInput } from '../../../ui/inputs/nativeInputs'
import { SelectedClientsBox } from './SelectedClientsBox'

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
				<select
					id="country"
					className="flex-1 py-1 mt-6 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer "
					onChange={(event) => handleChange(event)}
				>
					{!searchTerm && <option value="none">Select Client/s</option>}
					{filteredOptions.length === 0 && (
						<option value="none">no client exists</option>
					)}
					{filteredOptions?.map((el) => {
						return (
							<option
								key={el._id}
								value={`${el._id} ${el.firstName} ${el.familyName}`}
								onClick={(event) => handleChange(event)}
							>
								{`${el.firstName} ${el.familyName}`}
							</option>
						)
					})}
				</select>
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
