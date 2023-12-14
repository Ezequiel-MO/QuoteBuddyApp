export const shortenDate = (date, invoiceNumber) => {
	if (Number(invoiceNumber > 23022)) {
		return date
	} else {
		const dateArray = date.split(' ')
		const day = dateArray[1].slice(0, -3)
		const month = dateArray[0]
		const year = dateArray[2]
		const months = {
			January: '01',
			February: '02',
			March: '03',
			April: '04',
			May: '05',
			June: '06',
			July: '07',
			August: '08',
			September: '09',
			October: '10',
			November: '11',
			December: '12'
		}
		if (`${day}/${months[month]}/${year}`.includes('undefined' || 'NaN')) {
			return 'Inv. Date'
		}
		return `${day}/${months[month]}/${year}`
	}
}
