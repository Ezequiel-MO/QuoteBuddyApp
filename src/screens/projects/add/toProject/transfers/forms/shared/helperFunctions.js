export const createTransferObject = (
	type,
	idCompany,
	company,
	vehicleCapacity,
	nrVehicles,
	transfers,
	transferPrice
) => {
	const from = type === 'in' ? 'From Airport' : 'From Hotel'
	const transferType = type === 'in' ? 'Transfer in' : 'Transfer out'
	const total = Number(nrVehicles) * transferPrice
	const transfer = type === 'in' ? 'transfer_in' : 'transfer_out'
	const vehicleType = transfers[0].vehicleType
	return {
		from,
		type: transferType,
		units: nrVehicles,
		total,
		idCompany,
		company,
		vehicleCapacity,
		nrVehicles,
		[transfer]: total,
		vehicleType
	}
}

export const createExtraLinesObject = (
	type,
	idCompany,
	company,
	units,
	totalCost
) => {
	return {
		units,
		type,
		total: totalCost,
		idCompany,
		company,
		[type.toLowerCase()]: units,
		[`${type.toLowerCase()}Cost`]: totalCost
	}
}
