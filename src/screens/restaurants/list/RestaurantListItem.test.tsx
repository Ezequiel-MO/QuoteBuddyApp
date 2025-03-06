import { type Mock } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { RestaurantListItem } from './RestaurantListItem'
import { useRestaurant } from '../context/RestaurantsContext'
import { useCurrentProject } from 'src/hooks'
import { useNavigate, useLocation, MemoryRouter } from 'react-router-dom'
import { IEvent, IRestaurant } from '../../../interfaces'
import * as helperModule from '../../../helper'
import { starterRestaurant } from '../../../constants/starterObjects'
import React from 'react'

// Mock all required components and hooks
vi.mock('../context/RestaurantsContext', () => ({
	useRestaurant: vi.fn()
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
	ButtonDeleteWithAuth: () => <div data-testid="delete-button">Delete</div> // Return a div, not a td
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

describe('RestaurantListItem', () => {
	const mockDispatch = vi.fn()
	const mockNavigate = vi.fn()
	const mockAddEventToSchedule = vi.fn()

	// Complete mock restaurant with all required properties
	const mockRestaurant: IRestaurant = {
		...starterRestaurant,
		name: 'Test Restaurant',
		city: 'Test City',
		price: 100,
		isVenue: true
	}

	beforeEach(() => {
		vi.clearAllMocks()

		// Mock helper functions
		vi.spyOn(helperModule, 'formatMoney').mockReturnValue('€100.00')
		vi.spyOn(helperModule, 'formatYearMonthDate').mockReturnValue('2023-01-01')
		vi.spyOn(helperModule, 'getTailwindClassesForDate').mockReturnValue(
			'current'
		)

		// Setup context mocks
		;(useRestaurant as Mock).mockReturnValue({
			state: { restaurants: [mockRestaurant] },
			dispatch: mockDispatch
		})
		;(useCurrentProject as Mock).mockReturnValue({
			addEventToSchedule: mockAddEventToSchedule
		})
		;(useNavigate as Mock).mockReturnValue(mockNavigate)
		;(useLocation as Mock).mockReturnValue({
			state: { dayOfEvent: '2023-01-01', timeOfEvent: 'morning' }
		})
	})

	// Helper function to render with all required providers
	const renderWithProviders = (ui: React.ReactElement) => {
		return render(<MemoryRouter>{ui}</MemoryRouter>)
	}

	it('renders restaurant details correctly', () => {
		renderWithProviders(
			<RestaurantListItem item={mockRestaurant} canBeAddedToProject={true} />
		)

		expect(screen.getByText('Test Restaurant')).toBeInTheDocument()
		expect(screen.getByText('Test City')).toBeInTheDocument()
		expect(screen.getByText('€100.00')).toBeInTheDocument()
		expect(screen.getByText('TRUE')).toBeInTheDocument()
	})

	it('navigates to restaurant specs on name click', () => {
		renderWithProviders(
			<RestaurantListItem item={mockRestaurant} canBeAddedToProject={false} />
		)

		fireEvent.click(screen.getByText('Test Restaurant'))

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'TOGGLE_UPDATE',
			payload: true
		})

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_RESTAURANT',
			payload: mockRestaurant
		})

		expect(mockNavigate).toHaveBeenCalledWith('/app/restaurant/specs')
	})

	it('adds restaurant to project on button click', () => {
		renderWithProviders(
			<RestaurantListItem item={mockRestaurant} canBeAddedToProject={true} />
		)

		const addButtonTd = screen.getByTestId('add-to-project-button')
		const button = addButtonTd.querySelector('button')
		if (!button) throw new Error('Button not found')
		fireEvent.click(button)

		expect(mockAddEventToSchedule).toHaveBeenCalledWith({
			event: mockRestaurant,
			dayOfEvent: '2023-01-01',
			timeOfEvent: 'morning'
		})

		expect(mockNavigate).toHaveBeenCalledWith('/app/project/schedule')
	})
})
