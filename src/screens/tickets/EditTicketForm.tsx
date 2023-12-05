import React, { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ITicket } from '@interfaces/ticket' // Adjust the import path as needed
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions } from 'src/helper/toast'

interface EditTicketFormProps {
	ticket: ITicket
}

interface FormData {
	title: string
	description: string
	priority: number
	progress: number
	status: string
	category: string
}

export const EditTicketForm: React.FC<EditTicketFormProps> = ({ ticket }) => {
	const update = ticket && ticket._id !== 'new'
	const navigate = useNavigate()
	const initialFormData: FormData = {
		title: '',
		description: '',
		priority: 1,
		progress: 0,
		status: 'Not Started',
		category: 'Software Problem'
	}

	const [formData, setFormData] = useState<FormData>(initialFormData)

	useEffect(() => {
		if (update) {
			setFormData({
				title: ticket.title,
				description: ticket.description,
				priority: ticket.priority,
				progress: ticket.progress,
				status: ticket.status,
				category: ticket.category
			})
		} else {
			setFormData(initialFormData)
		}
	}, [ticket, update])

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			if (update) {
				await baseAPI.patch(`tickets/${ticket._id}`, formData)
			}
			if (!update) {
				await baseAPI.post('tickets', formData)
			}

			setTimeout(() => {
				navigate('/app/tickets')
			}, 1000)
		} catch (error: any) {
			toast.error(
				`Error Creating/Updating Ticket, ${error.response.data.message}`,
				errorToastOptions
			)
		}
	}

	const categories = [
		'Software Problem',
		'New Feature Requested',
		'Enhancement',
		'General Issue Comment'
	]

	return (
		<div className="flex justify-center mt-5 text-xl">
			<form
				onSubmit={handleSubmit}
				method="post"
				className="flex flex-col gap-3 w-1/2"
			>
				<h3>{update ? 'Update Your Ticket' : 'Create New Ticket'}</h3>
				<label>Title</label>
				<input
					id="title"
					name="title"
					type="text"
					onChange={handleChange}
					required={true}
					value={formData.title}
					className="bg-gray-700 text-white-0 p-2 rounded"
					placeholder="... the Add Client button is not working ..."
				/>

				<label>Description</label>
				<textarea
					id="description"
					name="description"
					onChange={handleChange}
					required={true}
					value={formData.description}
					rows={5}
					className="bg-gray-700 text-white-0 p-2 rounded"
					placeholder="... write here a description of what is not working, or what your suggestion is ..."
				/>
				<label>Category</label>
				<select
					name="category"
					value={formData.category}
					onChange={handleChange}
					className="bg-gray-700 text-white-0 p-2 rounded"
				>
					{categories?.map((category, _index) => (
						<option key={_index} value={category}>
							{category}
						</option>
					))}
				</select>
				<label>Priority</label>
				<div className="flex items-center space-x-4">
					{[1, 2, 3, 4, 5].map((num) => (
						<label key={num} className="flex items-center space-x-2">
							<input
								id={`priority-${num}`}
								name="priority"
								type="radio"
								onChange={handleChange}
								value={num}
								checked={formData.priority == num}
								className="form-radio h-5 w-5 text-blue-600"
							/>
							<span>{num}</span>
						</label>
					))}
				</div>

				<label>Progress</label>
				<input
					type="range"
					id="progress"
					name="progress"
					value={formData.progress}
					min="0"
					max="100"
					onChange={handleChange}
				/>
				<label>Status</label>
				<select
					name="status"
					value={formData.status}
					onChange={handleChange}
					className="bg-gray-600 text-white-0 p-2 rounded"
				>
					<option value="Not Started">Not Started</option>
					<option value="Started">Started</option>
					<option value="Done">Done</option>
				</select>
				<input
					type="submit"
					className="btn max-w-xs"
					value={update ? 'Update Ticket' : 'Create Ticket'}
				/>
			</form>
		</div>
	)
}
