// HotelRows.test.tsx
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { IHotel } from '@interfaces/hotel'
import { starterHotel } from '@constants/starterObjects'

// Use vi.hoisted to define mocks
const mocks = vi.hoisted(() => ({
	mockSetBudgetSelectedHotel: vi.fn(),
	mockUseCurrentProject: vi.fn(() => ({
		currentProject: { hotels: [] as IHotel[] },
		setBudgetSelectedHotel: vi.fn()
	}))
}))

// Mock dependencies that render inside a table context.
// We change the mock components so they output <tr> elements instead of <div>
vi.mock('./EditableCell', () => ({
	EditableCell: ({ children }: { children: React.ReactNode }) => (
		<tr>
			<td>{children}</td>
		</tr>
	)
}))

vi.mock('./HotelBreakdownRows', () => ({
	HotelBreakdownRows: ({ isOpen }: { isOpen: boolean }) => (
		<tr data-testid="mock-HotelBreakdownRows">
			<td>HotelBreakdownRows isOpen={String(isOpen)}</td>
		</tr>
	)
}))

vi.mock('./HotelSummaryRow', () => ({
	HotelSummaryRow: ({ isOpen }: { isOpen: boolean }) => (
		<tr data-testid="mock-HotelSummaryRow">
			<td>HotelSummaryRow isOpen={String(isOpen)}</td>
		</tr>
	)
}))

// Mock hooks after their dependencies are mocked
vi.mock('src/hooks', () => ({
	useCurrentProject: mocks.mockUseCurrentProject
}))

// Import HotelRows after all mocks
import { HotelRows } from './HotelRows'

describe('HotelRows', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mocks.mockUseCurrentProject.mockReturnValue({
			currentProject: { hotels: [] },
			setBudgetSelectedHotel: mocks.mockSetBudgetSelectedHotel
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('renders nothing if hotels.length = 0', () => {
		render(
			<table>
				<tbody>
					<HotelRows />
				</tbody>
			</table>
		)

		expect(screen.queryByTestId('mock-HotelSummaryRow')).toBeNull()
		expect(screen.queryByTestId('mock-HotelBreakdownRows')).toBeNull()
		expect(mocks.mockSetBudgetSelectedHotel).not.toHaveBeenCalled()
	})

	it('calls setBudgetSelectedHotel if hotels.length > 0', () => {
		const mockHotel1: IHotel = { ...starterHotel, _id: 'h1' }
		const mockHotel2: IHotel = { ...starterHotel, _id: 'h2' }
		mocks.mockUseCurrentProject.mockReturnValue({
			currentProject: { hotels: [mockHotel1, mockHotel2] },
			setBudgetSelectedHotel: mocks.mockSetBudgetSelectedHotel
		})

		render(
			<table>
				<tbody>
					<HotelRows />
				</tbody>
			</table>
		)

		expect(screen.getByTestId('mock-HotelSummaryRow')).toBeInTheDocument()
		expect(screen.getByTestId('mock-HotelBreakdownRows')).toBeInTheDocument()
		expect(mocks.mockSetBudgetSelectedHotel).toHaveBeenCalledTimes(1)
		expect(mocks.mockSetBudgetSelectedHotel).toHaveBeenCalledWith(mockHotel1)
	})

	it('calls setBudgetSelectedHotel if exactly 1 hotel', () => {
		const singleHotel: IHotel = { ...starterHotel, _id: 'unique' }
		mocks.mockUseCurrentProject.mockReturnValue({
			currentProject: { hotels: [singleHotel] },
			setBudgetSelectedHotel: mocks.mockSetBudgetSelectedHotel
		})

		render(
			<table>
				<tbody>
					<HotelRows />
				</tbody>
			</table>
		)

		expect(screen.getByTestId('mock-HotelSummaryRow')).toBeInTheDocument()
		expect(screen.getByTestId('mock-HotelBreakdownRows')).toBeInTheDocument()
		expect(mocks.mockSetBudgetSelectedHotel).toHaveBeenCalledTimes(1)
		expect(mocks.mockSetBudgetSelectedHotel).toHaveBeenCalledWith(singleHotel)
	})
})
