import React from 'react'
import { type Mock } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { ActivityListItem } from './ActivityListItem'
import { useActivity } from '../context/ActivitiesContext'
import { useCurrentProject } from 'src/hooks'
import { useNavigate, useLocation, MemoryRouter } from 'react-router-dom'
import { IEvent, IRestaurant } from '../../../interfaces'
import * as helperModule from '../../../helper'
import { starterEvent } from '../../../constants/starterObjects'

// Mock all required components and hooks
vi.mock('../context/ActivitiesContext', () => ({
	useActivity: vi.fn()
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn()
}))

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
	useLocation: vi.fn(),
	MemoryRouter: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	)
}))

// Mock components that use context
vi.mock('../../../components/atoms', () => ({
	AddToProjectButton: ({ onAddToProject }: { onAddToProject: () => void }) => (
		<td data-testid="add-to-project-button">
			<button onClick={onAddToProject}>Add to Project</button>
		</td>
	),
	AddToIteneraryButton: ({
		eventOrRestaurant
	}: {
		eventOrRestaurant: IEvent | IRestaurant
	}) => <td data-testid="add-to-itinerary-button">Add to Itinerary</td>,
	ButtonDeleteWithAuth: () => <div data-testid="delete-button">Delete</div>
}))

// Mock the transfer provider
vi.mock('../../projects/add/toProject/transfers/render/context', () => ({
	TransfersProvider: ({ children }: { children: React.ReactNode }) => (
		<table>
			<tbody>{children}</tbody>
		</table>
	)
}))

// Mock any auth-related hooks
vi.mock('src/context/auth/AuthProvider', () => ({
	useAuth: () => ({ auth: { role: 'admin' } })
}))

// Mock HOCs that might use context
vi.mock('src/HOC/WithRoleAuthorization', () => ({
	withRoleAuthorization:
		(Component: React.ComponentType<any>) => (props: any) =>
			<Component {...props} />
}))

describe('ActivityListItem', () => {
	const mockDispatch = vi.fn()
	const mockNavigate = vi.fn()
	const mockAddEventToSchedule = vi.fn()

	// Complete mock event with all required properties
	const mockEvent: IEvent = {
		...starterEvent,
		_id: 'event123',
		name: 'Test Activity',
		city: 'Test City',
		price: 150,
		pricePerPerson: true,
		regular: false,
		updatedAt: '2023-01-01T00:00:00.000Z'
	}

	beforeEach(() => {
		vi.clearAllMocks()

		// Mock helper functions
		vi.spyOn(helperModule, 'formatMoney').mockReturnValue('€150.00')
		vi.spyOn(helperModule, 'formatYearMonthDate').mockReturnValue('2023-01-01')
		vi.spyOn(helperModule, 'getTailwindClassesForDate').mockReturnValue(
			'current'
		)

		// Setup context mocks
		;(useActivity as Mock).mockReturnValue({
			state: { activities: [mockEvent] },
			dispatch: mockDispatch
		})
		;(useCurrentProject as Mock).mockReturnValue({
			addEventToSchedule: mockAddEventToSchedule
		})
		;(useNavigate as Mock).mockReturnValue(mockNavigate)
		;(useLocation as Mock).mockReturnValue({
			state: { dayOfEvent: '2023-01-01', timeOfEvent: 'afternoon' }
		})
	})

	// Helper function to render with all required providers
	const renderWithProviders = (ui: React.ReactElement) => {
		return render(<MemoryRouter>{ui}</MemoryRouter>)
	}

	it('renders activity details correctly', () => {
		renderWithProviders(
			<ActivityListItem item={mockEvent} canBeAddedToProject={true} />
		)

		expect(screen.getByText('Test Activity')).toBeInTheDocument()
		expect(screen.getByText('Test City')).toBeInTheDocument()
		expect(screen.getByText('€150.00')).toBeInTheDocument()
		expect(screen.getByText('TRUE')).toBeInTheDocument() // pricePerPerson
		expect(screen.getByText('FALSE')).toBeInTheDocument() // regular
	})

	it('navigates to activity specs on name click', () => {
		renderWithProviders(
			<ActivityListItem item={mockEvent} canBeAddedToProject={false} />
		)

		fireEvent.click(screen.getByText('Test Activity'))

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'TOGGLE_UPDATE',
			payload: true
		})

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_ACTIVITY',
			payload: mockEvent
		})

		expect(mockNavigate).toHaveBeenCalledWith('/app/activity/specs')
	})

	it('adds activity to project on button click', () => {
		renderWithProviders(
			<ActivityListItem item={mockEvent} canBeAddedToProject={true} />
		)

		const addButtonTd = screen.getByTestId('add-to-project-button')
		const button = addButtonTd.querySelector('button')
		if (!button) throw new Error('Button not found')
		fireEvent.click(button)

		expect(mockAddEventToSchedule).toHaveBeenCalledWith({
			event: mockEvent,
			dayOfEvent: '2023-01-01',
			timeOfEvent: 'afternoon'
		})

		expect(mockNavigate).toHaveBeenCalledWith('/app/project/schedule')
	})

	it('conditionally renders AddToProjectButton based on prop', () => {
		// Render with canBeAddedToProject=false
		const { rerender } = renderWithProviders(
			<ActivityListItem item={mockEvent} canBeAddedToProject={false} />
		)

		// Button should not be in the document
		expect(
			screen.queryByTestId('add-to-project-button')
		).not.toBeInTheDocument()

		// Rerender with canBeAddedToProject=true
		rerender(<ActivityListItem item={mockEvent} canBeAddedToProject={true} />)

		// Button should now be in the document
		expect(screen.getByTestId('add-to-project-button')).toBeInTheDocument()
	})

	it('sets price style based on date status', () => {
		// Test overdue
		vi.spyOn(helperModule, 'getTailwindClassesForDate').mockReturnValue(
			'overdue'
		)

		renderWithProviders(
			<ActivityListItem item={mockEvent} canBeAddedToProject={false} />
		)

		// Verify that the price style class is applied
		const formattedDate = screen.getByText('2023-01-01')
		expect(formattedDate).toHaveClass('text-red-500')

		// Clean up
		vi.mocked(helperModule.getTailwindClassesForDate).mockRestore()
	})
})
