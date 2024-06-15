import React, { FC } from 'react'
import { ModalComponent } from 'src/components/atoms/modal/Modal'
import { CompanySpecs } from "src/screens/companies/specs/CompanySpecs"


interface ModalCollectionFromClientFormProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCollectionFromClientForm: FC<ModalCollectionFromClientFormProps> = ({ open, setOpen}) => {
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
                <div>
                    <h1> Collection From Client Form</h1>
                    <form>

                    </form>
                </div>
            </ModalComponent>
        </div>
    )
}