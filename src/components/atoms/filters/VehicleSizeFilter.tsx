import { useState, useEffect, FC, ChangeEvent } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { filterStyles } from '../../../constants'

interface VehicleSizeFilterProps {
	company: string
	city: string
	vehicleCapacity: string
	setVehicleCapacity: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const VehicleSizeFilter: FC<VehicleSizeFilterProps> = ({
	company,
	city,
	vehicleCapacity,
	setVehicleCapacity
}) => {
	const [options, setOptions] = useState<string[]>([])

	useEffect(() => {
		const getVehicleSizesByCompany = async () => {
			let url = `transfers?company=${company}`
			if (city) {
				url = `transfers?company=${company}&city=${city}`
			}
			try {
				const response = await baseAPI.get(url)
				const vehicleSizes = response.data.data.data.map(
					(transfer: { vehicleCapacity: string }) => transfer.vehicleCapacity
				)
				const uniqueVehicleSizes = Array.from(new Set(vehicleSizes)) as string[]

				setOptions(uniqueVehicleSizes)
			} catch (error) {
				console.log(error)
			}
		}

		if (company) {
			getVehicleSizesByCompany()
		}
	}, [company, city])

	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="vehicleSize"
				value={vehicleCapacity}
				className={filterStyles['select']}
				onChange={setVehicleCapacity}
			>
				<option value="">--- Filter by Vehicle Size ---</option>
				{options.map((vehicleSize) => (
					<option key={vehicleSize} value={vehicleSize}>
						{` --- ${vehicleSize} seater ${
							vehicleSize <= '3'
								? 'Sedan Car'
								: vehicleSize === '6'
								? 'Mini Van'
								: vehicleSize === '20'
								? 'Mini Bus'
								: 'Bus'
						}--- `}
					</option>
				))}
			</select>
		</div>
	)
}
