import { useState, useEffect, useRef } from 'react'
import { ModalComponent } from '../../../../../components/atoms/modal/Modal'
import {
	ModalCancelButton,
	ModalConfirmButton,
	Spinner
} from '../../../../../components/atoms'
import { ImagesMeeting } from './ImagesMeeting'
import { imagesFormData, handleSubmit } from './handlesMeetingImages'
import { MeetingDetailsMasterForm } from './MeetingDetailsMasterForm'
import { useCurrentProject } from '../../../../../hooks'

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
	p: 2,
	overflowY: 'auto'
}

export const AddMeetingsImagesModal = ({ open, setOpen, hotel, dayIndex }) => {
	const fileInput = useRef()
	const { editModalHotel, editModalHotelOvernight } = useCurrentProject()
	const [loading, setLoading] = useState(false)
	const [imagePreviewUrls, setImagePreviewUrls] = useState([])
	const [filesImages, setFilesImages] = useState([])
	const [deletedImage, setDeletedImage] = useState([])
	const [textContent, setTextContent] = useState()
	const [meetingDetails, setMeetingDetails] = useState({
		capacity: '',
		naturalLight: false,
		size: '',
		visibility: ''
	})
	const [screen, setScreen] = useState({})

	useEffect(() => {
		setLoading(true)
		setImagePreviewUrls([])
		setFilesImages([])
		setDeletedImage([])
		if (hotel.meetingImageContentUrl.length > 0) {
			const images = [...hotel.meetingImageContentUrl]
			const imageUrls = images.map((el) => {
				return {
					url: el,
					name: el
				}
			})
			setImagePreviewUrls(imageUrls)
		}
		setMeetingDetails({
			capacity: hotel?.meetingDetails?.capacity ?? '',
			naturalLight: hotel?.meetingDetails?.naturalLight ?? false,
			size: hotel?.meetingDetails?.size ?? '',
			visibility: hotel?.meetingDetails?.visibility ?? ''
		})
		setScreen({ textContent: hotel?.meetingDetails?.generalComments })
		setTimeout(() => {
			setLoading(false)
		}, 800)
	}, [open])

	const handleModalClose = () => {
		setImagePreviewUrls([])
		setFilesImages([])
		setDeletedImage([])
		setLoading(false)
		setOpen(false)
	}

	const handleButtonClose = () => {
		setImagePreviewUrls([])
		setFilesImages([])
		setDeletedImage([])
		setLoading(false)
		setOpen(false)
	}

	const formData = imagesFormData({
		imagePreviewUrls,
		filesImages,
		deletedImage
	})
	const handleConfirm = () =>
		handleSubmit({
			setOpen,
			formData,
			hotel,
			meetingDetails,
			setLoading,
			textContent,
			dayIndex,
			editModalHotel,
			editModalHotelOvernight
		})

	if (loading) {
		return (
			<ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
				<div style={{ marginTop: '200px' }}>
					<Spinner />
				</div>
			</ModalComponent>
		)
	}

	return (
		<ModalComponent
			open={open}
			setOpen={handleModalClose}
			styleModal={styleModal}
		>
			<ModalCancelButton handleClose={handleButtonClose} />
			<div
				style={{ marginTop: '10px' }}
				className="block p-6 rounded-lg shadow-xl bg-white border-t mr-4"
			>
				<h1 className="text-2xl mb-4">{hotel.name}</h1>
				<MeetingDetailsMasterForm
					meetingDetails={meetingDetails}
					setMeetingDetails={setMeetingDetails}
					textContent={textContent}
					setTextContent={setTextContent}
					screen={screen}
				/>
				<ImagesMeeting
					fileInput={fileInput}
					imagePreviewUrls={imagePreviewUrls}
					filesImages={filesImages}
					setImagePreviewUrls={setImagePreviewUrls}
					setFilesImages={setFilesImages}
					deletedImage={deletedImage}
					setDeletedImage={setDeletedImage}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<ModalConfirmButton
					text="Save"
					// style={{ marginTop: 'auto', marginRight: "10px" }}
					handleConfirm={handleConfirm}
				/>
			</div>
		</ModalComponent>
	)
}
