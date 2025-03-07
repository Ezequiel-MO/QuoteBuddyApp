import { ChangeEvent, FC, FormEvent } from 'react'
import { LoginUserInput } from './LoginUserInput'
import { LoginPasswordInput } from './LoginPasswordInput'
import { Icon } from '@iconify/react'

interface Props {
	email: string
	setEmail: (value: string) => void
	password: string
	setPassword: (value: string) => void
	handleSubmit: (event: FormEvent<HTMLFormElement>) => void
	userType: 'client' | 'agency'
}

export const LoginForm: FC<Props> = ({
	email,
	setEmail,
	password,
	setPassword,
	handleSubmit,
	userType
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-5"
			data-testid="login-form"
		>
			<LoginUserInput
				label="Email Address"
				type="email"
				name="email"
				value={email}
				handleChange={(e) => setEmail(e.target.value)}
				placeholder="Enter your email address"
				required
				styling="w-full px-4 py-3 bg-gray-300 text-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] focus:border-transparent transition duration-200 cursor-text hover:border-[#ea5933] text-gray-200 dark:border-gray-700 focus:ring-[#ea5933] hover:border-[#ea5933] hover:bg-gray-200"
			/>

			<LoginPasswordInput
				label="Password"
				name="password"
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
				placeholder="Enter your password"
				error=""
			/>

			<button
				type="submit"
				className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-[#ea5933] text-white font-medium rounded-lg hover:bg-[#d84b2a] focus:outline-none focus:ring-2 focus:ring-[#ea5933] focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 dark:bg-[#ea5933] dark:hover:bg-[#d84b2a]"
			>
				<Icon
					icon={userType === 'client' ? 'mdi:account' : 'mdi:office-building'}
					width="20"
					height="20"
				/>
				Sign In
			</button>
		</form>
	)
}
