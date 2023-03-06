import * as Yup from 'yup'

export const getValidationSchema = () => {
	return Yup.object({
		name: Yup.string().required('Required'),
		city: Yup.string().required('Required'),
		address: Yup.string().required('Required'),
		numberStars: Yup.number().required('Required'),
		numberRooms: Yup.number().required('Required'),
		checkin_out: Yup.string().required('Required'),
		meetingRooms: Yup.number().required('Required'),
		wheelChairAccessible: Yup.boolean(),
		wifiSpeed: Yup.string().required('Required'),
		swimmingPool: Yup.string().required('Required'),
		restaurants: Yup.string().required('Required'),
		longitude: Yup.number().required('Required'),
		latitude: Yup.number().required('Required')
	})
}
