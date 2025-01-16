import {
	describe,
	it,
	beforeEach,
	afterEach,
	expect,
	vi,
	type Mock
} from 'vitest'
import { getKeyHotelPrice } from '@screens/budget/helpers'
import { useCurrentProject } from 'src/hooks'
import { useGetProject } from 'src/hooks/useGetProject'
import { IHotel, IHotelPrice } from '@interfaces/hotel'
import { starterHotel } from 'src/constants/starterObjects'
import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'
import { IProject } from '@interfaces/project'
import { HotelBreakdownRow } from './HotelBreakdownRow'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

vi.mock('./EditableCell', () => ({
	default: ({
		value,
		originalValue,
		typeValue,
		onSave
	}: {
		value: number
		originalValue: number
		typeValue: string
		onSave: (newValue: number) => void
	}) => (
		<input
			data-testid="EditableCell"
			value={value}
			onChange={(e) => onSave(Number(e.target.value))}
		/>
	)
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

vi.mock('src/hooks/useGetProject', () => ({
	useGetProject: vi.fn()
}))

vi.mock('../../../helpers', () => ({
	getKeyHotelPrice: vi.fn()
}))

const mockUseCurrentProject = useCurrentProject as Mock
const mockUseGetProject = useGetProject as Mock
const mockGetKeyHotelPrice = getKeyHotelPrice as Mock

describe('HotelBreakdownRow', () => {
	const mockUpdateHotelPrice = vi.fn()

	const mockHotel: IHotel = {
		...starterHotel,
		_id: 'hotel-1',
		name: 'Hotel One',
		price: [
			{
				DUInr: 2,
				DUIprice: 100,
				DoubleRoomNr: 1,
				DoubleRoomPrice: 150,
				breakfast: 10,
				DailyTax: 20
			}
		]
	}

	const mockProject: IProject = {
		...defaultProject,
		code: 'project-1',
		hotels: [mockHotel]
	}

	const mockSelectedHotelPrice: IHotelPrice = mockHotel.price[0]

	beforeEach(() => {
		vi.clearAllMocks()

		mockUseCurrentProject.mockReturnValue({
			currentProject: mockProject,
			budget: { selectedHotel: mockHotel },
			updateHotelPrice: mockUpdateHotelPrice
		})

		mockUseGetProject.mockReturnValue({
			project: [mockProject]
		})

		mockGetKeyHotelPrice.mockImplementation(
			(title: string, field: 'units' | 'price') => {
				const map: Record<
					string,
					Record<'units' | 'price', keyof IHotelPrice>
				> = {
					'Double Room Single Use': { units: 'DUInr', price: 'DUIprice' },
					'Double Room // Twin Room': {
						units: 'DoubleRoomNr',
						price: 'DoubleRoomPrice'
					},
					Breakfast: { units: 'breakfast', price: 'breakfast' },
					'City Tax': { units: 'DailyTax', price: 'DailyTax' }
				}
				return map[title]?.[field]
			}
		)
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	const renderComponent = (props = {}) =>
		render(
			<table>
				<tbody>
					<HotelBreakdownRow
						units={mockSelectedHotelPrice.DUInr}
						rate={mockSelectedHotelPrice.DUIprice}
						nights={2}
						title="Double Room Single Use"
						{...props}
					/>
				</tbody>
			</table>
		)

	it('renders correctly with editable title', () => {
		renderComponent()

		expect(screen.getByText('Double Room Single Use')).toBeInTheDocument()
		expect(screen.getAllByTestId('EditableCell')).toHaveLength(2)
		expect(screen.getByText('€400.00')).toBeInTheDocument()
	})

	it('renders correctly with non-editable title', () => {
		render(
			<table>
				<tbody>
					<HotelBreakdownRow
						units={mockSelectedHotelPrice.DailyTax}
						rate={mockSelectedHotelPrice.DailyTax}
						nights={3}
						title="City Tax"
					/>
				</tbody>
			</table>
		)

		expect(screen.getByText('City Tax')).toBeInTheDocument()
		expect(screen.queryAllByTestId('EditableCell')).toHaveLength(1)
		expect(screen.getByText('€240.00')).toBeInTheDocument()
	})

	it('calls updateHotelPrice on units save for editable title', () => {
		renderComponent()

		const editableUnits = screen.getAllByTestId('EditableCell')[0]
		fireEvent.change(editableUnits, { target: { value: '3' } })

		expect(mockUpdateHotelPrice).toHaveBeenCalledWith({
			idHotel: mockHotel._id,
			keyHotelPrice: 'DUInr',
			value: 3
		})
	})

	it('calls updateHotelPrice on price save for editable title', () => {
		renderComponent()

		const editablePrice = screen.getAllByTestId('EditableCell')[1]
		fireEvent.change(editablePrice, { target: { value: '120' } })

		expect(mockUpdateHotelPrice).toHaveBeenCalledWith({
			idHotel: mockHotel._id,
			keyHotelPrice: 'DUIprice',
			value: 120
		})
	})

	it('does not call updateHotelPrice if selectedHotel._id is missing', () => {
		mockUseCurrentProject.mockReturnValue({
			currentProject: mockProject,
			budget: {
				selectedHotel: { ...mockHotel, _id: undefined }
			},
			updateHotelPrice: mockUpdateHotelPrice
		})

		renderComponent()

		const editableUnits = screen.getAllByTestId('EditableCell')[0]
		fireEvent.change(editableUnits, { target: { value: '3' } })

		expect(mockUpdateHotelPrice).not.toHaveBeenCalled()
	})

	it('calculates totalPrice correctly', () => {
		renderComponent()

		// totalPrice = units * rate * nights = 2 * 100 * 2 = 400
		expect(screen.getByText('€400.00')).toBeInTheDocument()
	})

	it('handles different titles correctly in handleSave', () => {
		render(
			<table>
				<tbody>
					<HotelBreakdownRow
						units={1}
						rate={50}
						nights={1}
						title="Double Room // Twin Room"
					/>
				</tbody>
			</table>
		)

		const editableUnits = screen.getAllByTestId('EditableCell')[0]
		fireEvent.change(editableUnits, { target: { value: '2' } })

		expect(mockUpdateHotelPrice).toHaveBeenCalledWith({
			idHotel: mockHotel._id,
			keyHotelPrice: 'DoubleRoomNr',
			value: 2
		})

		const editablePrice = screen.getAllByTestId('EditableCell')[1]
		fireEvent.change(editablePrice, { target: { value: '160' } })

		expect(mockUpdateHotelPrice).toHaveBeenCalledWith({
			idHotel: mockHotel._id,
			keyHotelPrice: 'DoubleRoomPrice',
			value: 160
		})
	})

	it('renders correctly for Breakfast title', () => {
		render(
			<table>
				<tbody>
					<HotelBreakdownRow
						units={mockSelectedHotelPrice.breakfast}
						rate={mockSelectedHotelPrice.breakfast}
						nights={4}
						title="Breakfast"
					/>
				</tbody>
			</table>
		)

		expect(screen.getByText('Breakfast')).toBeInTheDocument()
		expect(screen.queryAllByTestId('EditableCell')).toHaveLength(1)
		expect(screen.getByText('€160.00')).toBeInTheDocument()
	})

	it('handles useEffect to find the original hotel', async () => {
		renderComponent()

		await waitFor(() => {
			expect(mockUseGetProject).toHaveBeenCalledWith(mockProject.code)
			expect(mockUseCurrentProject).toHaveBeenCalled()
		})
	})

	it('renders nothing if selectedHotel is undefined', () => {
		// Override the mock to set selectedHotel as undefined
		mockUseCurrentProject.mockReturnValue({
			currentProject: mockProject,
			budget: {
				selectedHotel: undefined
			},
			updateHotelPrice: mockUpdateHotelPrice
		})

		const { container } = render(
			<table>
				<tbody>
					<HotelBreakdownRow
						units={2}
						rate={100}
						nights={2}
						title="Double Room Single Use"
					/>
				</tbody>
			</table>
		)

		expect(container.querySelector('tr')).toBeNull()
	})
})
