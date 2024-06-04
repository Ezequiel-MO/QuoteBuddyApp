import baseAPI from 'src/axios/axiosConfig'
import { useHotel } from '../context/HotelsContext'
import { HotelFormFields } from './HotelFormFields'

export const HotelMasterForm = () => {
	const { state, dispatch } = useHotel()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await baseAPI.post('hotels', state.currentHotel)
		} catch (error) {
			alert(error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<HotelFormFields />
			<div className="flex justify-center m-6">
				<button
					type="submit"
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
				{/* 	<button
					type="button"
					onClick={() => {
						dispatch({
							type: 'SET_IMAGES_MODAL_OPEN',
							payload: true
						})
					}}
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Add/Edit Images
				</button> */}
			</div>
		</form>
	)
}
