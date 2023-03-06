export const NumberOfVehiclesInput = ({ nrVehicles, setNrVehicles }) => {
	return (
		<div className="flex flex-row justify-start my-1">
			<label className="text-xl text-gray-100 mr-2" htmlFor="nrVehicles">
				Number of Vehicles{' '}
			</label>
			<input
				type="number"
				name="nrVehicles"
				value={nrVehicles}
				onChange={(e) => setNrVehicles(e.target.value)}
				className="py-1 border-0 rounded-xl bg-green-50 text-center cursor-pointer w-20"
			/>
		</div>
	)
}
