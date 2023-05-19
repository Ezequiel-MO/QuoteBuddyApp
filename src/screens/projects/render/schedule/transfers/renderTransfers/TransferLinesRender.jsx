import { Icon } from '@iconify/react'
import styles from './transferLinesRender.module.css'
import { CardAdd } from '../../../../../../components/atoms'

export const TransferLinesRender = ({
	transfersType,
	handleDeleteTransfer,
	type
}) => {
	const from = type === 'transfer_in' ? 'Airport' : 'Hotel'
	const meetOrDispatch =
		type === 'transfer_in' ? 'Meet&Greet' : 'Group Dispatch'

	const name = type === 'transfer_in' ? 'Transfers In' : 'Transfers Out'
	const route =
		type === 'transfer_in'
			? 'project/schedule/transfers_in'
			: 'project/schedule/transfers_out'

	return (
		<>
			<div style={{ marginTop: '10px' }}>
				<h1> Transfer to {from} </h1>
				{transfersType?.map((element, index) => (
					<div key={index}>
						<div className={styles.card}>
							<div>{element.company} </div>
							<div>
								{`${
									element.nrVehicles || element.meetGreet || element.assistance
								} UNITS`}
							</div>
							<div>
								{element.vehicleType ||
									(element.meetGreet > 0 && meetOrDispatch) ||
									(element.assistance > 0 && 'assistance')}
							</div>
							{transfersType.length - 1 === index && (
								<span
									className={styles.icon}
									onClick={() => handleDeleteTransfer(type)}
								>
									<Icon icon="lucide:delete" color="#ea5933" />
								</span>
							)}
						</div>
					</div>
				))}
			</div>
			<CardAdd
				name={name}
				route={route}
				timeOfEvent="transfer_in"
				dayOfEvent={0}
			/>
		</>
	)
}
