import { FC } from "react"
import { TextInput } from '@components/atoms'
import { IAccManager } from 'src/interfaces/'
interface AccManagerFormFieldsProps {
	data: IAccManager
	// setData: React.Dispatch<React.SetStateAction<IAccManager>>
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
}

export const AccManagerFormFields: FC<AccManagerFormFieldsProps> = ({
	data,
	errors,
	handleChange,
	handleBlur
}) => {
	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">General Account Manager Data</h1>
			</legend>
			<div className="space-y-4">
				<TextInput
					label={"First Name"}
					placeholder='Acc manager Given Name'
					type='text'
					name="firstName"
					value={data.firstName}
					handleChange={handleChange}
					errors={errors.firstName}
					handleBlur={handleBlur}
				/>
				<TextInput
					label='Last Name'
					placeholder='Acc manager Family Name'
					type='text'
					name="familyName"
					value={data.familyName}
					handleChange={handleChange}
					errors={errors.familyName}
					handleBlur={handleBlur}
				/>
				<TextInput
					label='Email'
					placeholder='Acc manager company email'
					type='email'
					name="email"
					value={data.email}
					handleChange={handleChange}
					errors={errors.familyName}
					handleBlur={handleBlur}
				/>
			</div>
		</fieldset>
	)
}
