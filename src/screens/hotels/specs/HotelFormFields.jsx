import { Icon } from '@iconify/react'
import { CheckboxInput, SelectInput, TextInput } from '../../../ui'
import { RichTextEditor } from '../../../components/molecules'

export const HotelFormFields = ({
	formik,
	locations,
	imagesHotel,
	fileInput,
	update,
	setTextContent,
	textContent,
	hotel,
	handleFileSelection
}) => {
	return (
		<fieldset className="grid grid-cols-3 gap-4">
			<legend>
				<h1 className="text-2xl mb-4 indent-8">General Hotel Data</h1>
			</legend>

			<div className="form-group mb-6">
				<TextInput
					label="Name"
					name="name"
					placeholder="Hotel Excelsior - 4star Superior"
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
					label="Address"
					name="address"
					placeholder="ex : c/Pina 57"
					type="text"
				/>
				<TextInput
					label="Category"
					name="numberStars"
					placeholder="ex : 4"
					type="number"
				/>
				<TextInput
					label="Total Number Of Rooms"
					name="numberRooms"
					placeholder="ex : 100 rooms"
					type="number"
				/>
				<TextInput
					label="Check-in and Check-out"
					name="checkin_out"
					placeholder="ex : 12noon/3pm"
					type="text"
				/>
			</div>
			<div className="form-group mb-6">
				<TextInput
					label="Nr Of Meeting Rooms"
					name="meetingRooms"
					placeholder="ex : 4"
					type="number"
				/>
				<TextInput
					label="Wi-Fi Speed"
					name="wifiSpeed"
					placeholder="ex : Available all rooms/common areas"
					type="text"
				/>
				<TextInput
					label="Swimming Pool"
					name="swimmingPool"
					placeholder="ex : 1x Outdoor/ 1x Indoor"
					type="text"
				/>
				<TextInput
					label="Restaurants"
					name="restaurants"
					placeholder="ex : 1x Restaurant/ 1x Bar"
					type="text"
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
			</div>
			<div className="form-group">
				<div className="my-7  ">
					<RichTextEditor
						screen={hotel}
						setTextContent={setTextContent}
						textContent={textContent}
						update={update}
					/>
				</div>

				<CheckboxInput
					label="Wheelchair Accessible"
					name="wheelChairAccessible"
				/>
			</div>
			<input
				type="submit"
				className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
				value={update ? 'Edit Hotel Form' : 'Save new Hotel'}
			/>
		</fieldset>
	)
}
