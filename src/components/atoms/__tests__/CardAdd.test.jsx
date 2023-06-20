import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CardAdd } from '../CardAdd'
import { useNavigate } from 'react-router-dom'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate
}))

afterEach(() => {
	mockedUsedNavigate.mockClear()
})

describe('CardAdd component', () => {
	const name = 'restaurant'
	const route = 'restaurant'
	const timeOfEvent = 'lunch'
	const dayOfEvent = 0

	it('Renders correctly', () => {
		const { getByText } = render(
			<CardAdd
				name={name}
				route={route}
				timeOfEvent={timeOfEvent}
				dayOfEvent={dayOfEvent}
				renderAddCard={true}
			/>
		)
		expect(getByText(`Add ${name}`)).toBeInTheDocument()
	})

	it('Calls useNavigate when clicked', () => {
		const navigate = useNavigate()
		const { getByText } = render(
			<CardAdd
				name={name}
				route={route}
				timeOfEvent={timeOfEvent}
				dayOfEvent={dayOfEvent}
				renderAddCard={true}
			/>
		)
		fireEvent.click(getByText(`Add ${name}`))
		expect(navigate).toHaveBeenCalledWith(`/app/${route}`, {
			state: { timeOfEvent, dayOfEvent }
		})
	})

	it('Handles undefined timeOfEvent and dayOfEvent', () => {
		const navigate = useNavigate()
		const { getByText } = render(
			<CardAdd name={name} route={route} renderAddCard={true} />
		)
		fireEvent.click(getByText(`Add ${name}`))
		expect(navigate).toHaveBeenCalledWith(`/app/${route}`, {
			state: { timeOfEvent: undefined, dayOfEvent: undefined }
		})
	})
})
