import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
	type Mock
} from 'vitest'
import { render, screen } from '@testing-library/react'
import { DayRows } from './DayRows'
import { analyzeItinerary } from 'src/helper/budget/budgetHelpers'
import { starterSchedule } from 'src/constants/starterObjects'
import { IDay } from '../../../../interfaces'

// --- Sub-components used within DayRows ---
vi.mock('../sections', () => ({
	MorningSection: (props: any) => (
		<tr data-testid="MorningSection">
			<td>MorningSection</td>
		</tr>
	),
	AfternoonSection: (props: any) => (
		<tr data-testid="AfternoonSection">
			<td>AfternoonSection</td>
		</tr>
	),
	DinnerSection: (props: any) => (
		<tr data-testid="DinnerSection">
			<td>DinnerSection</td>
		</tr>
	),
	LunchSection: (props: any) => (
		<tr data-testid="LunchSection">
			<td>LunchSection</td>
		</tr>
	),
	TransfersInSection: (props: any) => (
		<tr data-testid="TransfersInSection">
			<td>TransfersInSection</td>
		</tr>
	),
	TransfersOutSection: (props: any) => (
		<tr data-testid="TransfersOutSection">
			<td>TransfersOutSection</td>
		</tr>
	)
}))

vi.mock('../sections/TransferItinerarySection', () => ({
	TransferItinerarySection: (props: any) => (
		<tr data-testid="TransferItinerarySection">
			<td>TransferItinerarySection</td>
		</tr>
	)
}))

// IMPORTANT: Change the OptionSelect mock so it only returns the select element,
// not a <td> wrapping the select. This prevents nested <td> warnings.
vi.mock('../../../MainTable/multipleOrSingle/OptionSelect', () => ({
	OptionSelect: ({ options, value, handleChange }: any) => (
		<select data-testid="optionSelect" value={value} onChange={handleChange}>
			{options.map((option: any) => (
				<option key={option._id} value={option.name}>
					{option.name}
				</option>
			))}
		</select>
	)
}))

vi.mock('src/helper/budget/budgetHelpers', () => ({
	analyzeItinerary: vi.fn()
}))

