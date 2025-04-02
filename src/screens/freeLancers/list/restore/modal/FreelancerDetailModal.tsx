import { IFreelancer } from '@interfaces/freelancer'
import React, { FC } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'
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

interface FreelancerDetailModalProps {
    freelancer: IFreelancer
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const FreelancerDetailModal: FC<FreelancerDetailModalProps> = ({ freelancer, open, setOpen }) => {

    const handleModalClose = () => {
        setOpen(false)
    }


    return (
        <div role="menuitem">
            <ModalComponent open={open} setOpen={() => handleModalClose()} styleModal={styleModal}>
                <ModalCancelButton handleClose={() => handleModalClose()} />
                <h1 className='text-center mb-4 text-4xl'>
                    Freelancer Details
                </h1>

                {/* Datos principales */}
                <div className="grid grid-cols-2 gap-2 text-sm text-white">
                    <p>
                        <strong>First Name: </strong>
                        {freelancer?.firstName}
                    </p>
                    <p>
                        <strong>Family Name:</strong>
                        {freelancer?.familyName}
                    </p>
                    <p>
                        <strong>Email: </strong>
                        {freelancer?.email}
                    </p>
                    <p>
                        <strong>Phone number: </strong>
                        {freelancer?.phone}
                    </p>
                    <p>
                        <strong>Location: </strong>
                        {freelancer?.city}
                    </p>
                    <p>
                        <strong>Type: </strong>
                        {freelancer?.type}
                    </p>
                    <p>
                        <strong>Half day rate: </strong>
                        {formatMoney(freelancer?.halfDayRate ? freelancer?.halfDayRate : 0)}
                    </p>
                    <p>
                        <strong>Full day rate: </strong>
                        {formatMoney(freelancer?.fullDayRate ? freelancer?.fullDayRate : 0)}
                    </p>
                    <p>
                        <strong>Weekend HD rate: </strong>
                        {formatMoney(freelancer?.weekendHDRate ? freelancer?.weekendHDRate : 0)}
                    </p>
                    <p>
                        <strong>Weekend FD rate: </strong>
                        {formatMoney(freelancer?.weekendFDRate ? freelancer?.weekendFDRate : 0)}
                    </p>
                </div>
            </ModalComponent>
        </div>
    )
}