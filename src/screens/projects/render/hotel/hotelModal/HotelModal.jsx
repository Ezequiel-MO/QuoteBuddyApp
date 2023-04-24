import { useState } from 'react'
import { Icon } from '@iconify/react'
import { ModalComponent } from '../../../../../components/atoms/Modal'
import { TableModalHotel } from './TableModalHotel'
import { ImagesModalHotel } from './ImagesModalHotel'
import { RichTextEditor } from '../../../../../ui'
import { useCurrentProject } from '../../../../../hooks'
import { validateUpdate, validateUpdateTextContent } from './helperHotelModal'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styles from '../../DayEvents.module.css'

export const HotelModal = ({ open, setOpen, hotel }) => {
	if (!hotel) {
		return null
	}

	const mySwal = withReactContent(Swal)

	const { editModalHotel } = useCurrentProject()
	const [textContent, setTextContent] = useState()
	const [data, setData] = useState({})
	const [isChecked, setIsChecked] = useState()

	const styleModal = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '80%',
		height: '90%',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 2
	}

	const modalClose = () => {
		setOpen(false)
		setTextContent(hotel?.textContent)
	}

	const handleConfirm = () => {
		mySwal
			.fire({
				title: 'Do you want to modify the data?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'yes',
				cancelButtonText: `Cancel`,
				customClass: { container: 'custom-container' }
			})
			.then((res) => {
				if (res.isConfirmed) {
					editModalHotel({
						pricesEdit: data,
						id: hotel._id,
						textContentEdit: textContent
					})
					mySwal.fire({
						title: 'Succes',
						icon: 'success',
						confirmButtonText: 'continue',
						customClass: { container: 'custom-container' }
					})
					setOpen(false)
				}
			})
	}

	const handleClose = () => {
		const validateIsChecked = validateUpdate(isChecked)
		const originalTextContent = hotel.textContent?.replace(/&lt;/g, '<')?.replace(/&gt;/g, '>')
		const validateChangedTextContent = validateUpdateTextContent(originalTextContent, textContent)
		if (validateIsChecked || validateChangedTextContent) {
			mySwal
				.fire({
					title: 'There is modified data',
					text: 'Are you sure you want to exit? Your data will be lost',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'yes',
					cancelButtonText: `Cancel`,
					customClass: { container: 'custom-container' }
				})
				.then((res) => {
					if (res.isConfirmed) {
						setOpen(false)
					}
				})
		} else {
			setTextContent(hotel?.textContent)
			setOpen(false)
		}
	}

	const update = Object.keys(hotel).length > 0

	return (
		<div>
			<ModalComponent open={open} setOpen={modalClose} styleModal={styleModal}>
				<button className={styles.buttonCancel} onClick={() => handleClose()}>
					<Icon icon="material-symbols:cancel" width="30" />
				</button>

				<div className="container w-3/4 flex flex-col bord">
					<TableModalHotel
						hotel={hotel}
						data={data}
						setData={setData}
						isChecked={isChecked}
						setIsChecked={setIsChecked}
					/>
					<div style={{ marginTop: '10px' }}>
						<RichTextEditor
							style={{}}
							setTextContent={setTextContent}
							textContent={textContent}
							screen={hotel}
							update={update}
						/>
					</div>
					<ImagesModalHotel hotel={hotel} />
				</div>

				<button
					className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-slate-900 text-white-0 hover:text-white-0 fonrt-bold uppercase rounded-lg"
					style={{
						position: 'absolute',
						bottom: '20px',
						right: '10px'
					}}
					onClick={() => handleConfirm()}
				>
					Save Edit
				</button>
			</ModalComponent>
		</div>
	)
}
