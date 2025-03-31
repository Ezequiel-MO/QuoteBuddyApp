import { ILocation } from '@interfaces/location'
import React, { FC } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '45%',
	maxHeight: '90vh',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	overflow: 'auto',
	padding: 5
}

interface LocationDetailModalProps {
	location: ILocation
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LocationDetailModal: FC<LocationDetailModalProps> = ({
	location,
	open,
	setOpen
}) => {
	const handleModalClose = () => {
		setOpen(false)
	}

	return (
		<div role="menuitem">
			<ModalComponent
				open={open}
				setOpen={() => handleModalClose()}
				styleModal={styleModal}
			>
				<ModalCancelButton handleClose={() => handleModalClose()} />
				<h1 className="text-center mb-4 text-4xl">
                    Location Details
                </h1>

				{/* Datos principales */}
				<div className="grid grid-cols-2 gap-2 text-sm text-white">
					<p>
						<strong>name: </strong>
						{location.name}
					</p>
					<p>
						<strong>Country: </strong>
						{location.country}
					</p>
				</div>

				{/* Descripción*/}
				<div className={`mt-6 ${!location.textContent && 'opacity-0 h-0'} `}>
					<h3 className="text-md font-semibold mb-2">Description (English)</h3>
					<div className="bg-gray-800 text-white-0 p-4 rounded whitespace-pre-line">
						<div
							dangerouslySetInnerHTML={{
								__html: location.textContent ?? ''
							}}
						></div>
					</div>
				</div>
				<div className="mt-6 mb-8">
					<ul className="flex flex-wrap p-0 list-none rounded-lg shadow-md shadow-gray-900">
						{location.imageContentUrl?.map((el, index) => (
							<li
								key={el}
								className={`relative flex-grow-0 flex-shrink-0 min-w-0 p-2 w-1/4`}
							>
								<div className="relative">
									<img
										src={el}
										key={el}
										className={`rounded-md  h-40 object-cover w-40`}
										loading="lazy"
									/>
								</div>
							</li>
						))}
					</ul>
				</div>
			</ModalComponent>
		</div>
	)
}
