import { TextInput } from '@components/atoms'
import { useAccManager } from '../context/AccManagersContext'

export const AccManagerFormFields = () => {
	const { state, handleChange, handleBlur, errors } = useAccManager()
	return (
		<fieldset className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
			<legend>
				<h1 className="text-3xl text-white mb-4">
					General Account Manager Data
				</h1>
			</legend>
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<div className="col-span-1">
					<TextInput
						label="First Name"
						placeholder="Acc manager Given Name"
						type="text"
						name="firstName"
						value={state.currentAccManager?.firstName || ''}
						handleChange={handleChange}
						errors={errors.firstName}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="col-span-1">
					<TextInput
						label="Last Name"
						placeholder="Acc manager Family Name"
						type="text"
						name="familyName"
						value={state.currentAccManager?.familyName || ''}
						handleChange={handleChange}
						errors={errors.familyName}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="col-span-1">
					<TextInput
						label="Email"
						placeholder="Acc manager company email"
						type="email"
						name="email"
						value={state.currentAccManager?.email || ''}
						handleChange={handleChange}
						errors={errors.email}
						handleBlur={handleBlur}
					/>
				</div>
			</div>
		</fieldset>
	)
}
