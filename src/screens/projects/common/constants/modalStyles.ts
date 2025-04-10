// styles.ts
export const modalContainerStyle = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '85%',
	height: '90%',
	maxWidth: '1200px',
	backgroundColor: 'transparent',
	boxShadow: 'none',
	padding: 0,
	margin: 0,
	overflow: 'hidden',
	outline: 'none',
	border: 'none'
}

export const motionVariants = {
	initial: { opacity: 0, scale: 0.9 },
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.9 }
}
