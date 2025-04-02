import { IClientCompany } from '@interfaces/clientCompany'
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

interface CompanyDetailModalProps {
    clientCompany: IClientCompany
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CompanyDetailModal: FC<CompanyDetailModalProps> = ({ clientCompany, open, setOpen }) => {

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
                    Company Details
                </h1>
                <hr />
                {/* Datos principales */}
                <div className="grid grid-cols-2 gap-2 text-sm text-white">
                    <p>
                        <strong>Name: </strong>
                        {clientCompany?.name}
                    </p>
                    <p>
                        <strong>Address: </strong>
                        {clientCompany?.address}
                    </p>
                    <p>
                        <strong>Post Code: </strong>
                        {clientCompany?.postCode}
                    </p>
                    <p>
                        <strong>VAT number: </strong>
                        {clientCompany?.VATNr}
                    </p>
                    <p>
                        <strong>Country: </strong>
                        {clientCompany?.country}
                    </p>
                    <p>
                        <strong>Employees: </strong>
                        {
                            clientCompany.employees && clientCompany.employees.map((employee , index) => (
                                `${employee.firstName} ${employee.familyName}`
                            )).join(', ')

                        }
                    </p>
                </div>
            </ModalComponent>
        </div>
    )
}