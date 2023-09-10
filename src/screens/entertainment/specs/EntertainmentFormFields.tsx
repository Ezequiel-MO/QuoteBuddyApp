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
		<fieldset className="grid grid-cols-2 gap-4">
			<legend>
				<h1 className="text-2xl mb-4">Entertainment Shows Data</h1>
			</legend>
			<div>
				<TextInput
					name="vendor"
					label="Vendor / Agency"
					value={data.vendor}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.vendor}
					placeholder="Name of the vendor / agency"
				/>
				<label className="uppercase text-xl text-gray-600 font-bold">
					Location
				</label>
				<SelectLocation handleChange={handleSelectLocation} city={data.city} />
				{errors.city && !data.city && (
					<p /* className={styles.validationError} */>{errors.city}</p>
				)}
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
				<NumberInput
					name="duration"
					value={Number(data.duration)}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.duration}
				/>
				<NumberInput
					name="nrArtists"
					value={Number(data.nrArtists)}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.nrArtists}
				/>

				<div className="my-2 text-white-100">
					<RichTextEditor
						screen={data}
						setTextContent={setTextContent}
						textContent={textContent}
						update={update}
						style={{ width: '102%', marginBottom: '50px' }}
					/>
				</div>
				<input
					type="submit"
					className="cursor-pointer mt-5 py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
					value={update ? 'Edit Entertainment Form' : 'Save new Entertainment'}
				/>
			</div>
		</fieldset>
	)
}
