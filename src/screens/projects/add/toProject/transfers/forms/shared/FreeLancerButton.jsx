import styles from '../../transfer.module.css'
export const FreelancerButton = ({
	navigate,
	url,
	state,
	serviceType,
	isAvailable
}) => {
	return (
		isAvailable && (
			<button
				className={styles.buttonFreelancer}
				onClick={() =>
					navigate(`/app/freelancer`, {
						state: { url, type: serviceType, state }
					})
				}
			>
				Add{' '}
				{serviceType === 'meetOrDispatch' ? 'MeetGreet' : 'On Board Assistance'}
			</button>
		)
	)
}
