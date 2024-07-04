import { TextInput } from '@components/atoms'
import TextEditor from '@components/molecules/TextEditor'
import { SelectModule } from './SelectModule'
import { useNotification } from '../context/NotificationContext'
import { useCallback } from 'react'
import { modulesTypes } from 'src/constants/presentationModuleTypes'
import { SelectAccManagers, SelectAccManagersBox } from './SelectAccManagers'

export const NotificationFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } =
		useNotification()

	const handleTextContentChange = useCallback((textContent: string) => {
		dispatch({
			type: 'UPDATE_NOTIFICATION_FIELD',
			payload: { name: 'textContent', value: textContent }
		})
	}, [])

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">General Notification Data</h1>
			</legend>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<TextInput
					label="Title"
					placeholder="Title the notification"
					type="text"
					name="title"
					value={state.currentNotification?.title}
					handleChange={handleChange}
					errors={errors.title}
					handleBlur={handleBlur}
				/>
			</div>
			<div className="mt-3">
				<SelectModule
					options={modulesTypes}
					handleChange={handleChange}
					module={state.currentNotification?.module as string}
				/>
			</div>
			<div>
				<label className="block uppercase text-lg text-gray-400 font-medium mb-0.5 mt-3">
					Account Manager
				</label>
				<SelectAccManagers state={state} dispatch={dispatch} />
				<SelectAccManagersBox state={state} dispatch={dispatch} />
			</div>
			<div className="col-span-1 sm:col-span-2 lg:col-span-3">
				<label className="block uppercase text-lg text-gray-400 font-medium">
					Notification - Description
				</label>
				<TextEditor
					value={state.currentNotification?.textContent || ''}
					onChange={handleTextContentChange}
				/>
			</div>
		</fieldset>
	)
}
