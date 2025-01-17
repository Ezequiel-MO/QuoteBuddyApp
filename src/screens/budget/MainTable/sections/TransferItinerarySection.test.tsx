// TransferItinerarySection.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TransferItinerarySection } from './TransferItinerarySection'
import { ITransfer } from '../../../../interfaces'

// Import your starter objects
import { starterTransfer } from 'src/constants/starterObjects'

// Mock child components
vi.mock('../rows/itinerary/AssistanceItineraryRow', () => ({
	AssistanceItineraryRow: ({
		date,
		description,
		starts,
		ends
	}: {
		date: string
		description: string
		starts: string
		ends: string
	}) => (
		<tr data-testid="AssistanceItineraryRow">
			<td>{description}</td>
			<td>{date}</td>
			<td>{starts}</td>
			<td>{ends}</td>
		</tr>
	)
}))

vi.mock('../rows/itinerary/TransferItineraryRow', () => ({
	TransferItineraryRow: ({
		options,
		date,
		starts,
		ends
	}: {
		options: ITransfer[]
		date: string
		starts: string
		ends: string
	}) => (
		<tr data-testid="TransferItineraryRow">
			<td>{options.length} Transfers</td>
			<td>{date}</td>
			<td>{starts}</td>
			<td>{ends}</td>
		</tr>
	)
}))

describe('TransferItinerarySection', () => {
	// Utility function to render within a table structure if the real component is expected
	// to produce <tr> elements. If your actual code uses <div> elements, adjust accordingly.
	const renderComponent = ({
		date = '2025-01-01',
		transfers,
		type = '',
		starts = '',
		ends = ''
	}: {
		date?: string
		transfers?: ITransfer[]
		type?: 'morning' | 'afternoon' | 'night' | ''
		starts?: 'morning' | 'afternoon' | 'night' | ''
		ends?: 'morning' | 'afternoon' | 'night' | ''
	}) => {
		return render(
			<table>
				<tbody>
					<TransferItinerarySection
						date={date}
						transfers={transfers}
						type={type}
						starts={starts}
						ends={ends}
					/>
				</tbody>
			</table>
		)
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('renders nothing if transfers is undefined (falsy)', () => {
		// Pass undefined for "transfers" -> component returns immediately
		renderComponent({ transfers: undefined })

		expect(
			screen.queryByTestId('AssistanceItineraryRow')
		).not.toBeInTheDocument()
		expect(screen.queryByTestId('TransferItineraryRow')).not.toBeInTheDocument()
	})

	it('renders TransferItineraryRow if transfers is a valid array, even if assistance=0', () => {
		// Clone starterTransfer but set assistance=0
		const noAssistanceTransfer: ITransfer = {
			...starterTransfer,
			_id: 'no-assist-1',
			assistance: 0
		}

		renderComponent({
			transfers: [noAssistanceTransfer],
			date: '2025-05-10',
			starts: 'morning',
			ends: 'night'
		})

		// Should always render TransferItineraryRow with non-empty array
		expect(screen.getByTestId('TransferItineraryRow')).toBeInTheDocument()

		// AssistanceItineraryRow should NOT render if assistance=0
		expect(
			screen.queryByTestId('AssistanceItineraryRow')
		).not.toBeInTheDocument()
	})

	it('renders AssistanceItineraryRow if the first transfer has assistance != 0', () => {
		// Use the starterTransfer which has assistance=2 by default
		const myTransfers: ITransfer[] = [
			{ ...starterTransfer }, // assistance=2
			{ ...starterTransfer, _id: 't2', assistance: 0 }
		]

		renderComponent({
			transfers: myTransfers,
			date: '2025-10-20',
			starts: 'morning',
			ends: 'afternoon'
		})

		// Expect both rows now
		expect(screen.getByTestId('AssistanceItineraryRow')).toBeInTheDocument()
		expect(screen.getByTestId('TransferItineraryRow')).toBeInTheDocument()
	})

	it('passes correct props down to child components', () => {
		// Just verify it passes the date, starts, ends, etc.
		const customTransfers: ITransfer[] = [
			{ ...starterTransfer, _id: 'custom-1' }
		]

		renderComponent({
			date: '2026-02-15',
			transfers: customTransfers,
			starts: 'night',
			ends: 'morning'
		})

		// Assistance row (since starterTransfer has assistance=2)
		const assistanceRow = screen.getByTestId('AssistanceItineraryRow')
		expect(assistanceRow).toHaveTextContent('En Route Assistance') // or check your prop usage
		expect(assistanceRow).toHaveTextContent('2026-02-15')
		expect(assistanceRow).toHaveTextContent('night')
		expect(assistanceRow).toHaveTextContent('morning')

		// Transfer row
		const transferRow = screen.getByTestId('TransferItineraryRow')
		expect(transferRow).toHaveTextContent('2026-02-15')
		expect(transferRow).toHaveTextContent('night')
		expect(transferRow).toHaveTextContent('morning')
		// also check that it displays "1 Transfers" or the correct length
		expect(transferRow).toHaveTextContent('1 Transfers')
	})
})
