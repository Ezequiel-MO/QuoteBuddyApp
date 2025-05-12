// PaymentFormFields.test.tsx
import { usePayment } from '@screens/cash_flow/context/PaymentsProvider'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { starterPayment } from '@constants/starterObjects'
import { useAuth } from 'src/context/auth/AuthProvider'
import { beforeEach, vi, type Mock } from 'vitest'
import { PaymentFormFields } from './PaymentFormFields'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../context/PaymentsProvider')
vi.mock('src/context/auth/AuthProvider')

const mockUsePayment = usePayment as Mock
const mockUseAuth = useAuth as Mock

describe('PaymentFormFields', () => {
	const user = userEvent.setup()

	beforeEach(() => {
		vi.clearAllMocks()
		mockUsePayment.mockReturnValue({
			state: {
				payment: { ...starterPayment },
				update: false
			},
			handleChange: vi.fn(),
			handleBlurPayment: vi.fn(),
			errorsPayment: {}
		})
		mockUseAuth.mockReturnValue({
			auth: { role: 'admin' }
		})
	})

	const renderComponent = () =>
		render(
			<MemoryRouter>
				<PaymentFormFields />
			</MemoryRouter>
		)

	it('renders all form fields with correct labels and values', () => {
		renderComponent()

		// Handle CSS uppercase transformation in queries
		expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/payment date/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/method/i)).toBeInTheDocument()

		// Verify select input
		const statusLabel = screen.getByText(/status/i, { selector: 'label' })
		const statusSelect = statusLabel.nextElementSibling as HTMLSelectElement
		expect(statusSelect).toBeInTheDocument()
	})

	it('displays correct status options for admin users', () => {
		renderComponent()

		const statusLabel = screen.getByText(/status/i, { selector: 'label' })
		const statusSelect = statusLabel.nextElementSibling as HTMLSelectElement
		const options = within(statusSelect).getAllByRole('option')

		expect(options).toHaveLength(4)
		expect(statusSelect).toHaveTextContent(/completed/i)
		expect(statusSelect).toHaveTextContent(/pending/i)
		expect(statusSelect).toHaveTextContent(/failed/i)
	})

	it('displays only Pending option for non-admin users', () => {
		mockUseAuth.mockReturnValueOnce({ auth: { role: 'user' } })
		renderComponent()

		const statusLabel = screen.getByText(/status/i, { selector: 'label' })
		const statusSelect = statusLabel.nextElementSibling as HTMLSelectElement
		const options = within(statusSelect).getAllByRole('option')

		expect(options).toHaveLength(2)
		expect(statusSelect).toHaveTextContent(/pending/i)
		expect(statusSelect).not.toHaveTextContent(/completed/i)
	})

	it('disables status select when update is true and PDFs exist', () => {
		mockUsePayment.mockReturnValueOnce({
			state: {
				payment: { ...starterPayment, proofOfPaymentPDF: ['dummy.pdf'] },
				update: true
			},
			handleChange: vi.fn(),
			handleBlurPayment: vi.fn(),
			errorsPayment: {}
		})

		renderComponent()
		const statusLabel = screen.getByText(/status/i, { selector: 'label' })
		const statusSelect = statusLabel.nextElementSibling as HTMLSelectElement
		expect(statusSelect).toBeDisabled()
	})

	it('shows validation errors when present', () => {
		mockUsePayment.mockReturnValueOnce({
			state: {
				payment: { ...starterPayment },
				update: false
			},
			handleChange: vi.fn(),
			handleBlurPayment: vi.fn(),
			errorsPayment: {
				amount: 'Invalid amount',
				status: 'Status required'
			}
		})

		renderComponent()

		// Handle potential whitespace in error messages
		expect(screen.getByText(/invalid amount/i)).toBeInTheDocument()
		expect(screen.getByText(/status required/i)).toBeInTheDocument()
	})

	it('triggers handleChange on input modification', async () => {
		const mockHandleChange = vi.fn()
		mockUsePayment.mockReturnValueOnce({
			state: {
				payment: { ...starterPayment },
				update: false
			},
			handleChange: mockHandleChange,
			handleBlurPayment: vi.fn(),
			errorsPayment: {}
		})

		renderComponent()

		const amountInput = screen.getByLabelText(/amount/i)
		await user.type(amountInput, '500')

		expect(mockHandleChange).toHaveBeenCalled()
		expect(mockHandleChange.mock.calls[0][1]).toBe('UPDATE_PAYMENT_FIELD')
	})

	it('triggers handleBlur on input blur', async () => {
		const mockHandleBlur = vi.fn()
		mockUsePayment.mockReturnValueOnce({
			state: {
				payment: { ...starterPayment },
				update: false
			},
			handleChange: vi.fn(),
			handleBlurPayment: mockHandleBlur,
			errorsPayment: {}
		})

		renderComponent()

		const amountInput = screen.getByLabelText(/amount/i)
		await user.click(amountInput)
		await user.tab()

		expect(mockHandleBlur).toHaveBeenCalled()
	})
})
