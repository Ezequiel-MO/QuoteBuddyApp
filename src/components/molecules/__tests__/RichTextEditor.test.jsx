import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RichTextEditor } from '../RichTextEditor'

jest.mock('react-quill', () => {
	return jest.fn().mockImplementation(({ onChange }) => {
		return (
			<textarea
				data-testid="mock-quill"
				onChange={(e) => onChange(e.target.value)}
			/>
		)
	})
})

describe('RichTextEditor component', () => {
	const setTextContent = jest.fn()
	const screen = {
		textContent: 'Hello World'
	}
	const update = true
	const style = { width: '95%' }

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('Renders correctly', () => {
		const { getByTestId } = render(
			<RichTextEditor
				setTextContent={setTextContent}
				textContent=""
				update={update}
				screen={screen}
				style={style}
			/>
		)
		expect(getByTestId('mock-quill')).toBeInTheDocument()
	})

	it('Calls setTextContent when the text changes', () => {
		const { getByTestId } = render(
			<RichTextEditor
				setTextContent={setTextContent}
				textContent=""
				update={update}
				screen={screen}
				style={style}
			/>
		)
		fireEvent.change(getByTestId('mock-quill'), {
			target: { value: 'Hello World' }
		})
		expect(setTextContent).toHaveBeenCalledWith('Hello World')
	})
})