describe('DayRows', () => {
	const mockAnalyzeItinerary = analyzeItinerary as Mock

	// Utility to render DayRows in a table structure.
	const renderDayRows = ({
		day,
		pax = 2,
		isFirstDay = false,
		isLastDay = false,
		multiDestination = false
	}: {
		day: IDay
		pax?: number
		isFirstDay?: boolean
		isLastDay?: boolean
		multiDestination?: boolean
	}) => {
		return render(
			<table>
				<tbody>
					<DayRows
						day={day}
						pax={pax}
						isFirstDay={isFirstDay}
						isLastDay={isLastDay}
						multiDestination={multiDestination}
					/>
				</tbody>
			</table>
		)
	}

	beforeEach(() => {
		vi.clearAllMocks()
		// Default analyzeItinerary return => all flags false
		mockAnalyzeItinerary.mockReturnValue({
			isMorningItinerary: false,
			isAfternoonItinerary: false,
			isItineraryWithMorningActivities: false,
			isItineraryWithAfternoonActivities: false,
			isItineraryWithLunch: false,
			isItineraryWithDinner: false
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('renders the essential sections (Morning, Afternoon, Dinner, Lunch) by default', () => {
		// Use the first day in starterSchedule as baseline
		const day = starterSchedule[0]
		renderDayRows({ day })

		// Expect these sections to always render
		expect(screen.getByTestId('MorningSection')).toBeInTheDocument()
		expect(screen.getByTestId('AfternoonSection')).toBeInTheDocument()
		expect(screen.getByTestId('DinnerSection')).toBeInTheDocument()
		expect(screen.getByTestId('LunchSection')).toBeInTheDocument()

		// Transfer-related sections should NOT render by default (all flags false)
		expect(
			screen.queryByTestId('TransferItinerarySection')
		).not.toBeInTheDocument()
		expect(screen.queryByTestId('TransfersInSection')).not.toBeInTheDocument()
		expect(screen.queryByTestId('TransfersOutSection')).not.toBeInTheDocument()
	})

	it('renders TransfersInSection when isFirstDay is true', () => {
		const day = { ...starterSchedule[0], transfer_in: [] }
		renderDayRows({ day, isFirstDay: true })

		expect(screen.getByTestId('TransfersInSection')).toBeInTheDocument()
	})

	it('renders TransfersOutSection when isLastDay is true', () => {
		const day = { ...starterSchedule[0], transfer_out: [] }
		renderDayRows({ day, isLastDay: true })

		expect(screen.getByTestId('TransfersOutSection')).toBeInTheDocument()
	})

	it('renders TransferItinerarySection for morning itinerary', () => {
		// Force analyzeItinerary to say isMorningItinerary = true
		mockAnalyzeItinerary.mockReturnValueOnce({
			isMorningItinerary: true,
			isAfternoonItinerary: false,
			isItineraryWithMorningActivities: false,
			isItineraryWithAfternoonActivities: false,
			isItineraryWithLunch: false,
			isItineraryWithDinner: false
		})

		const day = {
			...starterSchedule[0],
			itinerary: {
				...starterSchedule[0].itinerary,
				starts: 'morning' as 'morning'
			}
		}
		renderDayRows({ day })

		expect(screen.getByTestId('TransferItinerarySection')).toBeInTheDocument()
	})

	it('renders TransferItinerarySection for afternoon itinerary', () => {
		// Force analyzeItinerary to say isAfternoonItinerary = true
		mockAnalyzeItinerary.mockReturnValueOnce({
			isMorningItinerary: false,
			isAfternoonItinerary: true,
			isItineraryWithMorningActivities: false,
			isItineraryWithAfternoonActivities: false,
			isItineraryWithLunch: false,
			isItineraryWithDinner: false
		})

		const day = {
			...starterSchedule[0],
			itinerary: {
				...starterSchedule[0].itinerary,
				starts: 'afternoon' as 'afternoon'
			}
		}
		renderDayRows({ day })

		expect(screen.getByTestId('TransferItinerarySection')).toBeInTheDocument()
	})

	it('renders additional sub-sections if analyzeItinerary indicates itinerary-based activities', () => {
		// For example: morning & afternoon events, lunch, dinner set to true
		mockAnalyzeItinerary.mockReturnValue({
			isMorningItinerary: true,
			isAfternoonItinerary: true,
			isItineraryWithMorningActivities: true,
			isItineraryWithAfternoonActivities: true,
			isItineraryWithLunch: true,
			isItineraryWithDinner: true
		})

		const day = starterSchedule[0]
		renderDayRows({ day, multiDestination: true })

		// TransferItinerarySection for both morning & afternoon
		expect(screen.getAllByTestId('TransferItinerarySection')).toHaveLength(2)
		// Always-present sections
		expect(screen.getByTestId('MorningSection')).toBeInTheDocument()
		expect(screen.getByTestId('AfternoonSection')).toBeInTheDocument()
		expect(screen.getByTestId('DinnerSection')).toBeInTheDocument()
		expect(screen.getByTestId('LunchSection')).toBeInTheDocument()
	})

	it('does NOT render TransferItinerarySection if analyzeItinerary returns all false', () => {
		mockAnalyzeItinerary.mockReturnValue({
			isMorningItinerary: false,
			isAfternoonItinerary: false,
			isItineraryWithMorningActivities: false,
			isItineraryWithAfternoonActivities: false,
			isItineraryWithLunch: false,
			isItineraryWithDinner: false
		})
		const day = starterSchedule[1]
		renderDayRows({ day })

		expect(
			screen.queryByTestId('TransferItinerarySection')
		).not.toBeInTheDocument()
	})
})
