import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom'
import { PaymentSlip } from './PaymentSlip'
import { usePaymentSlip } from './context/PaymentSlipContext'
import { IProjectState } from './context/interfaces'
import { useApiFetch, useFetchProjects } from 'src/hooks/fetchData'
import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'
import { starterVendorInvoice } from 'src/constants/starterObjects'
import { PaymentsProvider } from '../cash_flow/context/PaymentsProvider'
import { InvoiceProvider } from '@screens/invoices/context/InvoiceContext'

// Mocks
vi.mock('react-router-dom', async () => ({
	...(await vi.importActual<typeof import('react-router-dom')>(
		'react-router-dom'
	)),
	useNavigate: vi.fn(),
	useParams: vi.fn()
}))

vi.mock('../context/PaymentSlipContext', () => ({
	usePaymentSlip: vi.fn(() => ({
		stateProject: null,
		isLoading: false,
		dispatch: vi.fn(),
		setForceRefresh: vi.fn()
	}))
}))

vi.mock('@screens/projects/context/ProjectContext', () => ({
	useProject: vi.fn(() => ({ dispatch: vi.fn() }))
}))

vi.mock('src/hooks', () => ({
	useCurrentProject: vi.fn(() => ({
		setCurrentProject: vi.fn()
	}))
}))

vi.mock('src/hooks/fetchData', () => ({
	useApiFetch: vi.fn(() => ({ data: null, isLoading: false, error: null })),
	useFetchProjects: vi.fn(() => ({ project: null, isLoading: false })),
	useFetchInvoices: vi.fn(() => ({ invoices: [] })) // Added missing mock
}))

vi.mock('react-toastify', () => ({
	toast: {
		error: vi.fn()
	}
}))

const mockProject: IProjectState = {
	...defaultProject,
	_id: 'proj-123',
	code: 'PROJ-001',
	vendorInvoices: [starterVendorInvoice]
}

const setupMocks = (options?: {
	loading?: boolean
	emptyProject?: boolean
	apiError?: boolean
}) => {
	const mockNavigate = vi.fn()
	const mockDispatch = vi.fn()

	// Router mocks
	;(useParams as Mock).mockReturnValue({ projectId: 'proj-123' })
	;(useNavigate as Mock).mockReturnValue(mockNavigate)

	// PaymentSlip context mock
	;(usePaymentSlip as Mock).mockReturnValue({
		stateProject: options?.emptyProject ? null : mockProject,
		isLoading: options?.loading ?? false,
		dispatch: mockDispatch,
		setForceRefresh: vi.fn()
	})

	// API fetch mocks
	;(useApiFetch as Mock).mockReturnValue({
		data: options?.apiError ? null : [starterVendorInvoice],
		isLoading: options?.loading ?? false,
		error: options?.apiError ? new Error('API Error') : null
	})

	// Projects fetch mock
	;(useFetchProjects as Mock).mockReturnValue({
		project: options?.apiError ? null : mockProject,
		isLoading: options?.loading ?? false
	})

	return { mockNavigate, mockDispatch }
}

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<MemoryRouter>
			<PaymentsProvider>
				<InvoiceProvider>{ui}</InvoiceProvider>
			</PaymentsProvider>
		</MemoryRouter>
	)
}

describe('PaymentSlip', () => {
	beforeEach(() => {
		;(window as any).scrollTo = vi.fn()
		vi.clearAllMocks()
	})

	it('renders loading spinner when data is loading', () => {
		setupMocks({ loading: true })
		renderWithProviders(<PaymentSlip />)
		expect(screen.getByTestId('Spinner')).toBeInTheDocument()
	})

	it('renders content when data is loaded', async () => {
		setupMocks()
		renderWithProviders(<PaymentSlip />)

		await waitFor(() => {
			expect(screen.getByText('Payment Slip')).toBeInTheDocument()
			expect(screen.getByTestId('table-payment')).toBeInTheDocument()
			expect(screen.getByTestId('table-vendor-invoice')).toBeInTheDocument()
		})
	})

	it('handles navigation to project specs', async () => {
		const { mockNavigate } = setupMocks()
		renderWithProviders(<PaymentSlip />)

		await userEvent.click(screen.getByText('PROJ-001'))
		expect(mockNavigate).toHaveBeenCalledWith('/app/project/specs')
	})

	it('scrolls to top on mount', async () => {
		setupMocks()
		renderWithProviders(<PaymentSlip />)

		await waitFor(() => {
			expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
		})
	})

	it('shows spinner when project data is invalid', () => {
		setupMocks({ emptyProject: true })
		renderWithProviders(<PaymentSlip />)
		expect(screen.getByTestId('Spinner')).toBeInTheDocument()
	})

	it('handles missing project ID in URL params', () => {
		;(useParams as Mock).mockReturnValue({ projectId: undefined })
		setupMocks({ emptyProject: true })
		renderWithProviders(<PaymentSlip />)
		expect(screen.getByTestId('Spinner')).toBeInTheDocument()
	})
})
