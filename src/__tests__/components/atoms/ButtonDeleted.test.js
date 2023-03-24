// tests/ButtonDeleted.test.js
/* global jest, describe, beforeEach, it, expect */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ButtonDeleted } from '../../../components/atoms/ButtonDeleted'

jest.mock('@iconify/react', () => ({ Icon: () => <div>Icon</div> }))

// Mocking the removeItemFromList function
jest.mock('../../../helper/RemoveItemFromList', () => ({
	removeItemFromList: jest.fn()
}))

describe('ButtonDeleted', () => {
	const endpoint = 'http://example.com/api/items'
	const ID = '1'
	const setter = jest.fn()
	const items = [
		{ id: '1', name: 'Item 1' },
		{ id: '2', name: 'Item 2' }
	]

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders without crashing', () => {
		render(
			<ButtonDeleted
				endpoint={endpoint}
				ID={ID}
				setter={setter}
				items={items}
			/>
		)
		const deleteButton = screen.getByRole('button')
		expect(deleteButton).toBeInTheDocument()
	})
})
