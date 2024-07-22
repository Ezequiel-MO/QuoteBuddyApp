import { TextInput } from '../../../components/atoms'
import { useGift } from '../context/GiftsContext'
import TextEditor from '@components/molecules/TextEditor'
import { useCallback } from 'react'

export const GiftFormFields = () => {
	const { state, dispatch, handleChange, handleBlur, errors } = useGift()

	const handleTextContentChange = useCallback((textContent: string) => {
		dispatch({
			type: 'UPDATE_GIFT_FIELD',
			payload: { name: 'textContent', value: textContent }
		})
	}, [])

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Gift Data
				</h1>
			</legend>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<div className="col-span-1 lg:col-span-2">
					<TextInput
						type="text"
						label="Name"
						placeholder="Gift identification name"
						name="name"
						value={state.currentGift?.name || ''}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.name}
					/>
				</div>
				<div className="col-span-1 lg:col-span-1 lg:max-w-xs">
					<TextInput
						type="number"
						label="Price"
						placeholder="ex : 21 € per unit"
						name="price"
						value={state.currentGift?.price || ''}
						handleChange={handleChange}
						handleBlur={handleBlur}
						errors={errors.price}
					/>
				</div>
				<div className="col-span-1 sm:col-span-2 lg:col-span-3">
					<h2 className="text-center text-xl">Gift Description</h2>
					<label className="block uppercase text-lg text-gray-400 font-medium">
						Description (English)
					</label>
					<TextEditor
						value={state.currentGift?.textContent || ''}
						onChange={handleTextContentChange}
					/>
					{/* <div className="mt-10">
						<AddDescriptionsInLanguages />
					</div> */}
				</div>
			</div>
		</fieldset>
	)
}
