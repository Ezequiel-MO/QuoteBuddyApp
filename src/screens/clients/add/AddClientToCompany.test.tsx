import { vi, describe, beforeEach, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AddClientToCompany } from './AddClientToCompany'
import { toast } from 'react-toastify'
import {
	starterClient,
	starterCompany
} from '../../../constants/starterObjects'

// Mock dependencies
vi.mock('react-toastify', () => ({
	toast: {
		error: vi.fn().mockReturnValue('mock-toast-id'),
		success: vi.fn().mockReturnValue('mock-toast-id')
	}
}))

// Create mock functions for the services
const mockCreateClient = vi.fn()
const mockAddEmployeeToCompany = vi.fn()

// Mock services
vi.mock('../../../services/clientService', () => ({
	createClient: (...args: any[]) => mockCreateClient(...args),
	addEmployeeToCompany: (...args: any[]) => mockAddEmployeeToCompany(...args)
}))

// Mock hook for checking client existence
const mockCheckIfExists = vi.fn()
vi.mock('../../invoices/details/useCheckClientExists', () => ({
	useCheckClientExists: () => ({
		checkIfExists: mockCheckIfExists,
		isChecking: false
	})
}))

// Mock hook for getting company by name
const mockGetCompanyByName = vi.fn()
vi.mock('../hooks/useGetCompanyByName', async () => {
	return {
		useGetCompanyByName: (name: string) => mockGetCompanyByName(name)
	}
})

// Mock ClientMasterForm component
vi.mock('../specs/ClientMasterForm', () => ({
	default: ({
		handleAddClient
	}: {
		handleAddClient: (values: any) => void
	}) => (
		<div data-testid="client-form">
			<button
				data-testid="submit-button"
				onClick={() =>
					handleAddClient({
						firstName: 'John',
						familyName: 'Doe',
						email: 'john@example.com'
					})
				}
			>
				Save Client
			</button>
		</div>
	)
}))

// Mock Spinner component
vi.mock('../../../components/atoms', () => ({
	Spinner: () => <div data-testid="spinner">Loading...</div>
}))

