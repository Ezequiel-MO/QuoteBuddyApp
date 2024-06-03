import { HotelFormFields } from './HotelFormFields'

export const HotelMasterForm = () => {
	//logica para hacer el handleSubmit

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('submit')
	}

	return (
		<form onSubmit={handleSubmit}>
			<HotelFormFields />
		</form>
	)
}
