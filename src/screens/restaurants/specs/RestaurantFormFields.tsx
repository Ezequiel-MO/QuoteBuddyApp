import { FC } from "react"
import { RichTextEditor, SelectLocation } from '../../../components/molecules'
import { TextInput } from '@components/atoms'
import { IRestaurant } from 'src/interfaces'

interface IRestaurantData {
	name?: string
	city?: string
	textContent?: string
	imageContentUrl?: string[]
	venue_price?: boolean
	price?: number
	longitude?: number
	latitude?: number
	introduction?: string[]
}

interface Props {
	data: IRestaurantData
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	setTextContent: React.Dispatch<React.SetStateAction<string>>
	textContent: string
	update: boolean
	restaurant:IRestaurant
}

export const RestaurantFormFields: FC<Props> = ({
	data,
	handleChange,
	handleChangeCheckbox,
	errors,
	handleBlur,
	setTextContent,
	textContent,
	update,
	restaurant
}) => {
	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">General Restaurant Data</h1>
			</legend>
			<div className='space-y-4'>
				<TextInput
					type='text'
					label='Name'
					placeholder='Event name'
					name="name"
					value={data.name}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.name}
				/>
				<div>
					<label className="block uppercase text-lg text-gray-400 font-medium mb-2">
						Location
					</label>
					<SelectLocation city={data.city as string} handleChange={handleChange} />
					{errors.city && !data.city && (
						<p className="text-red-500 mt-1">{errors.city}</p>
					)}
				</div>
				<div className='flex space-x-4'>
					<TextInput
						type='number'
						label='Longitude'
						placeholder="ex : 2.154007"
						name="longitude"
						value={data.longitude}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.longitude}
					/>
					<TextInput
						type='number'
						label='Latitude'
						placeholder='ex : 41.390205'
						name="latitude"
						value={data.latitude}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.latitude}
					/>
				</div>
				<div className='flex space-x-4'>
					< TextInput
						type='number'
						label='Tour Cost'
						placeholder="example : 35"
						name="price"
						value={data.price}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.price}
					/>
					<div className='w-auto'>
						< TextInput
							type='checkbox'
							label='It is a venue'
							name="venue_price"
							value={data.venue_price}
							handleChange={handleChangeCheckbox}
							handleBlur={handleBlur}
							errors={errors.pricePerPerson}
						/>
					</div>
				</div>
				<div className="my-2 text-white-100">
					<RichTextEditor
						screen={restaurant}
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
