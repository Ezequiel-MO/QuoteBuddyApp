import React, { FC } from 'react'
import { ModalComponent } from 'src/components/atoms/modal/Modal'
import { CompanySpecs } from "src/screens/companies/specs/CompanySpecs"


interface ModalCompanyFormProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setData: React.Dispatch<React.SetStateAction<any>>
}

export const ModalCompanyForm: FC<ModalCompanyFormProps> = ({ open, setOpen, setData }) => {
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

    return (
        <div>
            <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
                <CompanySpecs
                    open={open}
                    setOpen={setOpen}
                    setDataClient={setData}
                />
            </ModalComponent>
        </div>
    )
}