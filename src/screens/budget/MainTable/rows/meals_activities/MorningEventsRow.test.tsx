// MorningEventsRow.test.tsx
import { vi, type Mock } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MorningEventsRow } from './MorningEventsRow'
import { IEvent } from '@interfaces/event'
import { starterEvent } from 'src/constants/starterObjects'
import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'
import { useCurrentProject } from 'src/hooks'

// Update the OptionSelect mock so that it returns a valid table cell.
vi.mock('../../../MainTable/multipleOrSingle/OptionSelect', () => ({
	OptionSelect: ({ options, value, handleChange }: any) => (
		<span>
			<select data-testid="optionSelect" value={value} onChange={handleChange}>
				{options.map((option: any) => (
					<option key={option._id} value={option.name}>
						{option.name}
					</option>
				))}
			</select>
		</span>
	)
}))

// Update the EditableCell mock so that it returns a table cell (<td>) instead of a <div>.
vi.mock('./EditableCell', () => ({
	EditableCell: ({ value, onSave, typeValue, originalValue }: any) => (
		<span
			data-testid={`editableCell-${typeValue}`}
			onClick={() => onSave(value)}
		>
			{value} | (orig: {originalValue})
		</span>
	)
}))

// Mock hooks after their dependencies are mocked.
vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

vi.mock('sweetalert2', () => ({
	_esModule: true,
	default: {
		fire: vi.fn()
	}
}))

vi.mock('sweetalert2-react-content', () => ({
	__esModule: true,
	default: () => ({
		fire: vi.fn()
	})
}))

describe('MorningEventsRow', () => {
	const updateBudgetProgramActivitiesCost = vi.fn()
	const updateMorningActivity = vi.fn()
	const mockEvent: IEvent = { ...starterEvent }

	const mockUseCurrentProject = {
		currentProject: { ...defaultProject },
		updateBudgetProgramActivitiesCost,
		updateMorningActivity
	}

	beforeEach(() => {
		vi.clearAllMocks()
		;(useCurrentProject as Mock).mockReturnValue(mockUseCurrentProject)
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('renders null if there are no items', () => {
		render(
			<table>
				<tbody>
					<MorningEventsRow
						items={[]}
						date="2022-01-01"
						pax={20}
						selectedEvent={{} as IEvent}
						setSelectedEvent={() => {}}
					/>
				</tbody>
			</table>
		)
		expect(screen.queryByTestId('optionSelect')).not.toBeInTheDocument()
	})

	it('renders a row when items are provided', () => {
		const eventWithPricePerPerson = {
			...mockEvent,
			name: 'Mock Event',
			_id: 'ev-001',
			pricePerPerson: true,
			participants: 5,
			price: 100
		}
		render(
			<table>
				<tbody>
					<MorningEventsRow
						items={[eventWithPricePerPerson]}
						date="Day 1"
						pax={20}
						selectedEvent={eventWithPricePerPerson}
						setSelectedEvent={() => {}}
					/>
				</tbody>
			</table>
		)
		// Verify that OptionSelect and EditableCell cells are rendered.
		expect(screen.getByTestId('optionSelect')).toBeInTheDocument()
		expect(screen.getByTestId('editableCell-unit')).toBeInTheDocument()
		expect(screen.getByTestId('editableCell-price')).toBeInTheDocument()
	})

	it('calls updateBudgetProgramActivitiesCost on mount with the correct payload', () => {
		const mockItems: IEvent[] = [
			{
				...mockEvent,
				_id: 'e1',
				name: 'Morning Run',
				price: 40,
				participants: 40
			}
		]

		render(
			<table>
				<tbody>
					<MorningEventsRow
						items={mockItems}
						date="Day 1"
						pax={20}
						selectedEvent={mockItems[0]}
						setSelectedEvent={() => {}}
					/>
				</tbody>
			</table>
		)

		expect(updateBudgetProgramActivitiesCost).toHaveBeenCalledWith({
			date: 'Day 1',
			activity: mockItems[0],
			pax: mockItems[0].participants,
			type: 'morning'
		})
	})

	it('updates selectedEvent when user selects a different option', () => {
		const mockItems: IEvent[] = [
			{
				...mockEvent,
				_id: 'e1',
				name: 'Morning Run',
				price: 40,
				participants: 40
			},
			{
				...mockEvent,
				_id: 'e2',
				name: 'Morning Swim',
				price: 20,
				participants: 20
			}
		]
		const mockSetSelectedEvent = vi.fn()

		render(
			<table>
				<tbody>
					<MorningEventsRow
						items={mockItems}
						date="Day 1"
						pax={20}
						selectedEvent={mockItems[0]}
						setSelectedEvent={mockSetSelectedEvent}
					/>
				</tbody>
			</table>
		)

		const selectElement = screen.getByTestId(
			'optionSelect'
		) as HTMLSelectElement
		fireEvent.change(selectElement, { target: { value: 'Morning Swim' } })
		expect(mockSetSelectedEvent).toHaveBeenCalledWith(mockItems[1])
	})

	it('calls updateMorningActivity on saving new unit or price value in EditableCell', () => {
		const mockItems = [
			{
				_id: 'act-1',
				name: 'Surf Lesson',
				price: 50,
				pricePerPerson: true,
				participants: 10
			}
		] as IEvent[]

		const mockSetSelectedEvent = vi.fn()

		const mockSchedule = [
			{
				morningEvents: {
					events: [{ _id: 'act-1', participants: 10, price: 50 }]
				}
			}
		]
		const newMockUseCurrentProject = {
			currentProject: { ...defaultProject, schedule: mockSchedule },
			updateBudgetProgramActivitiesCost,
			updateMorningActivity
		}
		;(useCurrentProject as Mock).mockReturnValue(newMockUseCurrentProject)

		render(
			<table>
				<tbody>
					<MorningEventsRow
						items={mockItems}
						date="Day 1"
						pax={20}
						selectedEvent={mockItems[0]}
						setSelectedEvent={mockSetSelectedEvent}
					/>
				</tbody>
			</table>
		)

		const unitCell = screen.getByTestId('editableCell-unit')
		const priceCell = screen.getByTestId('editableCell-price')

		fireEvent.click(unitCell)
		fireEvent.click(priceCell)

		expect(updateMorningActivity).toHaveBeenCalledTimes(2)
		expect(updateMorningActivity).toHaveBeenNthCalledWith(1, {
			value: 10,
			dayIndex: 0,
			id: 'act-1',
			key: 'participants'
		})
		expect(updateMorningActivity).toHaveBeenNthCalledWith(2, {
			value: 50,
			dayIndex: 0,
			id: 'act-1',
			key: 'price'
		})
	})
})
