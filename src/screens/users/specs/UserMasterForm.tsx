import React from 'react'
import { SubmitInput } from '@components/atoms'
import { IUser } from '@interfaces/user'

interface UserMasterFormProps {
	user: IUser
	data: Partial<IUser>
	setData: React.Dispatch<React.SetStateAction<Partial<IUser>>>
	handleSubmit: (event: React.FormEvent) => void
	validate: (input: Partial<IUser>) => Partial<Record<keyof IUser, string>>
	errors: Partial<Record<keyof IUser, string>>
	setErrors: React.Dispatch<
		React.SetStateAction<Partial<Record<keyof IUser, string>>>
	>
}

const UserMasterForm: React.FC<UserMasterFormProps> = ({
	user,
	data,
	setData,
	handleSubmit,
	validate,
	errors,
	setErrors
}) => {
	const update = !!user._id

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setData((prevData) => ({ ...prevData, [name]: value }))
		setTimeout(() => {
			setErrors(validate({ ...data, [name]: value }))
		}, 1000)
	}

	return (
		<>
			<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
				<form onSubmit={handleSubmit}>
					<fieldset className="grid grid-cols-2 gap-4">
						<legend>
							<h1 className="text-2xl mb-4">General User Data</h1>
						</legend>
						<div className="form-group mb-6">
							<label htmlFor="name">Name</label>
							<input
								className="w-full px-2 py-1 text-base text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:outline-none"
								type="text"
								placeholder="user given name"
								name="name"
								value={data.name || ''}
								onChange={handleChange}
							/>
							{errors.name && (
								<p className="bg-red-500 font-bold text-white-50">
									{errors.name}
								</p>
							)}
							<label htmlFor="email">Email</label>
							<input
								className="w-full px-2 py-1 text-base text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:outline-none"
								type="email"
								placeholder="user given email"
								name="email"
								value={data.email || ''}
								onChange={handleChange}
							/>
							{errors.email && (
								<p className="bg-red-500 font-bold text-white-50">
									{errors.email}
								</p>
							)}
							<label htmlFor="password">Password</label>
							<input
								className="w-full px-2 py-1 text-base text-gray-700 border border-solid border-gray-300 rounded focus:text-gray-700 focus:outline-none"
								type="password"
								placeholder="user given password"
								name="password"
								value={data.password || ''}
								onChange={handleChange}
							/>
							{errors.password && (
								<p className="bg-red-500 font-bold text-white-50">
									{errors.password}
								</p>
							)}
						</div>
						<br />
						<SubmitInput update={update} title="User" />
					</fieldset>
				</form>
			</div>
		</>
	)
}

export default UserMasterForm
