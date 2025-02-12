// PaymentMasterForm.test.tsx

import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
	type Mock
} from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { PaymentMasterForm } from './PaymentMasterForm'
import { usePayment } from '@screens/cash_flow/context/PaymentsProvider'
import { useAuth } from 'src/context/auth/AuthProvider'
import { usePaymentSubmitForm } from './helperPayment'

import {
	starterPayment,
	starterUser,
	starterVendorInvoice
} from 'src/constants/starterObjects'
import type { IPayment } from '@interfaces/payment'
import type { IUser } from '@interfaces/user'
import type { IVendorInvoice } from '@interfaces/vendorInvoice'

// 1. Mock the relevant hooks
vi.mock('@screens/cash_flow/context/PaymentsProvider', () => ({
	usePayment: vi.fn()
}))
vi.mock('src/context/auth/AuthProvider', () => ({
	useAuth: vi.fn()
}))
vi.mock('./helperPayment', () => ({
	usePaymentSubmitForm: vi.fn()
}))

describe('PaymentMasterForm', () => {
	// 2. Define mock functions and data
	const mockUsePayment = usePayment as Mock
	const mockUseAuth = useAuth as Mock
	const mockUsePaymentSubmitForm = usePaymentSubmitForm as Mock

	const mockSubmitFrom = vi.fn()

	const mockPayment: IPayment = { ...starterPayment, _id: 'p1', amount: 500 }
	const mockUser: IUser = { ...starterUser, role: 'admin' }
	const mockVendorInvoice: IVendorInvoice = {
		...starterVendorInvoice,
		_id: 'v1'
	}

	beforeEach(() => {
		// 3. Reset mocks before each test
		vi.clearAllMocks()

		// 4. Mock return values
		mockUsePayment.mockReturnValue({
			state: {
				payment: mockPayment,
				currentVendorInvoice: mockVendorInvoice,
				update: false
			},
			errors: {},
			setErrors: vi.fn(),
			validate: vi.fn().mockResolvedValue(true) // By default, validation passes
		})

		mockUseAuth.mockReturnValue({
			auth: mockUser
		})

		mockUsePaymentSubmitForm.mockReturnValue({
			submitFrom: mockSubmitFrom,
			isLoading: false
		})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	const renderComponent = () =>
		render(
			<MemoryRouter>
				<PaymentMasterForm />
			</MemoryRouter>
		)

	it('renders the form, and clicking "Submit" calls submitFrom with the correct data', async () => {
		const user = userEvent.setup()
		renderComponent()

		// 5. Find the "Submit" button
		const submitBtn = screen.getByRole('button', { name: /submit/i })
		expect(submitBtn).toBeInTheDocument() // Ensure the button exists

		// 6. Click the "Submit" button
		await user.click(submitBtn)

		// 7. Assert that submitFrom was called with correct arguments
		expect(mockSubmitFrom).toHaveBeenCalledWith(
			expect.objectContaining({
				_id: 'p1', // From mockPayment
				amount: 500, // From mockPayment
				vendorInvoiceId: 'v1' // From mockVendorInvoice
			}),
			[], // No PDFs uploaded
			'payments',
			false // update: false
		)
	})

	it('does not call submitFrom if validate() returns false', async () => {
		// 1. Override the mock to have validate() return false
		mockUsePayment.mockReturnValueOnce({
			state: {
				payment: { ...starterPayment, _id: 'p2', amount: 999 },
				currentVendorInvoice: { ...starterVendorInvoice, _id: 'v2' },
				update: true
			},
			errors: { amount: 'Required' },
			setErrors: vi.fn(),
			validate: vi.fn().mockResolvedValue(false) // Validation fails
		})

		const user = userEvent.setup()
		renderComponent()

		// 2. Find the "Edit & Exit" button since update: true
		const submitBtn = screen.getByRole('button', { name: /edit & exit/i })
		expect(submitBtn).toBeInTheDocument() // Ensure the button exists

		// 3. Click the "Edit & Exit" button
		await user.click(submitBtn)

		// 4. Assert that submitFrom was NOT called
		expect(mockSubmitFrom).not.toHaveBeenCalled()
	})
})
