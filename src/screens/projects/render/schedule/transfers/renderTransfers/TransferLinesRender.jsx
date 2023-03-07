import { Icon } from '@iconify/react'
import styles from './transferLinesRender.module.css'

export const TransferLinesRender = ({
	transfersType,
	handleDeleteTransfer,
	type
}) => {
	// console.log(transfersType)
	const from = type === 'transfer_in' ? 'Airport' : 'Hotel'
	const meetOrDispatch =
		type === 'transfer_in' ? 'Meet&Greet' : 'Group Dispatch'
	return (
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
	)
}
