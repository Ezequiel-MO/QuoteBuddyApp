import { LetterMonthNames } from '../constants'

export const formatDate = (dateString: string): string => {
	const dateObj = new Date(dateString)
	const year = dateObj.getFullYear()
	const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
	const day = String(dateObj.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

export function formatYearMonthDate(dateString: string): string {
	const date = new Date(dateString)
	const month = LetterMonthNames[date.getMonth()]
	const year = date.getFullYear().toString().slice(2)
	return `${month}-${year}`
}

export function getTailwindClassesForDate(dateString: string): string {
	const date = new Date(dateString)
	const currentDate = new Date()

	// Calculate the difference in milliseconds
	const diffInMilliseconds = currentDate.getTime() - date.getTime()

	// Convert the difference from milliseconds to months
	const diffInMonths = Math.floor(
		diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
	)

	if (diffInMonths >= 12) {
		return 'overdue'
	} else if (diffInMonths >= 6) {
		return 'due-soon'
	} else {
		return 'not-due'
	}
}
