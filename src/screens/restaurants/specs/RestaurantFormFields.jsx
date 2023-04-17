import { Icon } from '@iconify/react'
import {
	CheckboxInput,
	SelectInput,
	TextInput,
	RichTextEditor
} from '../../../ui'

export const RestaurantFormFields = ({
	formik,
	restaurant,
	setTextContent,
	textContent,
	locations,
	imagesRestaurant,
	fileInput,
	update,
	handleFileSelection
}) => {
	return (
		<fieldset className="grid grid-cols-2 gap-4 bg-black-50 min-w-[900px] px-5">
			<legend>
				<h1 className="text-2xl mb-4">General Restaurant Data</h1>
			</legend>
			<div className="mb-6">
				<TextInput
					label="Name"
					name="name"
					placeholder="Restaurant Name"
					type="text"
				/>
				<SelectInput
					label="Group Location"
					name="city"
					placeholder="Barcelona ..."
					options={locations}
					value={formik.values.city}
				/>
				<TextInput
					label="Coords Longitude"
					name="longitude"
					placeholder="ex : 2.154007"
					type="number"
				/>
				<TextInput
					label="Coords Latitude"
					name="latitude"
					placeholder="ex : 41.390205"
					type="number"
				/>
				<TextInput
					label="Average Menu Price"
					name="price"
					placeholder="ex : 35"
					type="number"
				/>
			</div>
			<div className="mb-6">
				<CheckboxInput label="It is a venue" name="isVenue" />
				<div className="my-2 text-white-100">
					<RichTextEditor
						screen={restaurant}
						setTextContent={setTextContent}
						textContent={textContent}
						update={update}
						style={{ width: '102%', marginBottom: '50px' }}
					/>
				</div>
				<div className="flex align-center justify-start">
					{imagesRestaurant.length === 0 && (
						<>
							<label htmlFor="file-upload" className="custom-file-upload">
								<Icon icon="akar-icons:cloud-upload" width="40" />
							</label>
							<input
								id="file-upload"
								type="file"
								ref={fileInput}
								name="imageContentUrl"
								multiple
								disabled={update ? true : false}
								onChange={handleFileSelection}
							/>
						</>
					)}
				</div>
			</div>
			<input
				type="submit"
				className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
				value={update ? 'Edit Restaurant Form' : 'Save new Restaurant'}
			/>
		</fieldset>
	)
}
