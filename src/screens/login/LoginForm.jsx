import React from 'react'

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
				<label
					htmlFor="email"
					className="uppercase text-gray-600 block text-xl font-bold"
				>
					Email
				</label>
				<input
					type="email"
					id="email"
					placeholder="Register email"
					className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="my-5">
				<label
					htmlFor="password"
					className="uppercase text-gray-600 block text-xl font-bold"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					placeholder="Register password"
					className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
