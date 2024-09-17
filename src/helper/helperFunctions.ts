import { IInvoiceBreakdownLine } from '@interfaces/invoice'

export const computeTotalDays = (
	startDate: string,
	endDate: string
): number => {
	const start = new Date(startDate)
	const end = new Date(endDate)
	const diffTime = Math.abs(end.getTime() - start.getTime())
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
	return diffDays
}

export const whichDay = (counter: number, daydifference: number): string => {
	if (counter === 1) {
		return 'Arrival Day'
	} else if (counter === daydifference) {
		return 'Departure Day'
	} else {
		return 'Day ' + counter
	}
}

export function formatCamelCaseToWords(nameEvent: string): string {
	const upLetter = nameEvent
		.split('')
		.find((el) => el === el.toLocaleUpperCase())
	const indexUpLetter = nameEvent.indexOf(upLetter || '')
	if (indexUpLetter === -1) return nameEvent
	return (
		nameEvent.slice(0, indexUpLetter) +
		' ' +
		nameEvent.slice(indexUpLetter).toLowerCase()
	)
}

export function findPathname(
	pathname: string = '',
	routes: string[] = []
): boolean {
	const path = pathname.split('/').slice(0, 3).join('')
	const route = routes.filter((el) => el.split('/').join('').includes(path))
	return route.length > 0
}
