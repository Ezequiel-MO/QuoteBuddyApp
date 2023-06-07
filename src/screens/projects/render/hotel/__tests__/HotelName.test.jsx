import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { HotelName } from '../HotelName'

describe('HotelName', () => {
	const hotel = { name: 'Test Hotel' }
	const handleClick = jest.fn()

	test('renders hotel name', () => {
		const { getByText } = render(
			<HotelName
				hotel={hotel}
				index={0}
				handleClick={handleClick}
				isDragging={false}
			/>
		)

		expect(getByText('Test Hotel')).toBeInTheDocument()
	})

	test('calls handleClick on double click', () => {
		const { getByText } = render(
			<HotelName
				hotel={hotel}
				index={0}
				handleClick={handleClick}
				isDragging={false}
			/>
		)

		fireEvent.dblClick(getByText('Test Hotel'))

		expect(handleClick).toHaveBeenCalled()
	})
})
