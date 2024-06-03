import { ChangeEvent } from 'react'
import { TextInput } from '@components/atoms'
import { LocationSelector } from '@components/molecules/LocationSelector'
import { HotelCategorySelector } from './HotelCategorySelector'
import { useHotel } from '../context/HotelsContext'
import { RichTextEditor } from '@components/molecules'
import { AddDescriptionsInLanguages } from './AddDescriptionsInLanguages'

export const HotelFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } = useHotel()

	const handleCoordinateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		dispatch({
			type: 'UPDATE_HOTEL_COORDINATE',
			payload: { name, value: parseFloat(value) }
		})
	}

	const handleTextContentChange = (textContent: string) => {
		dispatch({
			type: 'UPDATE_HOTEL_TEXTCONTENT',
			payload: textContent
		})
	}

	const categoriesStar = [1, 2, 3, 4, 5]

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Hotel Data
				</h1>
			</legend>
			<div className="space-y-6">
				<TextInput
					type="text"
					label="Name"
					placeholder="Hotel Excelsior - 4star Superior"
					name="name"
					value={state.currentHotel?.name || ''}
					handleChange={handleChange}
					errors={errors.name}
					handleBlur={handleBlur}
				/>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<TextInput
						type="number"
						label="Longitude"
						placeholder="ex : 2.154007"
						name="longitude"
						value={state.currentHotel?.location?.coordinates[0] || ''}
						handleChange={handleCoordinateChange}
						handleBlur={handleBlur}
						errors={errors.longitude}
						step="any"
					/>
					<TextInput
						type="number"
						label="Latitude"
						placeholder="ex : 41.390205"
						name="latitude"
						value={state.currentHotel?.location?.coordinates[1] || ''}
						handleChange={handleCoordinateChange}
						handleBlur={handleBlur}
						errors={errors.latitude}
						step="any"
					/>
					<TextInput
						type="text"
						label="Wi-Fi Speed"
						placeholder="ex : Available all rooms/common areas"
						name="wifiSpeed"
						value={state.currentHotel?.wifiSpeed}
						handleChange={handleChange}
						errors={errors.wifiSpeed}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="space-y-4">
					<label className="uppercase text-xl text-gray-600 font-bold">
						Location
					</label>
					<LocationSelector
						city={state.currentHotel?.city as string}
						name="city"
						handleChange={handleChange}
					/>
					{errors.city && !state.currentHotel?.city && (
						<p className="text-red-500 mt-1">{errors.city}</p>
					)}
					<TextInput
						type="text"
						label="Address"
						placeholder="ex : c/Pina 57"
						name="address"
						value={state.currentHotel?.address}
						handleChange={handleChange}
						errors={errors.address}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<HotelCategorySelector
						options={categoriesStar}
						numberStars={state.currentHotel?.numberStars || 0}
						handleChange={handleChange}
						errors={errors}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="number"
						label="Total Number Of Rooms"
						placeholder="ex : 100 rooms"
						name="numberRooms"
						value={state.currentHotel?.numberRooms}
						handleChange={handleChange}
						errors={errors.numberRooms}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="number"
						label="Nr Of Meeting Rooms"
						placeholder="ex : 4"
						name="meetingRooms"
						value={state.currentHotel?.meetingRooms}
						handleChange={handleChange}
						errors={errors.meetingRooms}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<TextInput
						type="text"
						label="Check-in and Check-out"
						placeholder="ex : 12noon/3pm"
						name="checkin_out"
						value={state.currentHotel?.checkin_out}
						handleChange={handleChange}
						errors={errors.checkin_out}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="text"
						label="Restaurants"
						placeholder="ex : 1x Restaurant/ 1x Bar"
						name="restaurants"
						value={state.currentHotel?.restaurants}
						handleChange={handleChange}
						errors={errors.restaurants}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="text"
						label="Swimming Pool"
						placeholder="ex : 1x Outdoor/ 1x Indoor"
						name="swimmingPool"
						value={state.currentHotel?.swimmingPool}
						handleChange={handleChange}
						errors={errors.swimmingPool}
						handleBlur={handleBlur}
					/>

					<TextInput
						type="checkbox"
						label="Wheelchair Accessible"
						name="wheelChairAccessible"
						value={state.currentHotel?.wheelChairAccessible}
						checked={state.currentHotel?.wheelChairAccessible}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.wheelChairAccessible}
					/>
				</div>
				<div>
					<h2 className="text-center text-xl">Description Hotel</h2>
					<label className="block uppercase text-lg text-gray-400 font-medium">
						Description (English)
					</label>
					<RichTextEditor
						screen={state.currentHotel}
						setTextContent={handleTextContentChange}
						textContent={state.currentHotel?.textContent || ''}
						update={state.update}
						style={{ width: '102%', marginBottom: '50px' }}
					/>
					<div className="mt-10">
						<AddDescriptionsInLanguages />
					</div>
				</div>
			</div>
		</fieldset>
	)
}
