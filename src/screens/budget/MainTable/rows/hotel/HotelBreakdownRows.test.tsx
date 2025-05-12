import {
	describe,
	it,
	beforeEach,
	afterEach,
	expect,
	vi,
	type Mock
} from 'vitest'
import { useCurrentProject } from 'src/hooks'
import { starterHotel, starterSchedule } from '@constants/starterObjects'
import { IDay } from '@interfaces/project'
import { HotelBreakdownRows } from './HotelBreakdownRows'
import { act, render, screen, within } from '@testing-library/react'

vi.mock('./HotelBreakdownRow', () => ({
	HotelBreakdownRow: ({
		units,
		rate,
		nights,
		title
	}: {
		units: number
		rate: number
		nights: number
		title: string
	}) => (
		<tr data-testid="HotelBreakdownRow">
			<td>{title}</td>
			<td>{units}</td>
			<td>{nights}</td>
			<td>{rate}</td>
			<td>{units * rate * nights}</td>
		</tr>
	)
}))

vi.mock('src/components/atoms/spinner/Spinner', () => ({
	Spinner: () => <div data-testid="Spinner">Loading...</div>
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

const mockUseCurrentProject = useCurrentProject as Mock

describe('HotelBreakdownRows', () => {
	const mockSetBudgetSelectedHotel = vi.fn()
	const mockSetBudgetSelectedHotelCost = vi.fn()
	const mockUpdateBudgetMeetingsTotalCost = vi.fn()
	const mockClearMeetingsBudget = vi.fn()

	const mockHotel1 = {
		...starterHotel,
		name: 'Hotel One',
		price: [
			{
				DUInr: 2,
				DUIprice: 100,
				DoubleRoomNr: 1,
				DoubleRoomPrice: 150,
				DailyTax: 20,
				breakfast: 10
			}
		]
	}

	const mockHotel2 = {
		...starterHotel,
		name: 'Hotel Two',
		price: [
			{
				DUInr: 1,
				DUIprice: 80,
				DoubleRoomNr: 2,
				DoubleRoomPrice: 120,
				DailyTax: 15,
				breakfast: 10
			}
		]
	}

	const mockSchedule: IDay[] = starterSchedule

	beforeEach(() => {
		vi.useFakeTimers()
		vi.clearAllMocks()
		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotel1, mockHotel2],
				schedule: mockSchedule
			},
			budget: {
				selectedHotel: mockHotel1
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})
	})

	afterEach(() => {
		vi.useRealTimers()
		vi.restoreAllMocks()
	})

	const renderComponent = (props: { isOpen: boolean } = { isOpen: false }) =>
		render(
			<table>
				<tbody>
					<HotelBreakdownRows {...props} />
				</tbody>
			</table>
		)

	it('renders nothing when selectedHotel is null', () => {
		const mockHotelWithoutPrice = {
			...starterHotel,
			name: 'Hotel Three',
			price: []
		}
		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotelWithoutPrice],
				schedule: mockSchedule
			},
			budget: {
				selectedHotel: mockHotelWithoutPrice
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		const { container } = renderComponent({ isOpen: true })
		expect(container.querySelector('tr')).toBeNull()
	})

	it('displays spinner while loading', async () => {
		vi.useFakeTimers()
		renderComponent({ isOpen: true })

		expect(screen.getByTestId('Spinner')).toBeInTheDocument()

		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		expect(screen.queryByTestId('Spinner')).not.toBeInTheDocument()

		vi.useRealTimers()
	})

	it('toggles visibility based on isOpen prop', async () => {
		vi.useFakeTimers()
		const { rerender } = renderComponent({ isOpen: false })
		const visibilityContainer = screen.getByTestId('visibility-container')
		expect(visibilityContainer).toHaveClass('max-h-0 opacity-0')
		await act(async () => {
			vi.advanceTimersByTime(1000)
		})
		rerender(
			<table>
				<tbody>
					<HotelBreakdownRows isOpen={true} />
				</tbody>
			</table>
		)

		expect(visibilityContainer).toHaveClass('max-h-[800px] opacity-100')
		vi.useRealTimers()
	})

	it('renders 4 HotelBreakdownRow components when breakfast > 0', async () => {
		vi.useFakeTimers()
		renderComponent({ isOpen: true })

		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		await act(async () => {
			vi.advanceTimersByTime(1000)
			const rows = screen.getAllByTestId('HotelBreakdownRow')
			expect(rows.length).toBe(4)
			expect(rows[3]).toHaveTextContent('Breakfast')
		})

		vi.useRealTimers()
	})

	it('renders 3 HotelBreakdownRow components when breakfast = 0', async () => {
		const mockHotelNoBreakfast = {
			...starterHotel,
			name: 'Hotel No Breakfast',
			price: [
				{
					DUInr: 2,
					DUIprice: 100,
					DoubleRoomNr: 1,
					DoubleRoomPrice: 150,
					DailyTax: 20,
					breakfast: 0 // Set breakfast to 0
				}
			]
		}

		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotelNoBreakfast, mockHotel2],
				schedule: mockSchedule
			},
			budget: {
				selectedHotel: mockHotelNoBreakfast
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		vi.useFakeTimers()
		renderComponent({ isOpen: true })

		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		const rows = screen.getAllByTestId('HotelBreakdownRow')
		expect(rows.length).toBe(3)
		expect(rows[2]).not.toHaveTextContent('Breakfast')

		vi.useRealTimers()
	})

	it('calculates numberOfNights correctly for schedule with 2 days', async () => {
		const mockScheduleTwoDays: IDay[] = [{} as IDay, {} as IDay]

		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotel1, mockHotel2],
				schedule: mockScheduleTwoDays
			},
			budget: {
				selectedHotel: mockHotel1
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		vi.useFakeTimers()
		renderComponent({ isOpen: true })

		await act(async () => {
			vi.advanceTimersByTime(1000)
		})
		const rows = screen.getAllByTestId('HotelBreakdownRow')
		const cityTaxRow = rows.find((row) => row.textContent?.includes('City Tax'))
		expect(cityTaxRow).toBeDefined()

		if (cityTaxRow) {
			const { getAllByRole } = within(cityTaxRow)
			const cells = getAllByRole('cell')

			expect(cells[2]).toHaveTextContent('1')
		}

		vi.useRealTimers()
	})

	it('calculates numberOfNights correctly for schedule with 1 day', async () => {
		const mockScheduleOneDay: IDay[] = [{} as IDay]

		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotel1, mockHotel2],
				schedule: mockScheduleOneDay
			},
			budget: {
				selectedHotel: mockHotel1
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		vi.useFakeTimers()
		renderComponent({ isOpen: true })

		// Fast-forward the timeout to end loading
		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		const rows = screen.getAllByTestId('HotelBreakdownRow')
		const cityTaxRow = rows.find((row) => row.textContent?.includes('City Tax'))
		expect(cityTaxRow).toBeDefined()

		if (cityTaxRow) {
			const { getAllByRole } = within(cityTaxRow)
			const cells = getAllByRole('cell')
			// cells[2] is the 'Nr. of Nights' column
			expect(cells[2]).toHaveTextContent('0')
		}

		vi.useRealTimers()
	})

	it('handles empty schedule gracefully by setting numberOfNights to 0', async () => {
		const mockScheduleEmpty: IDay[] = []

		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotel1, mockHotel2],
				schedule: mockScheduleEmpty
			},
			budget: {
				selectedHotel: mockHotel1
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		vi.useFakeTimers()
		renderComponent({ isOpen: true })

		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		const rows = screen.getAllByTestId('HotelBreakdownRow')
		const cityTaxRow = rows.find((row) => row.textContent?.includes('City Tax'))
		expect(cityTaxRow).toBeDefined()

		if (cityTaxRow) {
			const { getAllByRole } = within(cityTaxRow)
			const cells = getAllByRole('cell')
			expect(cells[2]).toHaveTextContent('0')
		}

		vi.useRealTimers()
	})

	it('renders correct HotelBreakdownRow components for a different selectedHotel', async () => {
		const mockHotelSelected = mockHotel2

		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotel1, mockHotel2],
				schedule: mockSchedule // Ensure schedule has the expected length
			},
			budget: {
				selectedHotel: mockHotelSelected
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		vi.useFakeTimers()
		renderComponent({ isOpen: true })

		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		const rows = screen.getAllByTestId('HotelBreakdownRow')
		expect(rows.length).toBe(4)
		expect(rows[0]).toHaveTextContent('Double Room Single Use')
		expect(rows[1]).toHaveTextContent('Double Room // Twin Room')
		expect(rows[2]).toHaveTextContent('City Tax')
		expect(rows[3]).toHaveTextContent('Breakfast')

		// First Row: Double Room Single Use
		const firstRow = rows[0]
		const { getAllByRole: getAllByRoleFirstRow } = within(firstRow)
		const cellsFirstRow = getAllByRoleFirstRow('cell')
		expect(cellsFirstRow[1]).toHaveTextContent('1') // DUInr
		expect(cellsFirstRow[3]).toHaveTextContent('80') // DUIprice
		expect(cellsFirstRow[2]).toHaveTextContent('1') // Nights

		// Second Row: Double Room // Twin Room
		const secondRow = rows[1]
		const { getAllByRole: getAllByRoleSecondRow } = within(secondRow)
		const cellsSecondRow = getAllByRoleSecondRow('cell')
		expect(cellsSecondRow[1]).toHaveTextContent('2') // DoubleRoomNr
		expect(cellsSecondRow[3]).toHaveTextContent('120') // DoubleRoomPrice
		expect(cellsSecondRow[2]).toHaveTextContent('1') // Nights

		// Third Row: City Tax
		const cityTaxRow = rows[2]
		const { getAllByRole: getAllByRoleCityTaxRow } = within(cityTaxRow)
		const cellsCityTaxRow = getAllByRoleCityTaxRow('cell')
		expect(cellsCityTaxRow[1]).toHaveTextContent('5') // DUInr + DoubleRoomNr * 2 =1 +2*2=5
		expect(cellsCityTaxRow[3]).toHaveTextContent('15') // DailyTax
		expect(cellsCityTaxRow[2]).toHaveTextContent('1') // Nights

		// Fourth Row: Breakfast
		const breakfastRow = rows[3]
		const { getAllByRole: getAllByRoleBreakfastRow } = within(breakfastRow)
		const cellsBreakfastRow = getAllByRoleBreakfastRow('cell')
		expect(cellsBreakfastRow[1]).toHaveTextContent('5') // DUInr + DoubleRoomNr * 2 =1 +2*2=5
		expect(cellsBreakfastRow[3]).toHaveTextContent('10') // breakfast
		expect(cellsBreakfastRow[2]).toHaveTextContent('1') // Nights

		vi.useRealTimers()
	})

	it('handles error thrown by useCurrentProject gracefully', () => {
		// Mock useCurrentProject to throw an error
		mockUseCurrentProject.mockImplementation(() => {
			throw new Error('useCurrentProject hook error')
		})

		// Spy on console.error to suppress error logs during test
		const consoleErrorSpy = vi
			.spyOn(console, 'error')
			.mockImplementation(() => {})

		expect(() => renderComponent({ isOpen: true })).toThrow(
			'useCurrentProject hook error'
		)

		// Restore console.error
		consoleErrorSpy.mockRestore()
	})

	it('updates dependentUnits correctly when DUInr is edited', async () => {
		// Initial state: DUInr = 2, DoubleRoomNr = 1, dependentUnits = 2 + 2*1 = 4
		const { rerender } = renderComponent({ isOpen: true })

		// Advance timers to end loading
		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		// Find the "City Tax" row and verify dependentUnits
		const cityTaxRow = screen.getByText('City Tax').closest('tr')
		expect(cityTaxRow).toBeInTheDocument()
		if (cityTaxRow) {
			const { getAllByRole } = within(cityTaxRow)
			const cells = getAllByRole('cell')
			expect(cells[1]).toHaveTextContent('4') // dependentUnits = 4
		}

		// Update DUInr to 3: new dependentUnits = 3 + 2*1 = 5
		const updatedHotel1 = {
			...mockHotel1,
			price: [
				{
					...mockHotel1.price[0],
					DUInr: 3 // Edited DUInr
				}
			]
		}

		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [updatedHotel1, mockHotel2],
				schedule: mockSchedule
			},
			budget: {
				selectedHotel: updatedHotel1
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		// Re-render the component with updated mock
		rerender(
			<table>
				<tbody>
					<HotelBreakdownRows isOpen={true} />
				</tbody>
			</table>
		)

		// Advance timers to end loading after re-render
		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		// Verify that "City Tax" row has updated dependentUnits
		const updatedCityTaxRow = screen.getByText('City Tax').closest('tr')
		expect(updatedCityTaxRow).toBeInTheDocument()
		if (updatedCityTaxRow) {
			const { getAllByRole } = within(updatedCityTaxRow)
			const cells = getAllByRole('cell')
			expect(cells[1]).toHaveTextContent('5') // dependentUnits = 5
		}
	})

	it('updates dependentUnits correctly when DoubleRoomNr is edited', async () => {
		// Initial state: DUInr = 2, DoubleRoomNr = 1, dependentUnits = 2 + 2*1 = 4
		const { rerender } = renderComponent({ isOpen: true })

		// Advance timers to end loading
		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		// Find the "City Tax" row and verify dependentUnits
		const cityTaxRow = screen.getByText('City Tax').closest('tr')
		expect(cityTaxRow).toBeInTheDocument()
		if (cityTaxRow) {
			const { getAllByRole } = within(cityTaxRow)
			const cells = getAllByRole('cell')
			expect(cells[1]).toHaveTextContent('4') // dependentUnits = 4
		}

		// Update DoubleRoomNr to 2: new dependentUnits = 2 + 2*2 = 6
		const updatedHotel1 = {
			...mockHotel1,
			price: [
				{
					...mockHotel1.price[0],
					DoubleRoomNr: 2 // Edited DoubleRoomNr
				}
			]
		}

		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [updatedHotel1, mockHotel2],
				schedule: mockSchedule
			},
			budget: {
				selectedHotel: updatedHotel1
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		// Re-render the component with updated mock
		rerender(
			<table>
				<tbody>
					<HotelBreakdownRows isOpen={true} />
				</tbody>
			</table>
		)

		// Advance timers to end loading after re-render
		await act(async () => {
			vi.advanceTimersByTime(1000)
		})

		// Verify that "City Tax" row has updated dependentUnits
		const updatedCityTaxRow = screen.getByText('City Tax').closest('tr')
		expect(updatedCityTaxRow).toBeInTheDocument()
		if (updatedCityTaxRow) {
			const { getAllByRole } = within(updatedCityTaxRow)
			const cells = getAllByRole('cell')
			expect(cells[1]).toHaveTextContent('6') // dependentUnits = 6
		}
	})
})
