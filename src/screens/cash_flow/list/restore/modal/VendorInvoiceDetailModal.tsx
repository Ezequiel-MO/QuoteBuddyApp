import React, { FC, useState } from 'react'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'
import { Icon } from '@iconify/react'
import { ViewPdfModal } from 'src/components/molecules/ViewPdfModal'
import { formatMoney } from 'src/helper'

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

interface VendorInvoiceDetailModalProps {
	vendorInvoice?: IVendorInvoice
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const VendorInvoiceDetailModal: FC<VendorInvoiceDetailModalProps> = ({
	vendorInvoice,
	open,
	setOpen
}) => {
	const [openModalView, setOpenModalView] = useState(false)

	const handleModalClose = () => {
		setOpen(false)
	}

	if (!vendorInvoice) return null

	return (
		<div role="menuitem">
			<ModalComponent
				open={open}
				setOpen={() => handleModalClose()}
				styleModal={styleModal}
			>
				<ModalCancelButton handleClose={() => handleModalClose()} />
				<h1 className="text-center mb-4 text-4xl">Vendor Invoice Details</h1>

				{/* Datos principales */}
				<div className="grid grid-cols-2 gap-2 text-sm text-white">
					<p>
						<strong>Invoice Number: </strong>
						{vendorInvoice?.invoiceNumber}
					</p>
					<p>
						<strong>Project: </strong>
						{vendorInvoice?.project?.code ?? 'PROJECT DELETED'}
					</p>
					<p>
						<strong>Invoice Date: </strong>
						{vendorInvoice?.invoiceDate}
					</p>
					<p>
						<strong>Due date: </strong>
						{vendorInvoice?.dueDate}
					</p>
					<p>
						<strong>Vendor type: </strong>
						{vendorInvoice?.vendorType}
					</p>
					<p>
						<strong>Vendor: </strong>
						{
						    (vendorInvoice?.vendor as any)?.name ??
							(vendorInvoice?.vendor as any)?.company ??
							(vendorInvoice?.vendor as any)?.email ?? 'VENDOR DELETED'
						}
					</p>
					<p>
						<strong>status: </strong>
						{vendorInvoice?.status}
					</p>
					<p>
						<strong>Invoice amount: </strong>
						{formatMoney(vendorInvoice?.amount)}
					</p>
				</div>

				<div className="relative w-full h-full mt-4">
					{vendorInvoice.pdfInvoice && vendorInvoice.pdfInvoice.length > 0 && (
						<div
							className="flex flex-col items-center justify-center w-full h-full bg-gray-200 rounded-lg cursor-pointer"
							onClick={(e) => {
								e.stopPropagation()
								setOpenModalView(true)
							}}
						>
							<ViewPdfModal
								open={openModalView}
								setOpen={setOpenModalView}
								pdfUrl={vendorInvoice.pdfInvoice[0]}
							/>
							<Icon
								icon="mdi:file-pdf-box"
								color="#d32f2f"
								width={40}
								height={40}
							/>
							<span className="mt-1 text-sm font-semibold text-gray-700">
								VIEW DOCUMENT
							</span>
						</div>
					)}
				</div>
				<button
					type="button"
					className=" bg-blue-400 py-1 mt-1 px-2 rounded-md active:scale-75"
					onClick={() => console.log(vendorInvoice)}
				>
					consola
				</button>
			</ModalComponent>
		</div>
	)
}
