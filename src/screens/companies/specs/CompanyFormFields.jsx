import { Icon } from '@iconify/react'
import { CountryFilter } from '../../../ui'
import SelectClients from './SelectClients'
import { ColorInput, TextInput } from '../../../ui/inputs/nativeInputs'

export const CompanyFormFields = ({
	data,
	handleChange,
	errors = {},
	country,
	setCountry,
	clients,
	handleSelect,
	handleDeleteClient,
	handleColor,
	update,
	fileInput,
	setOpen
}) => {
	return (
		<fieldset className="grid grid-cols-2 gap-4">
			<legend>
				<p className="text-2xl mb-4">General Company Data</p>
			</legend>
			<div className="mb-6">
				<TextInput
					name="name"
					value={data.name}
					handleChange={handleChange}
					errors={errors.name}
				/>
				<label htmlFor="">Country</label>
				<CountryFilter
					name={'select country'}
					country={country}
					setCountry={setCountry}
				/>
				{country === 'none' && (
					<p className="bg-red-500 font-bold text-white-50">select country</p>
				)}
				<TextInput
					name="address"
					value={data.address}
					handleChange={handleChange}
					errors={errors.address}
				/>
				<SelectClients
					clients={clients}
					employees={data.employees}
					handleChange={handleSelect}
					data={data}
					handleDelete={handleDeleteClient}
				/>
				<ColorInput
					colorPalette={data.colorPalette}
					handleColor={handleColor}
				/>
				<TextInput
					name="fonts"
					value={data.fonts}
					handleChange={handleChange}
					errors={errors.fonts}
					placeholder='example Font Family: "Rockwell Extra Bold" , Arial , ...'
				/>
			</div>

			<div className="form-group mb-6">
				{!update && (
					<div
						className=" flex align-center justify-start"
						style={{ marginTop: '20px', marginLeft: '' }}
					>
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
							multiple
							ref={fileInput}
						/>
					</div>
				)}
			</div>
			<input
				type="submit"
				className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
				value={!update ? 'Save new form Company' : 'Edit form Company'}
			/>
			{update && (
				<div className="flex align-center justify-start">
					<input
						onClick={() => setOpen(true)}
						type="button"
						className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
						value="Show images"
					/>
				</div>
			)}
		</fieldset>
	)
}
