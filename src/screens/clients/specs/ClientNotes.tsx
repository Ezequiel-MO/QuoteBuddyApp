import React from 'react'
import { IClientNote } from 'src/interfaces/client'
import { Button } from 'src/components/atoms/buttons/Button'
import { TextInput } from '@components/atoms'
import { ClientOptionsSelect } from './ClientOptionsSelect'
import TextEditor from 'src/components/molecules/TextEditor'
import { useClient } from '../context/ClientContext'

type ClientNoteKey = keyof IClientNote

const optionsQualification = [
	{ value: 'Feedback', name: 'Feedback' },
	{ value: 'Incident', name: 'Incident' },
	{ value: 'Complaint', name: 'Complaint' },
	{ value: 'Other', name: 'Other' }
]

export const ClientNotes = () => {
	const { state, dispatch, handleBlur } = useClient()

	// Function to add a new note to the state
	const addNote = () => {
		const newNote: IClientNote = {
			type: 'Feedback',
			date: new Date(),
			textContent: ''
		}
		const updatedNotes = [...(state.currentClient?.clientNotes || []), newNote]
		dispatch({
			type: 'UPDATE_CLIENT_FIELD',
			payload: { name: 'clientNotes', value: updatedNotes }
		})
	}

	// Function to handle removing a specific note
	const removeNote = (index: number) => {
		const updatedNotes =
			state.currentClient?.clientNotes?.filter(
				(_, idIndex) => idIndex !== index
			) || []
		dispatch({
			type: 'UPDATE_CLIENT_FIELD',
			payload: { name: 'clientNotes', value: updatedNotes }
		})
	}

	// Handle change for TextInput and ClientOptionsSelect
	const handleChangeNote = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = event.target
		const keyNote = name as ClientNoteKey
		const updateNotes = [...(state.currentClient?.clientNotes || [])]
		updateNotes[index][keyNote] =
			keyNote === 'date' ? new Date(value) : (value as any)
		dispatch({
			type: 'UPDATE_CLIENT_FIELD',
			payload: { name: 'clientNotes', value: updateNotes }
		})
	}

	// Handle change for RichTextEditor
	const handleRichTextEditor = (text: string, index: number) => {
		const updateNotes = [...(state.currentClient?.clientNotes || [])]
		updateNotes[index].textContent = text
		dispatch({
			type: 'UPDATE_CLIENT_FIELD',
			payload: { name: 'clientNotes', value: updateNotes }
		})
	}

	return (
		<div>
			{state.currentClient?.clientNotes?.map((el, index) => {
				// Ensure el.date is a Date object
				const date = el.date instanceof Date ? el.date : new Date(el.date)
				return (
					<div key={index}>
						<label className="block uppercase text-lg text-gray-400 font-medium mb-4 ">
							<hr />
							New Note
						</label>
						<div className="flex space-x-4">
							<div className="w-1/2">
								<TextInput
									label="Date"
									type="date"
									name="date"
									value={date.toISOString().substr(0, 10)}
									handleChange={(event) => handleChangeNote(event, index)}
									handleBlur={handleBlur}
								/>
							</div>
							<div className="w-1/2">
								<ClientOptionsSelect
									titleLabel="Type"
									options={optionsQualification}
									name="type"
									keyValue="type"
									value={el.type}
									handleChange={(event) => handleChangeNote(event, index)}
								/>
							</div>
						</div>
						<div className="mt-4">
							<label className="block uppercase text-lg text-gray-400 font-medium">
								Description
							</label>
							<TextEditor
								value={el.textContent}
								onChange={(text: string) => handleRichTextEditor(text, index)}
							/>
						</div>
						<Button
							icon="tdesign:delete-1"
							newClass="flex items-center gap-1 text-red-400 hover:text-red-600 ml-96 mt-2"
							type="button"
							widthIcon={20}
							handleClick={() => removeNote(index)}
						>
							Delete Description
						</Button>
					</div>
				)
			})}
			<Button
				icon=""
				newClass="text-green-300 hover:text-green-500"
				type="button"
				handleClick={addNote}
			>
				+ Add Note
			</Button>
		</div>
	)
}
