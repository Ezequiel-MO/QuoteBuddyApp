import { Icon } from '@iconify/react'
import { CountryFilter } from '../../../ui'
import SelectClients from './SelectClients'

const CompanyMasterForm = ({
	clients,
	country,
	setCountry,
	data,
	setData,
	fileInput,
	handleSubmit
}) => {
	// console.log(clients)

	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value
		})
		// console.log(data)
	}

	const handleColor = (event) => {
		if (!data.colorPalette.includes(event.target.value)) {
			setData({
				...data,
				colorPalette: [...data.colorPalette, event.target.value]
			})
		}
	}

	function handleSelect(event) {
		console.log(event.target.value.email)
		setData({
			...data,
			employees:
				event.target.value === 'none'
					? data.employees
					: !data.employees.includes(event.target.value)
					? [...data.employees, event.target.value]
					: data.employees
		})
		console.log(data)
	}

	const handleDelete = (event) => {
		setData({
			...data,
			colorPalette: data.colorPalette.filter((el) => el !== event)
		})
	}

	const handleDeleteClient = (event) => {
		setData({
			...data,
			employees: data.employees.filter((el) => el !== event)
		})
	}

	return (
		<>
			<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
				<form
					onSubmit={(event) => handleSubmit(event, fileInput.current ?? [])}
				>
					<fieldset className="grid grid-cols-2 gap-4">
						<legend>
							<h1 className="text-2xl mb-4">Setting</h1>
						</legend>
						<div className="form-group mb-6">
							<label htmlFor="">Name</label>
							<input
								className="w-full
                                px-2
                                py-1
                                text-base
                                text-gray-700
                                border border-solid border-gray-300
                                rounded
                                focus:text-gray-700 focus:outline-none"
								type="text"
								name="name"
								value={data.name}
								onChange={(event) => handleChange(event)}
							/>
							{/* {errors.name &&
                                <p className='bg-red-500 font-bold text-white-50'  >{errors.name}</p>
                            } */}
							<label htmlFor="">Country</label>
							<CountryFilter
								name={'select country'}
								country={country}
								setCountry={setCountry}
							/>
							{country === 'none' && (
								<p className="bg-red-500 font-bold text-white-50">
									select country
								</p>
							)}
							<label htmlFor="">Address</label>
							<input
								type="text"
								className="w-full
                              px-2
                              py-1
                              text-base
                              text-gray-700
                              border border-solid border-gray-300
                              rounded
                              focus:text-gray-700 focus:outline-none"
								name="address"
								value={data.address}
								onChange={(event) => handleChange(event)}
							/>
							<label htmlFor="">employees</label>
							<SelectClients
								clients={clients}
								employees={data.employees}
								handleChange={handleSelect}
								data={data}
								handleDelete={handleDeleteClient}
							/>

							<label htmlFor="">Color</label>
							<input
								className="w-full
                              px-2
                              py-1
                              text-base
                              text-gray-700
                              border border-solid border-gray-300
                              rounded
                              focus:text-gray-700 focus:outline-none"
								type="color"
								placeholder="user given password"
								name="colorPalette"
								value={data.colorPalette[0]}
								id={data.colorPalette[0]}
								onChange={(event) => handleColor(event)}
							/>
							<label htmlFor="">Font</label>
							<textarea
								className="w-full
                              px-2
                              py-1
                              text-base
                              text-gray-700
                              border border-solid border-gray-300
                              rounded
                              focus:text-gray-700 focus:outline-none"
								type="text"
								name="fonts"
								placeholder="example Font Family: Rockwell Extra Bold , Arial , ..."
								value={data.fonts}
								onChange={(event) => handleChange(event)}
							/>
						</div>

						<div className=" flex align-center justify-start">
							<label htmlFor="file-upload" className="custom-file-upload">
								<Icon icon="akar-icons:cloud-upload" width="40" />
							</label>
							<input
								className="absolute"
								style={{ marginLeft: '45px' }}
								id="file-upload"
								type="file"
								placeholder="user given email"
								name="imageContentUrl"
								multiple={false}
								ref={fileInput}
							/>
						</div>

						<input
							type="submit"
							className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
							value={'Save settings'}
						/>
					</fieldset>
				</form>
				{data.colorPalette.length > 0 && (
					<div
						style={{
							backgroundColor: 'white',
							borderRadius: '10px',
							position: 'absolute',
							marginLeft: '33%',
							marginTop: '-470px',
							padding: '2%'
						}}
					>
						<h1 style={{ textAlign: 'center' }}>{'Selected colors'}</h1>
						{data.colorPalette.map((element) => {
							return (
								<li
									key={element}
									style={{ color: element, marginLeft: '50px' }}
								>
									Aggregate color: {element}{' '}
									<button
										style={{ marginLeft: '10px', color: 'red' }}
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
		</>
	)
}

export default CompanyMasterForm
