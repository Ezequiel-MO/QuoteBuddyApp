import { FC, ChangeEvent, useEffect, useState } from 'react'
import { filterStyles, transferServicesDecoded } from '../../../../constants'
import { useGetTransfers } from '../../../../hooks'
import { useTransfers } from '../../../../screens/projects/add/toProject/transfers/render/context'

export const TransferServiceFilter: FC = () => {
	const { city, vehicleCapacity, company, service, setService } = useTransfers()
	const { transfers } = useGetTransfers(city, vehicleCapacity, company, service)

	const [options, setOptions] = useState<{ [key: string]: string }[]>([])

	useEffect(() => {
		if (transfers.length > 0) {
			const transfer = transfers[0]
			const keys = Object.keys(transfer).filter(
				(key) =>
					![
						'city',
						'company',
						'_id',
						'vehicleType',
						'vehicleCapacity',
						'selectedService',
						'__v',
						'createdAt',
						'updatedAt'
					].includes(key)
			)
			const options = keys.map((key) => {
				const decodedService = transferServicesDecoded.find(
					(service) => service[key]
				)
				return decodedService || { [key]: key }
			})
			setOptions(options)
		}
	}, [transfers])

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedService = e.target.value
		setService(selectedService)
	}

	return (
		<div className={filterStyles['container']}>
			<div className={filterStyles['innerContainer']}>
				<select
					id="transferService"
					value={service}
					className={filterStyles['select']}
					onChange={handleChange}
					disabled={!city || !company || !vehicleCapacity}
				>
					<option value="">--- Type of Service ---</option>
					{options.map((option, index) => {
						const key = Object.keys(option)[0]
						return (
							<option key={index} value={option[key]}>
								{option[key]}
							</option>
						)
					})}
				</select>
			</div>
		</div>
	)
}
