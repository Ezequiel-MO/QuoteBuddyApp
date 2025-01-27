import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('../rows/itinerary/MorningEventsItineraryRow', () => ({
	MorningEventsItineraryRow: () => (
		<div data-testid="morning-events-itinerary-row">
			MorningEventsItineraryRow
		</div>
	)
}))

vi.mock('../rows/meals_activities', () => ({
	EventTransferRow: () => (
		<div data-testid="event-transfer-row">EventTransferRow</div>
	),
	MorningEventsRow: () => (
		<div data-testid="morning-events-row">MorningEventsRow</div>
	)
}))

vi.mock('./MeetingSection', () => ({
	MeetingSection: () => <div data-testid="meeting-section">MeetingSection</div>
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

import { MorningSection, MorningSectionProps } from './MorningSection'
import { useCurrentProject } from 'src/hooks'
import { IEvent } from '../../../../interfaces'
import { starterEvent } from 'src/constants/starterObjects'

describe('MorningSection', () => {
	const mockUpdateBudgetProgramActivitiesCost = vi.fn()
	const mockEvent: IEvent = { ...starterEvent }
	const defaultProps: MorningSectionProps = {
		events: [],
		eventsItinerary: [],
		meetings: [],
		date: '2025-10-05',
		pax: 50,
		multiDestination: false
	}
	beforeEach(() => {
		vi.clearAllMocks()
		;(useCurrentProject as Mock).mockReturnValue({
			updateBudgetProgramActivitiesCost: mockUpdateBudgetProgramActivitiesCost
		})
	})
	it('renders child components (MorningEventsItineraryRow, EventTransferRow, MorningEventsRow)', () => {
		render(<MorningSection {...defaultProps} />)
		expect(
			screen.getByTestId('morning-events-itinerary-row')
		).toBeInTheDocument()
		expect(screen.getByTestId('event-transfer-row')).toBeInTheDocument()
		expect(screen.getByTestId('morning-events-row')).toBeInTheDocument()
	})

	it('calls updateBudgetProgramActivitiesCost if events array is empty', () => {
		render(<MorningSection {...defaultProps} events={[]} />)

		expect(mockUpdateBudgetProgramActivitiesCost).toHaveBeenNthCalledWith(1, {
			activity: null,
			date: '2025-10-05',
			pax: 50,
			type: 'morning'
		})
	})

	it('sets the selected event if only one event is present', () => {
		const { rerender } = render(
			<MorningSection {...defaultProps} events={[mockEvent]} />
		)

		rerender(<MorningSection {...defaultProps} events={[mockEvent]} />)

		expect(mockUpdateBudgetProgramActivitiesCost).not.toHaveBeenCalled()
	})

	it('renders MeetingSection if multiDestination is false', () => {
		render(<MorningSection {...defaultProps} multiDestination={false} />)
		expect(screen.getByTestId('meeting-section')).toBeInTheDocument()
	})

	it('does not render MeetingSection if multiDestination is true', () => {
		render(<MorningSection {...defaultProps} multiDestination={true} />)
		expect(screen.queryByTestId('meeting-section')).not.toBeInTheDocument()
	})
})
