import { useState } from 'react'
import { TextInput } from '../../../ui/inputs/nativeInputs'

const SelectClients = ({
	handleChange,
	clients,
	employees,
	data,
	handleDelete
}) => {
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = (event) => {
		setSearchTerm(event.target.value)
	}

	const filteredOptions = clients.filter(
		(el) =>
			el.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			el.familyName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
			el.email.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
	)

	return (
		<div className="my-2 ml-0 mr-0">
			<div className="flex items-center gap-2">
				<TextInput
					name="employees"
					value={searchTerm}
					handleChange={handleSearch}
					placeholder="search..."
				/>
				<select
					id="country"
					className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer "
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

			{data.employees.length > 0 && (
				<div
					style={{
						backgroundColor: 'white',
						borderRadius: '10px',
						position: 'absolute',
						marginLeft: '-0.1%',
						marginTop: '300px',
						// marginBottom:" -400px",
						padding: '2%'
					}}
				>
					<h1 style={{ textAlign: 'center' }}>Selected clients</h1>
					{data.employees.map((element) => {
						return (
							<li key={element} style={{ color: 'black', marginLeft: '50px' }}>
								client: {element}{' '}
								<button
									style={{
										marginLeft: '10px',
										color: 'white',
										fontSize: '15px'
									}}
									className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full h-6 w-6"
									onClick={() => handleDelete(element)}
								>
									X
								</button>
							</li>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default SelectClients
