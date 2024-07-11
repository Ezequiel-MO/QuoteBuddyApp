import { SelectTypeFreelancer } from '..'
import { NumberInput, TextInput } from '../../../components/atoms'
import { useFreelancer } from '../context/FreelancerContext'
import { LocationSelector } from '@components/molecules/LocationSelector'

export const FreeLancerFormFields = () => {
	const { state, handleChange, handleBlur, errors } = useFreelancer()
	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General FreeLancer Data
				</h1>
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<TextInput
					name="firstName"
					value={state.currentFreelancer?.firstName || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.firstName}
					placeholder="First Name"
				/>
				<TextInput
					name="familyName"
					value={state.currentFreelancer?.familyName || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.familyName}
					placeholder="Family Name"
				/>
				<TextInput
					type="email"
					name="email"
					value={state.currentFreelancer?.email || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.email}
					placeholder="Email"
				/>
				<TextInput
					type="tel"
					name="phone"
					value={state.currentFreelancer?.phone || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.phone}
					placeholder="Phone"
				/>
				<NumberInput
					name="halfDayRate"
					value={state.currentFreelancer?.halfDayRate || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.halfDayRate}
					placeholder="Half Day Rate"
				/>
				<NumberInput
					name="fullDayRate"
					value={state.currentFreelancer?.fullDayRate || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.fullDayRate}
					placeholder="Full Day Rate"
				/>
				<NumberInput
					name="weekendHDRate"
					value={state.currentFreelancer?.weekendHDRate || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.weekendHDRate}
					placeholder="Weekend HD Rate"
				/>
				<NumberInput
					name="weekendFDRate"
					value={state.currentFreelancer?.weekendFDRate || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.weekendFDRate}
					placeholder="Weekend FD Rate"
				/>
				<div className="md:col-span-2">
					<label className="uppercase text-xl text-gray-600 font-bold mr-2">
						Type
					</label>
					<SelectTypeFreelancer
						type={state.currentFreelancer?.type || ''}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
					{errors.type && <p className="text-red-500 mt-1">{errors.type}</p>}
				</div>
				<div className="md:col-span-2">
					<label className="uppercase text-xl text-gray-600 font-bold mr-2">
						Location
					</label>
					<LocationSelector
						city={state.currentFreelancer?.city || ''}
						name="city"
						handleChange={handleChange}
					/>
					{errors.city && <p className="text-red-500 mt-1">{errors.city}</p>}
				</div>
			</div>
		</fieldset>
	)
}
