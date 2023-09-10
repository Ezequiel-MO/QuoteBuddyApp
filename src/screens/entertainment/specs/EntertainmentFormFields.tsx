import { NumberInput, TextInput } from '@components/atoms'
import { RichTextEditor } from '@components/molecules'
import { SelectLocation } from '@screens/freeLancers'
import { IEntertainment } from 'src/interfaces/entertainment'
import { EntertainmentCategorySelector } from './EntertainmentCategorySelector'

interface Props {
	data: IEntertainment
	setData: React.Dispatch<React.SetStateAction<IEntertainment>>
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void

	update: boolean
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleSelectLocation: (event: React.ChangeEvent<HTMLSelectElement>) => void
	handleSelectCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void
	setTextContent: React.Dispatch<React.SetStateAction<string>>
	textContent: string
}

export const EntertainmentFormFields = ({
	data,
	setData,
	errors,
	handleChange,
	update,
	handleBlur,
	handleSelectLocation,
	handleSelectCategory,
	setTextContent,
	textContent
}: Props) => {
	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">Entertainment Shows Data</h1>
			</legend>
			<div className="space-y-4">
				<TextInput
					name="vendor"
					label="Vendor / Agency"
					value={data.vendor}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.vendor}
					placeholder="Name of the vendor / agency"
				/>
				<div>
					<label className="block uppercase text-lg text-gray-400 font-medium mb-2">
						Location
					</label>
					<SelectLocation
						handleChange={handleSelectLocation}
						city={data.city}
					/>
					{errors.city && !data.city && (
						<p className="text-red-500 mt-1">{errors.city}</p>
					)}
				</div>
				<TextInput
					name="name"
					label="Name of the Show"
					value={data.name}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.name}
					placeholder="Name of the show"
				/>
				<TextInput
					name="contact"
					label="Contact Person"
					value={data.contact}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.contact}
					placeholder="Contact Person"
				/>
				<TextInput
					type="email"
					name="email"
					label="Email"
					value={data.email}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.email}
					placeholder="Email Address"
				/>
				<EntertainmentCategorySelector
					category={data.category}
					handleChange={handleSelectCategory}
					handleBlur={handleBlur}
					errors={errors}
				/>
				<div className="flex space-x-4">
					<div className="w-1/2">
						<NumberInput
							name="duration"
							value={Number(data.duration)}
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={errors.duration}
						/>
					</div>
					<div className="w-1/2">
						<NumberInput
							name="nrArtists"
							value={Number(data.nrArtists)}
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={errors.nrArtists}
						/>
					</div>
				</div>

				<div className="my-2 text-white-100">
					<RichTextEditor
						screen={data}
						setTextContent={setTextContent}
						textContent={textContent}
						update={update}
						style={{ width: '102%', marginBottom: '50px' }}
					/>
				</div>
			</div>
		</fieldset>
	)
}
