import { render, fireEvent } from '@testing-library/react'
import { ModalCancelButton } from '../../../components/atoms'

describe('ModalCancelButton', () => {
	test('calls handleClose when the button is clicked', () => {
		const handleClose = jest.fn()
		const { getByRole } = render(
			<ModalCancelButton handleClose={handleClose} />
		)

		fireEvent.click(getByRole('button'))
		expect(handleClose).toHaveBeenCalled()
	})

	test('does not throw error when handleClose is not a function', () => {
		const handleClose = 'not a function'
		expect(() => {
			const { getByRole } = render(
				<ModalCancelButton handleClose={handleClose} />
			)
			fireEvent.click(getByRole('button'))
		}).not.toThrow()
	})

	// Edge case: handleClose is not provided
	test('does not throw error when handleClose is not provided', () => {
		expect(() => {
			const { getByRole } = render(<ModalCancelButton />)
			fireEvent.click(getByRole('button'))
		}).not.toThrow()
	})
})
