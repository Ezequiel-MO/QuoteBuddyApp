import { SubmitInput } from '@components/atoms'

const UserMasterForm = ({
	user,
	data,
	setData,
	handleSubmit,
	validate,
	errors,
	setErrors
}) => {
	// const [errors , setErrors] = useState({})

	const update = Object.keys(user).length > 0 ? true : false

	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value
		})
		setTimeout(() => {
			setErrors(
				validate({
					...data,
					[event.target.name]: event.target.value
				})
			)
		}, 1000)
	}

	return (
		<>
			<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
				<form onSubmit={(event) => handleSubmit(event)}>
					<fieldset className="grid grid-cols-2 gap-4">
						<legend>
							<h1 className="text-2xl mb-4">General User Data</h1>
						</legend>
						<div className="form-group mb-6">
							<label htmlFor="">Name</label>
							<input
								className="w-full
                                px-2
                                py-1
                                text-base
                                text-gray-700
                                border border-solid border-gray-300
                                rounded
                                focus:text-gray-700 focus:outline-none"
								type="text"
								placeholder="user given name"
								name="name"
								value={data.name}
								onChange={(event) => handleChange(event)}
							/>
							{errors.name && (
								<p className="bg-red-500 font-bold text-white-50">
									{errors.name}
								</p>
							)}
							<label htmlFor="">Email </label>
							<input
								className="w-full
                             px-2
                             py-1
                             text-base
                             text-gray-700
                             border border-solid border-gray-300
                             rounded
                             focus:text-gray-700 focus:outline-none"
								type="email"
								placeholder="user given email"
								name="email"
								value={data.email}
								onChange={(event) => handleChange(event)}
							/>
							{errors.email && (
								<p className="bg-red-500 font-bold text-white-50">
									{errors.email}
								</p>
							)}
							<label htmlFor="">Password</label>
							<input
								className="w-full
                              px-2
                              py-1
                              text-base
                              text-gray-700
                              border border-solid border-gray-300
                              rounded
                              focus:text-gray-700 focus:outline-none"
								type="password"
								placeholder="user given password"
								name="password"
								value={data.password}
								onChange={(event) => handleChange(event)}
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
