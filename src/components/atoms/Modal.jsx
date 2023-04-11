import { Modal, Box } from '@mui/material'
export const ModalComponent = ({ open, setOpen, children }) => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'auto',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 2
	}
	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)}>
				<Box sx={style} style={{ paddingRight: '0px' }}>
					{children}
				</Box>
			</Modal>
		</>
	)
}
