import React, { FC } from 'react'
import { TextInput } from '@components/atoms'
import { RichTextEditor, SelectLocation } from '../../../components/molecules'
import { HotelCategorySelector } from './HotelCategorySelector'
import { DescriptionForm } from "./DescriptionForm"
import { IHotel } from 'src/interfaces'

interface ICoordinates {
	longitude?: number
	latitude?: number
}

interface HotelFormFieldsProps {
	data: IHotel & ICoordinates
	setData: React.Dispatch<React.SetStateAction<IHotel & ICoordinates>>
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
	errors: { [key: string]: string | undefined }
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	setTextContent: React.Dispatch<React.SetStateAction<string>>
	textContent: string
	update: boolean
	hotel: IHotel
	descriptionsByLanguage: object[]
	setDescriptionsByLanguage: React.Dispatch<React.SetStateAction<object[]>>
}

const categoriesStar = [1, 2, 3, 4, 5]

export const HotelFormFields: FC<HotelFormFieldsProps> = ({
	data,
	setData,
	handleChange,
	handleChangeCheckbox,
	errors,
	handleBlur,
	setTextContent,
	textContent,
	update,
	hotel,
	//
	descriptionsByLanguage,
	setDescriptionsByLanguage
}) => {

	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">General Hotel Data</h1>
			</legend>
			<div className="space-y-4">
				<TextInput
					type="text"
					label="Name"
					placeholder="Hotel Excelsior - 4star Superior"
					name="name"
					value={data.name}
					handleChange={handleChange}
					errors={errors.name}
					handleBlur={handleBlur}
				/>
				<div>
					<label className="block uppercase text-lg text-gray-400 font-medium mb-2">
						Location
					</label>
					<SelectLocation
						city={data.city as string}
						setData={setData}
						handleChange={handleChange}
					/>
					{errors.city && !data.city && (
						<p className="text-red-500 mt-1">{errors.city}</p>
					)}
					<TextInput
						type="text"
						label="Address"
						placeholder="ex : c/Pina 57"
						name="address"
						value={data.address}
						handleChange={handleChange}
						errors={errors.address}
						handleBlur={handleBlur}
					/>
					<div className="flex space-x-4">
						<TextInput
							type="number"
							label="Longitude"
							placeholder="ex : 2.154007"
							name="longitude"
							value={data.longitude}
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={errors.longitude}
							step="any"
						/>
						<TextInput
							type="number"
							label="Latitude"
							placeholder="ex : 41.390205"
							name="latitude"
							value={data.latitude}
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={errors.latitude}
							step="any"
						/>
					</div>
					<HotelCategorySelector
						options={categoriesStar}
						numberStars={data.numberStars}
						handleChange={handleChange}
						errors={errors}
						handleBlur={handleBlur}
					/>
					<div className="flex space-x-4">
						<TextInput
							type="number"
							label="Total Number Of Rooms"
							placeholder="ex : 100 rooms"
							name="numberRooms"
							value={data.numberRooms}
							handleChange={handleChange}
							errors={errors.numberRooms}
							handleBlur={handleBlur}
						/>
						<TextInput
							type="number"
							label="Nr Of Meeting Rooms"
							placeholder="ex : 4"
							name="meetingRooms"
							value={data.meetingRooms}
							handleChange={handleChange}
							errors={errors.meetingRooms}
							handleBlur={handleBlur}
						/>
					</div>
					<TextInput
						type="text"
						label="Check-in and Check-out"
						placeholder="ex : 12noon/3pm"
						name="checkin_out"
						value={data.checkin_out}
						handleChange={handleChange}
						errors={errors.checkin_out}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="text"
						label="Wi-Fi Speed"
						placeholder="ex : Available all rooms/common areas"
						name="wifiSpeed"
						value={data.wifiSpeed}
						handleChange={handleChange}
						errors={errors.wifiSpeed}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="text"
						label="Restaurants"
						placeholder="ex : 1x Restaurant/ 1x Bar"
						name="restaurants"
						value={data.restaurants}
						handleChange={handleChange}
						errors={errors.restaurants}
						handleBlur={handleBlur}
					/>
					<div className="flex space-x-4">
						<TextInput
							type="text"
							label="Swimming Pool"
							placeholder="ex : 1x Outdoor/ 1x Indoor"
							name="swimmingPool"
							value={data.swimmingPool}
							handleChange={handleChange}
							errors={errors.swimmingPool}
							handleBlur={handleBlur}
						/>
						<div className="w-auto">
							<TextInput
								type="checkbox"
								label="Wheelchair Accessible"
								name="wheelChairAccessible"
								value={data.wheelChairAccessible}
								checked={data.wheelChairAccessible}
								handleChange={handleChangeCheckbox}
								handleBlur={handleBlur}
								errors={errors.pricePerPerson}
							/>
						</div>
					</div>
					<div className="my-2 text-white-100">
						<hr />
						<h2 className='text-center text-xl'>
							Description Hotel
						</h2>
						<label className="block uppercase text-lg text-gray-400 font-medium ">
							Description (english)
						</label>
						<RichTextEditor
							screen={hotel}
							setTextContent={setTextContent}
							textContent={textContent}
							update={update}
							style={{ width: '102%', marginBottom: '50px' }}
						/>
					</div>
					<div>
						<DescriptionForm
							descriptionsByLanguage={descriptionsByLanguage}
							setDescriptionsByLanguage={setDescriptionsByLanguage}
							data={data}
							setData={setData}
						/>
					</div>
				</div>
			</div>
		</fieldset>
	)
}