describe('AddClientToCompany', () => {
	// Mock data
	const mockSetOpen = vi.fn()
	const mockClient = {
		...starterClient
	}

	// Mock company with string IDs (unpopulated)
	const mockCompanyUnpopulated = {
		...starterCompany,
		_id: 'company123',
		name: 'Acme Inc',
		country: 'USA',
		employees: ['emp1', 'emp2']
	}

	// Mock company with object references (populated)
	const mockCompanyPopulated = {
		...starterCompany,
		_id: 'company123',
		name: 'Acme Inc',
		country: 'USA',
		employees: [
			{ _id: 'emp1', firstName: 'Employee', familyName: 'One' },
			{ _id: 'emp2', firstName: 'Employee', familyName: 'Two' }
		]
	}

	beforeEach(() => {
		vi.clearAllMocks()

		// Set up default mock implementations
		mockCheckIfExists.mockResolvedValue(false)
		mockGetCompanyByName.mockReturnValue({
			company: mockCompanyUnpopulated,
			isLoading: false
		})
		mockCreateClient.mockResolvedValue(mockClient)
		mockAddEmployeeToCompany.mockResolvedValue({})
	})

	it('renders the component with company name in title', () => {
		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		expect(screen.getByText('Add Client to Acme Inc')).toBeInTheDocument()
		expect(screen.getByTestId('client-form')).toBeInTheDocument()
	})

	it('shows loading spinner when company data is loading', () => {
		mockGetCompanyByName.mockReturnValue({
			company: null,
			isLoading: true
		})

		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		expect(screen.getByTestId('spinner')).toBeInTheDocument()
		expect(screen.queryByTestId('client-form')).not.toBeInTheDocument()
	})

	it('shows loading spinner during form submission', async () => {
		// Create a delayed promise to simulate loading
		mockCreateClient.mockImplementation(
			() => new Promise((resolve) => setTimeout(() => resolve(mockClient), 100))
		)

		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Should show spinner
		expect(screen.getByTestId('spinner')).toBeInTheDocument()

		// Wait for async operation to complete
		await waitFor(() => {
			expect(mockSetOpen).toHaveBeenCalled()
		})
	})

	it('successfully adds a client when form is submitted with unpopulated company data', async () => {
		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Wait for async operations to complete
		await waitFor(() => {
			// Verify client existence was checked
			expect(mockCheckIfExists).toHaveBeenCalledWith('john@example.com')

			// Verify client was created with correct data
			expect(mockCreateClient).toHaveBeenCalledWith({
				firstName: 'John',
				familyName: 'Doe',
				email: 'john@example.com',
				clientCompany: 'Acme Inc'
			})

			// Verify company was updated with new client ID
			expect(mockAddEmployeeToCompany).toHaveBeenCalledWith('company123', {
				country: 'USA',
				name: 'Acme Inc',
				employees: ['emp1', 'emp2', 'client123']
			})

			// Verify success was shown
			expect(toast.success).toHaveBeenCalledWith(
				'Client added successfully!',
				expect.anything()
			)

			// Verify modal was closed
			expect(mockSetOpen).toHaveBeenCalled()
		})
	})

	it('successfully adds a client when form is submitted with populated company data', async () => {
		// Use populated company data
		mockGetCompanyByName.mockReturnValue({
			company: mockCompanyPopulated,
			isLoading: false
		})

		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Wait for async operations to complete
		await waitFor(() => {
			// Verify employee IDs were extracted correctly from populated data
			expect(mockAddEmployeeToCompany).toHaveBeenCalledWith('company123', {
				country: 'USA',
				name: 'Acme Inc',
				employees: ['emp1', 'emp2', 'client123']
			})
		})
	})

	it('shows error when no company name is provided', async () => {
		render(<AddClientToCompany selectedCompanyName="" setOpen={mockSetOpen} />)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Verify error was shown
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				'Company name is required',
				expect.anything()
			)

			// Verify service functions were not called
			expect(mockCreateClient).not.toHaveBeenCalled()
			expect(mockAddEmployeeToCompany).not.toHaveBeenCalled()

			// Verify modal was not closed
			expect(mockSetOpen).not.toHaveBeenCalled()
		})
	})

	it('shows error when company is not found', async () => {
		// Set company to null to simulate not found
		mockGetCompanyByName.mockReturnValue({
			company: null,
			isLoading: false
		})

		render(
			<AddClientToCompany
				selectedCompanyName="Nonexistent Company"
				setOpen={mockSetOpen}
			/>
		)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Verify error was shown
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				'Company "Nonexistent Company" not found',
				expect.anything()
			)

			// Verify service functions were not called
			expect(mockCreateClient).not.toHaveBeenCalled()
			expect(mockAddEmployeeToCompany).not.toHaveBeenCalled()
		})
	})

	it('shows error when client already exists', async () => {
		// Make checkIfExists return true to simulate client already exists
		mockCheckIfExists.mockResolvedValue(true)

		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Verify error was shown
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				expect.stringContaining('This client already exists'),
				expect.anything()
			)

			// Verify createClient was not called
			expect(mockCreateClient).not.toHaveBeenCalled()

			// Verify modal was not closed
			expect(mockSetOpen).not.toHaveBeenCalled()
		})
	})

	it('handles error during client creation', async () => {
		// Mock client creation failure
		const errorMessage = 'API error during client creation'
		mockCreateClient.mockRejectedValue(new Error(errorMessage))

		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Verify error was shown
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(errorMessage, expect.anything())

			// Verify company was not updated
			expect(mockAddEmployeeToCompany).not.toHaveBeenCalled()

			// Verify modal was not closed
			expect(mockSetOpen).not.toHaveBeenCalled()
		})
	})

	it('handles error during company update', async () => {
		// Mock company update failure
		const errorMessage = 'API error during company update'
		mockAddEmployeeToCompany.mockRejectedValue(new Error(errorMessage))

		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Verify error was shown
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(errorMessage, expect.anything())

			// Verify client was created
			expect(mockCreateClient).toHaveBeenCalled()

			// Verify modal was not closed
			expect(mockSetOpen).not.toHaveBeenCalled()
		})
	})

	it('properly filters undefined values from employee IDs', async () => {
		// Mock company with some undefined values in employees
		const companyWithUndefined = {
			_id: 'company123',
			name: 'Acme Inc',
			country: 'USA',
			employees: [
				{ _id: 'emp1', firstName: 'Employee', familyName: 'One' },
				{ _id: undefined, firstName: 'Employee', familyName: 'Incomplete' }, // Employee with undefined ID
				{ _id: 'emp2', firstName: 'Employee', familyName: 'Two' }
			]
		}

		mockGetCompanyByName.mockReturnValue({
			company: companyWithUndefined,
			isLoading: false
		})

		render(
			<AddClientToCompany
				selectedCompanyName="Acme Inc"
				setOpen={mockSetOpen}
			/>
		)

		// Submit the form
		fireEvent.click(screen.getByTestId('submit-button'))

		// Wait for async operations to complete
		await waitFor(() => {
			// Verify undefined employee ID was filtered out
			expect(mockAddEmployeeToCompany).toHaveBeenCalledWith('company123', {
				country: 'USA',
				name: 'Acme Inc',
				employees: ['emp1', 'emp2', 'client123']
			})
		})
	})
})
