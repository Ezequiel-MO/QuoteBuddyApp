import { renderHook, act } from '@testing-library/react'
import {
	PaymentsProvider,
	usePayment
} from '@screens/cash_flow/context/PaymentsProvider'
import { beforeEach, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { starterVendorInvoice } from 'src/constants/starterObjects'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { CreateBlankVendorInvoice } from '@screens/cash_flow/context/CreateBlankVendorInvoice'
import { defaultProject } from 'src/redux/features/currentProject/defaultProjectState'

describe('PaymentsProvider', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	const setupHook = () =>
		renderHook(() => usePayment(), {
			wrapper: ({ children }) => (
				<MemoryRouter>
					<PaymentsProvider>{children}</PaymentsProvider>
				</MemoryRouter>
			)
		})

	it('initial state is correct', () => {
		const { result } = setupHook()
		expect(result.current.state.vendorInvoices).toEqual([])
		expect(result.current.state.vendorInvoice).toBeNull()
		expect(result.current.state.update).toBe(false)
	})
	it('ADD_VENDORINVOICE sets vendorInvoice in state', () => {
		const { result } = setupHook()
		const mockVendorInvoice: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'v1',
			amount: 123
		}
		act(() => {
			result.current.dispatch({
				type: 'ADD_VENDORINVOICE',
				payload: mockVendorInvoice
			})
		})
		expect(result.current.state.vendorInvoice?._id).toBe('v1')
		expect(result.current.state.vendorInvoice?.amount).toBe(123)
	})
	it('UPDATE_VENDORINVOICE updates vendorInvoice object', () => {
		const { result } = setupHook()
		const mockVendorInvoice: IVendorInvoice = {
			...starterVendorInvoice,
			_id: 'init',
			amount: 0
		}

		act(() => {
			result.current.dispatch({
				type: 'ADD_VENDORINVOICE',
				payload: mockVendorInvoice
			})
		})

		act(() => {
			result.current.dispatch({
				type: 'UPDATE_VENDORINVOICE',
				payload: {
					vendorInvoiceUpdate: {
						...mockVendorInvoice,
						amount: 999
					}
				}
			})
		})
		expect(result.current.state.vendorInvoice?.amount).toBe(999)
	})
	it('TOGGLE_UPDATE flips update boolean', () => {
		const { result } = setupHook()
		expect(result.current.state.update).toBe(false)
		act(() => {
			result.current.dispatch({
				type: 'TOGGLE_UPDATE',
				payload: true
			})
		})
		expect(result.current.state.update).toBe(true)

		act(() => {
			result.current.dispatch({
				type: 'TOGGLE_UPDATE',
				payload: false
			})
		})

		expect(result.current.state.update).toBe(false)
	})
	it('validate() returns false if invoice missing required fields', async () => {
		const { result } = setupHook()

		const incompleteVendorInvoice: IVendorInvoice = {
			...CreateBlankVendorInvoice(),
			invoiceNumber: '',
			vendor: undefined
		}

		await act(async () => {
			result.current.dispatch({
				type: 'ADD_VENDORINVOICE',
				payload: incompleteVendorInvoice
			})
		})

		let isValid: boolean

		await act(async () => {
			isValid = await result.current.validate()
		})
		expect(isValid!).toBe(false)
		expect(Object.keys(result.current.errors).length).toBeGreaterThan(0)
	})
	it('validate() returns true if invoice is valid', async () => {
		const { result } = setupHook()
		const mockVendorInvoice: IVendorInvoice = {
			...starterVendorInvoice,
			project: defaultProject
		}

		await act(async () => {
			result.current.dispatch({
				type: 'ADD_VENDORINVOICE',
				payload: mockVendorInvoice
			})
		})

		let isValid: boolean

		await act(async () => {
			isValid = await result.current.validate()
		})

		expect(isValid!).toBe(true)
		expect(result.current.errors).toEqual({})
	})
})
