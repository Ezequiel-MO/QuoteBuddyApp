const getDayOfWeek = (date: Date, quoteLanguage: string) => {
	const day = date.getDay()
	if (quoteLanguage === 'ES') {
		return [
			'Domingo',
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sábado'
		][day]
	}
	return [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	][day]
}

const getMonthOfYear = (date: Date, quoteLanguage: string) => {
	const month = date.getMonth()
	if (quoteLanguage === 'ES') {
		return [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		][month]
	}

	return [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	][month]
}

const formatDate = (date: Date, quoteLanguage: string) => {
	const dayOfWeek = getDayOfWeek(date, quoteLanguage)
	const monthOfYear = getMonthOfYear(date, quoteLanguage)
	return `${dayOfWeek}, ${monthOfYear} ${date.getDate()}`
}

export const convertDate = (
	index: number,
	arrivalDay: string,
	quoteLanguage: string = 'EN'
) => {
	const date = new Date(arrivalDay)
	if (index === 0) {
		return formatDate(date, quoteLanguage)
	}
	const newDate = new Date(date.setDate(date.getDate() + index))
	return formatDate(newDate, quoteLanguage)
}
