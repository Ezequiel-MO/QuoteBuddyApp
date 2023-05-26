import styles from '../../transfer.module.css'
export const FreelancerButton = ({
	navigate,
	url,
	state,
	type,
	isAvailable
}) => {
	return (
		isAvailable && (
			<button
				className={styles.buttonFreelancer}
				onClick={() =>
					navigate(`/app/freelancer`, { state: { url, type, state } })
				}
			>
				Add {type === 'meetOrDispatch' ? 'MeetGreet' : 'On Board Assistance'}
			</button>
		)
	)
}
