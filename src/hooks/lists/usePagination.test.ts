import { vi, describe, beforeEach, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePagination } from 'src/hooks/lists/usePagination'

type MockState = {
	page: number
	totalPages: number
}

describe('usePagination', () => {
	const mockDispatch = vi.fn()
	const initialProps = {
		state: {
			page: 2,
			totalPages: 5
		} as MockState,
		dispatch: mockDispatch
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should decrement page on prev action', () => {
		const { result } = renderHook(() => usePagination(initialProps))

		result.current.changePage('prev')

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_PAGE', payload: 1 })
	})

	it('should increment page on next action', () => {
		const { result } = renderHook(() => usePagination(initialProps))

		result.current.changePage('next')

		expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_PAGE', payload: 3 })
	})

	it('should not go below page 1', () => {
		const { result } = renderHook(() =>
			usePagination({
				state: { page: 1, totalPages: 5 },
				dispatch: mockDispatch
			})
		)

		result.current.changePage('prev')

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_PAGE',
			payload: 1
		})
	})

	it('should not exceed total pages', () => {
		const { result } = renderHook(() =>
			usePagination({
				state: { page: 5, totalPages: 5 },
				dispatch: mockDispatch
			})
		)
		result.current.changePage('next')

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_PAGE',
			payload: 5
		})
	})

	it('should respond to state changes', () => {
		const { result, rerender } = renderHook((props) => usePagination(props), {
			initialProps
		})

		// First next click from initial page 2
		result.current.changePage('next')
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_PAGE',
			payload: 3 // 2 + 1 = 3
		})

		// Rerender with updated state
		rerender({
			state: { page: 3, totalPages: 5 },
			dispatch: mockDispatch
		})

		// Clear previous calls
		mockDispatch.mockClear()

		// Second next click from new page 3
		result.current.changePage('next')
		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_PAGE',
			payload: 4 // 3 + 1 = 4 (NOT 7)
		})

		// Verify the test would fail with incorrect payload
		const lastCall = mockDispatch.mock.calls[0][0]
		expect(lastCall.payload).not.toBe(7) // Safety check
	})

	it('should memoize changePage function', () => {
		const { result, rerender } = renderHook((props) => usePagination(props), {
			initialProps
		})

		const firstReference = result.current.changePage
		rerender(initialProps)

		expect(result.current.changePage).toBe(firstReference)

		rerender({ ...initialProps, state: { page: 3, totalPages: 5 } })
		expect(result.current.changePage).not.toBe(firstReference)
	})

	it('should handle single page gracefully', () => {
		const { result } = renderHook(() =>
			usePagination({
				state: { page: 1, totalPages: 1 },
				dispatch: mockDispatch
			})
		)

		result.current.changePage('prev')
		result.current.changePage('next')

		expect(mockDispatch).toHaveBeenCalledTimes(2)
		expect(mockDispatch).toHaveBeenNthCalledWith(1, {
			type: 'SET_PAGE',
			payload: 1
		})
		expect(mockDispatch).toHaveBeenNthCalledWith(2, {
			type: 'SET_PAGE',
			payload: 1
		})
	})
})
