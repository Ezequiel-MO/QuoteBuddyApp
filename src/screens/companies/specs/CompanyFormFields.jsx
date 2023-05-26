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
		<fieldset>
			<legend>
				<p className="text-2xl mb-4">General Company Data</p>
			</legend>
			<div className="grid grid-cols-3 gap-4">
				<div className="col-span-2">
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
					<label htmlFor="">Country</label>
					<CountryFilter
						name={'select country'}
						country={country}
						setCountry={setCountry}
					/>
					{country === 'none' && (
						<p className="bg-red-500 font-bold text-white-50">select country</p>
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
				</div>
				<div className="col-span-1" style={{ marginTop: '35px' }}>
					<FileUpload update={update} fileInput={fileInput} multiple />
					{update && (
						<div className="my-2">
							<input
								onClick={() => setOpen(true)}
								type="button"
								className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
								value="Show images"
							/>
						</div>
					)}
					<div
						style={{
							position: 'absolute',
							marginTop: '240px',
							marginLeft: '10px'
						}}
					>
						<SubmitInput update={update} title="Company" />
					</div>
				</div>
			</div>
		</fieldset>
	)
}
