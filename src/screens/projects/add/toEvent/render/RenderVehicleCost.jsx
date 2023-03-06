import accounting from 'accounting'

export const RenderVehicleCost = ({
	nrVehicles,
	vehicleCapacity,
	selectedServicePrice
}) => {
	return (
		<p className="text-white-100 text-xl text-center">
			{`${nrVehicles}  x ${vehicleCapacity} seater vehicle(s)
      `}
			<span className="ml-2">
				@ unit cost of {accounting.formatMoney(selectedServicePrice, '€')}
			</span>
			<span className="mx-2 font-bold">
				TOTAL {accounting.formatMoney(nrVehicles * selectedServicePrice, '€')}
			</span>
		</p>
	)
}
