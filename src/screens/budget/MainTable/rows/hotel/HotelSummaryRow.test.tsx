import {
	describe,
	it,
	beforeEach,
	afterEach,
	expect,
	vi,
	type Mock
} from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HotelSummaryRow } from './HotelSummaryRow'
import { useCurrentProject } from 'src/hooks'
import type { IHotel } from '@interfaces/hotel'
import { starterHotel } from 'src/constants/starterObjects'

// Mock components
vi.mock('@components/atoms/ToggleTableRowIcon', () => ({
	ToggleTableRowIcon: ({
		isOpen,
		toggle
	}: {
		isOpen: boolean
		toggle: () => void
	}) => (
		<button data-testid="ToggleTableRowIcon" onClick={toggle}>
			{isOpen ? 'true' : 'false'}
		</button>
	)
}))

vi.mock('./HotelTotalCost', () => ({
	HotelTotalCost: () => <span data-testid="HotelTotalCost">€0.00</span>
}))

vi.mock('../../multipleOrSingle/OptionSelect', () => ({
	OptionSelect: ({
		options,
		value,
		handleChange
	}: {
		options: IHotel[]
		value: string
		handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	}) => (
		<select value={value} onChange={handleChange} data-testid="OptionSelect">
			{options.map((hotel) => (
				<option key={hotel._id} value={hotel.name}>
					{hotel.name}
				</option>
			))}
		</select>
	)
}))

// Mock useCurrentProject hook
const mockSetBudgetSelectedHotel = vi.fn()
const mockSetBudgetSelectedHotelCost = vi.fn()
const mockUpdateBudgetMeetingsTotalCost = vi.fn()
const mockClearMeetingsBudget = vi.fn()

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

describe('HotelSummaryRow', () => {
	const mockUseCurrentProject = useCurrentProject as unknown as Mock

	interface HotelSummaryRowProps {
		isOpen: boolean
		setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	}

	const defaultProps: HotelSummaryRowProps = {
		isOpen: false,
		setIsOpen: vi.fn()
	}

	const mockHotel1: IHotel = { ...starterHotel, _id: 'h1', name: 'Hotel One' }
	const mockHotel2: IHotel = { ...starterHotel, _id: 'h2', name: 'Hotel Two' }
	const mockSchedule = ['meeting1', 'meeting2']

	beforeEach(() => {
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
		vi.restoreAllMocks()
	})

	const renderComponent = (props = defaultProps) =>
		render(
			<table>
				<tbody>
					<HotelSummaryRow {...props} />
				</tbody>
			</table>
		)

	it('renders correctly with multiple hotels and displays OptionSelect', () => {
		renderComponent()

		expect(screen.getByTestId('ToggleTableRowIcon')).toBeInTheDocument()
		expect(screen.queryByText('Overnight @')).not.toBeInTheDocument()
		expect(screen.getByTestId('OptionSelect')).toBeInTheDocument()
		expect(screen.getByTestId('HotelTotalCost')).toBeInTheDocument()
	})

	it('renders correctly with single hotel and displays hotel name', () => {
		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotel1],
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

		renderComponent()

		expect(screen.getByTestId('ToggleTableRowIcon')).toBeInTheDocument()
		expect(screen.queryByText('Overnight @')).not.toBeInTheDocument()
		expect(screen.getByText(mockHotel1.name)).toBeInTheDocument()
		expect(screen.getByTestId('HotelTotalCost')).toBeInTheDocument()
	})

	it('renders "Overnight @" when multiDestination is true', () => {
		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: true,
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

		renderComponent()

		expect(screen.getByText('Overnight @')).toBeInTheDocument()
	})

	it('calls setBudgetSelectedHotel when a different hotel is selected', () => {
		renderComponent()

		const select = screen.getByTestId('OptionSelect') as HTMLSelectElement
		fireEvent.change(select, { target: { value: mockHotel2.name } })

		expect(mockSetBudgetSelectedHotel).toHaveBeenCalledTimes(1)
		expect(mockSetBudgetSelectedHotel).toHaveBeenCalledWith(mockHotel2)
	})

	it('toggles isOpen state when ToggleTableRowIcon is clicked', () => {
		const setIsOpen = vi.fn()
		render(
			<table>
				<tbody>
					<HotelSummaryRow {...{ ...defaultProps, setIsOpen }} />
				</tbody>
			</table>
		)

		const toggleButton = screen.getByTestId('ToggleTableRowIcon')
		fireEvent.click(toggleButton)

		expect(setIsOpen).toHaveBeenCalledTimes(1)
		expect(setIsOpen).toHaveBeenCalledWith(true)
	})

	it('triggers useEffect side effects on selectedHotel change', () => {
		const { rerender } = renderComponent()

		expect(mockUpdateBudgetMeetingsTotalCost).toHaveBeenCalledWith(0)
		expect(mockClearMeetingsBudget).toHaveBeenCalledTimes(1)
		expect(mockSetBudgetSelectedHotelCost).toHaveBeenCalledWith(
			mockHotel1,
			mockSchedule.length - 1
		)

		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotel1, mockHotel2],
				schedule: mockSchedule
			},
			budget: {
				selectedHotel: mockHotel2
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		rerender(
			<table>
				<tbody>
					<HotelSummaryRow {...defaultProps} />
				</tbody>
			</table>
		)

		expect(mockUpdateBudgetMeetingsTotalCost).toHaveBeenCalledWith(0)
		expect(mockClearMeetingsBudget).toHaveBeenCalledTimes(2)
		expect(mockSetBudgetSelectedHotelCost).toHaveBeenCalledWith(
			mockHotel2,
			mockSchedule.length - 1
		)
	})

	it('does not call setBudgetSelectedHotelCost if selectedHotel is undefined', () => {
		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [mockHotel1, mockHotel2],
				schedule: mockSchedule
			},
			budget: {
				selectedHotel: undefined
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		renderComponent()

		expect(mockSetBudgetSelectedHotelCost).not.toHaveBeenCalled()
	})

	it('renders nothing if hotels array is empty', () => {
		mockUseCurrentProject.mockReturnValue({
			currentProject: {
				multiDestination: false,
				hotels: [],
				schedule: mockSchedule
			},
			budget: {
				selectedHotel: undefined
			},
			setBudgetSelectedHotel: mockSetBudgetSelectedHotel,
			setBudgetSelectedHotelCost: mockSetBudgetSelectedHotelCost,
			updateBudgetMeetingsTotalCost: mockUpdateBudgetMeetingsTotalCost,
			clearMeetingsBudget: mockClearMeetingsBudget
		})

		renderComponent()

		expect(screen.queryByRole('row')).not.toBeInTheDocument()
		expect(mockUpdateBudgetMeetingsTotalCost).not.toHaveBeenCalled()
		expect(mockClearMeetingsBudget).not.toHaveBeenCalled()
		expect(mockSetBudgetSelectedHotelCost).not.toHaveBeenCalled()
	})
})
