import { CountryFilter } from '../../../ui'
import SelectClients from './SelectClients'
import { ColorInput, TextInput } from '../../../components/atoms'
import { FileUpload, RenderColorPalette } from '../../../components/molecules'
import { SubmitInput } from '../../../components/atoms'

export const CompanyFormFields = ({
	data,
	handleChange,
	errors = {},
	country,
	setCountry,
	clients,
	handleSelect,
	handleDelete,
	handleDeleteClient,
	handleColor,
	update,
	fileInput,
	setOpen,
	setData
}) => {
	return (
		<fieldset className="space-y-4 flex flex-col items-center">
			<legend>
				<p className="text-2xl mb-4">General Company Data</p>
			</legend>
			<div className="flex flex-col justify-center w-3/4">
				<TextInput
					name="name"
					value={data.name}
					handleChange={handleChange}
					errors={errors.name}
				/>
				<TextInput
					name="address"
					value={data.address}
					handleChange={handleChange}
					errors={errors.address}
				/>
				<div className="flex flex-col">
					<label
						htmlFor=""
						className="uppercase text-gray-600 block text-xl font-bold"
					>
						Country
					</label>
					<CountryFilter
						name={'select country'}
						country={country}
						setCountry={setCountry}
					/>
				</div>
				{country === 'none' && (
					<p className="py-1 text-center bg-red-500 font-bold text-white-100 rounded-b-md">
						select country
					</p>
				)}
				<SelectClients
					clients={clients}
					employees={data.employees}
					handleChange={handleSelect}
					data={data}
					handleDelete={handleDeleteClient}
					setData={setData}
				/>
				<ColorInput
					colorPalette={data.colorPalette}
					handleColor={handleColor}
				/>
				<RenderColorPalette
					colors={data.colorPalette}
					handleDelete={handleDelete}
				/>
				<TextInput
					name="fonts"
					value={data.fonts}
					handleChange={handleChange}
					errors={errors.fonts}
					placeholder='example Font Family: "Rockwell Extra Bold" , Arial , ...'
				/>
				<FileUpload update={update} fileInput={fileInput} multiple />
				{update && (
					<div className="my-2">
						<input
							onClick={() => setOpen(true)}
							type="button"
							className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 font-bold uppercase rounded-lg"
							value="Show images"
						/>
					</div>
				)}
				<SubmitInput update={update} title="Company" />
			</div>
		</fieldset>
	)
}
