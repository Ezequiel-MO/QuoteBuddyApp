import { FC, ChangeEvent, useEffect, useState } from 'react'
import { filterStyles, transferServicesDecoded } from '../../../../constants'
import { useGetTransfers } from '../../../../hooks'

interface Props {
	city: string
	vehicleCapacity: string
	company: string
	service: string
	setService: (e: ChangeEvent<HTMLSelectElement>) => void
	allServices?: boolean
}

export const TransferServiceFilter: FC<Props> = ({
	city,
	vehicleCapacity,
	company,
	service,
	setService,
	allServices = true
}) => {
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
		setService(e)
	}

	if (!allServices) {
		const servicesKeys = [
			'dispo_4h',
			'dispo_4h_night',
			'one_way_city_transfer',
			'one_way_city_transfer_night',
			'dispo_5h_out',
			'dispo_6h',
			'dispo_6h_night',
			'dispo_9h'
		]
		const optionsFilter = options.filter((el) => {
			const optionKeys = Object.keys(el)
			return optionKeys.some((isKey) => servicesKeys.includes(isKey))
		})
		return (
			<div className={filterStyles['selectContainer']}>
				<select
					id="transferService"
					value={service}
					className={filterStyles['select']}
					onChange={handleChange}
				>
					<option value="">--- Type of Service ---</option>
					{optionsFilter.map((option, index) => {
						const key = Object.keys(option)[0]
						return (
							<option key={index} value={key}>
								{option[key]}
							</option>
						)
					})}
				</select>
			</div>
		)
	}

	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="transferService"
				value={service}
				className={filterStyles['select']}
				onChange={handleChange}
			>
				<option value="">--- Type of Service ---</option>
				{options.map((option, index) => {
					const key = Object.keys(option)[0]
					return (
						<option key={index} value={key}>
							{option[key]}
						</option>
					)
				})}
			</select>
		</div>
	)
}
