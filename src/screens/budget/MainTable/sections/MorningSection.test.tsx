import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('../rows/itinerary/MorningEventsItineraryRow', () => ({
	MorningEventsItineraryRow: () => (
		<tr data-testid="morning-events-itinerary-row">
			<td>MorningEventsItineraryRow</td>
		</tr>
	)
}))

vi.mock('../rows/meals_activities', () => ({
	EventTransferRow: () => (
		<tr data-testid="event-transfer-row">
			<td>EventTransferRow</td>
		</tr>
	),
	MorningEventsRow: () => (
		<tr data-testid="morning-events-row">
			<td>MorningEventsRow</td>
		</tr>
	)
}))

vi.mock('./MeetingSection', () => ({
	MeetingSection: () => (
		<tr data-testid="meeting-section">
			<td>MeetingSection</td>
		</tr>
	)
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

import { MorningSection, MorningSectionProps } from './MorningSection'
import { useCurrentProject } from 'src/hooks'
import { IEvent, IMeeting } from '../../../../interfaces'
import {
	starterEvent,
	starterMeeting,
	starterTransfer
} from 'src/constants/starterObjects'

describe('MorningSection', () => {
	const renderInTableContext = (component: React.ReactElement) => {
		return render(
			<table>
				<tbody>{component}</tbody>
			</table>
		)
	}

	const mockUpdateBudgetProgramActivitiesCost = vi.fn()
	const mockEvent: IEvent = { ...starterEvent }
	const mockEventWithTransfer: IEvent = {
		...starterEvent,
		transfer: [{ ...starterTransfer }]
	}
	const mockMeeting: IMeeting = { ...starterMeeting }
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
		renderInTableContext(
			<MorningSection
				{...defaultProps}
				events={[mockEventWithTransfer]}
				eventsItinerary={[mockEvent]}
			/>
		)
		expect(
			screen.getByTestId('morning-events-itinerary-row')
		).toBeInTheDocument()
		expect(screen.getByTestId('event-transfer-row')).toBeInTheDocument()
		expect(screen.getByTestId('morning-events-row')).toBeInTheDocument()
	})

	it('calls updateBudgetProgramActivitiesCost if events array is empty', () => {
		renderInTableContext(<MorningSection {...defaultProps} events={[]} />)
		expect(mockUpdateBudgetProgramActivitiesCost).toHaveBeenNthCalledWith(1, {
			activity: null,
			date: '2025-10-05',
			pax: 50,
			type: 'morning'
		})
	})

	it('sets the selected event if only one event is present', () => {
		const { rerender } = renderInTableContext(
			<MorningSection {...defaultProps} events={[mockEvent]} />
		)
		rerender(<MorningSection {...defaultProps} events={[mockEvent]} />)
		expect(mockUpdateBudgetProgramActivitiesCost).not.toHaveBeenCalled()
	})

	it('renders MeetingSection if multiDestination is false and meetings are provided', () => {
		renderInTableContext(
			<MorningSection
				{...defaultProps}
				meetings={[mockMeeting]}
				multiDestination={false}
			/>
		)
		expect(screen.getByTestId('meeting-section')).toBeInTheDocument()
	})

	it('does not render MeetingSection if multiDestination is true', () => {
		renderInTableContext(
			<MorningSection
				{...defaultProps}
				meetings={[mockMeeting]}
				multiDestination={true}
			/>
		)
		expect(screen.queryByTestId('meeting-section')).not.toBeInTheDocument()
	})
})
