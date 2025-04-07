import { IProject } from '@interfaces/project'
import React, { FC, useState } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'
import { formatMoney } from 'src/helper'
import { Icon } from '@iconify/react'
import { ViewPdfModal } from 'src/components/molecules/ViewPdfModal'

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

interface ProjectDetailModalProps {
    project: IProject
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProjectDetailModal: FC<ProjectDetailModalProps> = ({
    project,
    open,
    setOpen
}) => {
    const [openModalView, setOpenModalView] = useState(false)

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
                    Project Details
                </h1>

                {/* Datos principales */}
                <div className="grid grid-cols-3 gap-2 text-sm text-white">
                    <p>
                        <strong>Project Code: </strong>
                        {project?.code}
                    </p>
                    <p>
                        <strong>Nr.Participants: </strong>
                        {project?.nrPax}
                    </p>
                    <p>
                        <strong>Estimated Turnover: </strong>
                        {formatMoney(project?.estimate ? project?.estimate : 0)}

                    </p>
                    <p>
                        <strong>Arrival Date: </strong>
                        {project?.arrivalDay}
                    </p>
                    <p>
                        <strong>Departure Date: </strong>
                        {project?.departureDay}
                    </p>
                    <p>
                        <strong>Group Name: </strong>
                        {project?.groupName}
                    </p>
                    <p>
                        <strong>Nr.Participants: </strong>
                        {project?.nrPax}
                    </p>
                    <p>
                        <strong>Location: </strong>
                        {project?.groupLocation}
                    </p>
                    <p>
                        <strong>Multi Destination: </strong>
                        {project?.multiDestination ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Side Menu: </strong>
                        {project?.hasSideMenu ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Corporate Image: </strong>
                        {project?.hasExternalCorporateImage ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Supplementary Text: </strong>
                        {project?.suplementaryText ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Hide Dates: </strong>
                        {project?.hideDates ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Account Manager: </strong>
                        {project?.accountManager[0]?.email}
                    </p>
                    <p>
                        <strong>Company: </strong>
                        {project?.clientCompany[0]?.name}
                    </p>
                    <p>
                        <strong>Client: </strong>
                        {`${project?.clientAccManager[0]?.firstName} ${project?.clientAccManager[0]?.familyName} `}
                    </p>
                    <p>
                        <strong>Project Type: </strong>
                        {project?.requiresCashFlowVerification ? 'Cash Flow Verification' : 'No Cash Flow Verification'}
                    </p>
                    <p>
                        <strong>Project Status: </strong>
                        {project?.status}
                    </p>
                    <p>
                        <strong>Language Vendor Descriptions: </strong>
                        {project?.languageVendorDescriptions}
                    </p>
                    <p>
                        <strong>Budget: </strong>
                        {project?.budget}
                    </p>
                </div>

                <div className="relative w-full h-full mt-4">
                    {
                        project.imageContentUrl && project.imageContentUrl.length > 0 &&
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
                                pdfUrl={project.imageContentUrl[0]}
                            />
                            <Icon
                                icon="mdi:file-pdf-box"
                                color="#d32f2f"
                                width={40}
                                height={40}
                            />
                            <span className="mt-1 text-sm font-semibold text-gray-700">
                                VIEW  DOCUMENT
                            </span>
                        </div>
                    }
                </div>

            </ModalComponent>
        </div>
    )
}