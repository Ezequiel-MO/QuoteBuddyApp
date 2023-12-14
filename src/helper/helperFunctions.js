export const computeTotalDays = (startDate, endDate) => {
	const start = new Date(startDate)
	const end = new Date(endDate)
	const diffTime = Math.abs(end - start)
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
	return diffDays
}

export const whichDay = (counter, daydifference) => {
	if (counter === 1) {
		return 'Arrival Day'
	} else if (counter === daydifference) {
		return 'Departure Day'
	} else {
		return 'Day ' + counter
	}
}

export const computeInvoiceBreakdownTotal = (invoiceBreakdown) => {
	if (invoiceBreakdown.length === 1) {
		return 0
	} else {
		let total = 0
		for (let i = 1; i < invoiceBreakdown.length; i++) {
			total += Number(invoiceBreakdown[i].amount)
		}
		return total
	}
}
