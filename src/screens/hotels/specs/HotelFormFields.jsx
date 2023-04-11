import { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Icon } from '@iconify/react'
import {
	CheckboxInput,
	SelectInput,
	TextInput
} from '../../../ui'



export const HotelFormFields = ({
	formik,
	locations,
	imagesHotel,
	fileInput,
	update,
	setTextContent,
	textContent,
	hotel
}) => {
	
	const quillRef = useRef()

	const handleQuillChange = (content) => {
		setTextContent(content)
	}
	// if(update){
	// 	setTextContent(hotel?.textContent)
	// }

	useEffect(() => {
		if (update) {
			setTextContent(
				hotel?.textContent
					// .replace(/\\(.)/g, '$1')
					// .replace(/\\/g, '')
					// .replace(/\[/g, '')
					// .replace(/\]/g, '')
					// .replace(/"/g, '')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					// .replace(/&amp;/g, '&')
			)
		}
	}, [hotel, update])

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: [] }],
			[{ color: [] }, { background: [] }],
			[{ align: [] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }],
			['link', 'image'],
			['clean'],
		],
	}



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
					<ReactQuill
						className="bg-white-0 text-black-50"
						style={{ width: '140%', }}
						theme="snow"
						modules={modules}
						ref={quillRef}
						value={textContent}
						onChange={handleQuillChange}
						placeholder='Write a general description of the Hotel'
					/>
				</div>

				<CheckboxInput
					label="Wheelchair Accessible"
					name="wheelChairAccessible"
				/>
				{imagesHotel.length === 0 && (
					<label htmlFor="file-upload" className="mx-3">
						<Icon icon="akar-icons:cloud-upload" width="40" />
						<span>Upload Images</span>
					</label>
				)}
				{imagesHotel.length === 0 && (
					<input
						id="file-upload"
						type="file"
						ref={fileInput}
						name="imageContentUrl"
						multiple
						disabled={update ? true : false}
					/>
				)}
			</div>
			<input
				type="submit"
				className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
				value={update ? 'Edit Hotel Form' : 'Save new Hotel'}
			/>
		</fieldset>
	)
}
