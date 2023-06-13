import { PasswordInput, TextInput } from '../../components/atoms'

export const LoginForm = ({
	email,
	setEmail,
	password,
	setPassword,
	handleSubmit
}) => {
	return (
		<form
			className="my-10 bg-gray-50 rounded-lg px-10 py-5"
			onSubmit={handleSubmit}
		>
			<div className="my-5">
				<TextInput
					type="email"
					id="email"
					name="email"
					value={email}
					handleChange={(e) => setEmail(e.target.value)}
					placeholder="Register email"
					styling="w-full mt-3 p-3 border rounded-xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
				/>
			</div>
			<div className="my-5">
				<PasswordInput
					label="Password"
					placeholder="Register password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					error=""
				/>
			</div>
			<input
				type="submit"
				value="Start Session"
				className="my-5 text-white-100 bg-orange-50 w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-orange-50 transition-colors"
			/>
		</form>
	)
}
