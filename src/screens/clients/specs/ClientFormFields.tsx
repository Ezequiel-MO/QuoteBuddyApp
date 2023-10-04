import { FC } from "react"
import { TextInput } from '@components/atoms'
import { ClientLanguageSelector } from "./ClientLanguageSelector"
import { ClientCountrySelector } from "./ClientCountrySelector"
import { IClient, ICountry } from 'src/interfaces/'

interface ClientFormFieldsProps {
	data: IClient
	// setData: React.Dispatch<React.SetStateAction<IAccManager>>
	countries: ICountry[]
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	quoteLanguage: string[]
}


export const ClientFormFields: FC<ClientFormFieldsProps> = ({
	data,
	countries,
	errors,
	handleChange,
	handleBlur,
	quoteLanguage
}) => {
	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">Client Details</h1>
			</legend>
			<div className='space-y-4'>
				<TextInput
					label='First Name'
					placeholder='name of the client'
					type='text'
					name="firstName"
					value={data.firstName}
					handleChange={handleChange}
					errors={errors.firstName}
					handleBlur={handleBlur}
				/>
				<TextInput
					label='Family Name'
					placeholder='last name of the client'
					type='text'
					name="familyName"
					value={data.familyName}
					handleChange={handleChange}
					errors={errors.familyName}
					handleBlur={handleBlur}
				/>
				<TextInput
					label='Email'
					placeholder='Client email'
					type='email'
					name="email"
					value={data.email}
					handleChange={handleChange}
					errors={errors.email}
					handleBlur={handleBlur}
				/>
				<TextInput
					label='Phone number'
					placeholder='Client phone number'
					type='tel'
					name="phone"
					value={data.phone}
					handleChange={handleChange}
					errors={errors.phone}
					handleBlur={handleBlur}
				/>
			</div>
			<div className='flex space-x-4'>
				<div className='w-1/2'>
					<ClientLanguageSelector
						quoteLanguage={data.quoteLanguage}
						options={quoteLanguage}
						errors={errors}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
				</div>
				<div className='w-1/2'>
					<ClientCountrySelector
						country={data.country as string}
						options={countries}
						errors={errors}
						handleChange={handleChange}
						handleBlur={handleBlur}
					/>
				</div>
			</div>
		</fieldset>
	)
}
