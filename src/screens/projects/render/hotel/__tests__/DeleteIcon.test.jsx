import { render, fireEvent } from '@testing-library/react'
import { DeleteIcon } from '../../../../../components/atoms'

describe('DeleteIcon', () => {
	test('calls onDelete when the icon is clicked', () => {
		const onDelete = jest.fn()
		const { getByRole } = render(<DeleteIcon onDelete={onDelete} id="1" />)

		fireEvent.click(getByRole('button'))
		expect(onDelete).toHaveBeenCalledWith('1')
	})
})
