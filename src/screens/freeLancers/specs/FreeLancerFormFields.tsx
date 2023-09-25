import { IFreelancer } from '@interfaces/freelancer'
import { SelectTypeFreelancer, SelectLocation } from '..'
import { NumberInput, TextInput } from '../../../components/atoms'

import styles from '../FreeLancer.module.css'

interface Props {
	data: {
		firstName: string
		familyName: string
		email: string
		phone: string
		halfDayRate: number
		fullDayRate: number
		weekendHDRate: number
		weekendFDRate: number
		type: string
		city: string
	}
	setData: React.Dispatch<React.SetStateAction<IFreelancer>>
	update: boolean
	typeFreeLancer: string[]
	errors: {
		[key: string]: string | undefined
	}
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
	handleSelectLocation: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const FreeLancerFormFields = ({
	data,
	setData,
	update,
	typeFreeLancer,
	errors,
	handleChange,
	handleBlur,
	handleSelectLocation
}: Props) => {
	return (
		<fieldset className="grid grid-cols-2 gap-4">
			<legend>
				<h1 className="text-2xl mb-4">General FreeLancer Data</h1>
			</legend>
			<div className="mb-6">
				<TextInput
					name="firstName"
					value={data.firstName}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.firstName}
					placeholder="First Name"
				/>
				<TextInput
					name="familyName"
					value={data.familyName}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.familyName}
					placeholder="Family Name"
				/>
				<TextInput
					type="email"
					name="email"
					value={data.email}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.email}
					placeholder="Email"
				/>
				<TextInput
					type="tel"
					name="phone"
					value={data.phone}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.phone}
					placeholder="Phone"
				/>
				<NumberInput
					name="halfDayRate"
					value={data.halfDayRate}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.halfDayRate}
					placeholder="Half Day Rate"
				/>
				<NumberInput
					name="fullDayRate"
					value={data.fullDayRate}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.fullDayRate}
					placeholder="Full Day Rate"
				/>
			</div>
			<div className="form-group mb-6">
				<NumberInput
					name="weekendHDRate"
					value={data.weekendHDRate}
					handleChange={handleChange}
					handleBlur={handleBlur}
					/* errors={errors.weekendHDRate} */
					placeholder="Weekend HD Rate"
				/>
				<NumberInput
					name="weekendFDRate"
					value={data.weekendFDRate}
					handleChange={handleChange}
					handleBlur={handleBlur}
					/* errors={errors.weekendFDRate} */
					placeholder="Weekend FD Rate"
				/>
				<label>Type </label>
				<SelectTypeFreelancer
					typeFreeLancer={typeFreeLancer}
					type={data.type}
					handleChange={handleChange}
				/>
				{errors.type && !data.type && (
					<p className={styles.validationError}>{errors.type}</p>
				)}
				<label className="uppercase text-xl text-gray-600 font-bold">
					Location
				</label>
				<SelectLocation handleChange={handleSelectLocation} city={data.city} />
				{errors.city && !data.city && (
					<p className={styles.validationError}>{errors.city}</p>
				)}
			</div>
			<input
				type="submit"
				className="cursor-pointer 
                        py-2 
                        px-10 
                        hover:bg-gray-600 
                        bg-green-50 
                        text-black-50 
                        hover:text-white-50 
                        font-bold
                        uppercase 
                        rounded-lg"
				value={update ? 'Edit FreeLancer Form' : 'Save new FreeLancer'}
			/>
		</fieldset>
	)
}
