import { FC } from 'react'
import { ModalComponent } from '../../../../components/atoms/modal/Modal'
import { ClientSpecs } from "../../../clients/specs/ClientSpecs"
import { IClientCompany } from "src/interfaces/clientCompany"


interface ModalClientFormProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    dataCompany: IClientCompany
    setDataCompany: React.Dispatch<React.SetStateAction<any>>
}

export const ModalClientForm: FC<ModalClientFormProps> = ({ open, setOpen, dataCompany, setDataCompany }) => {
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
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
                <ClientSpecs open={open} setOpen={setOpen} dataCompany={dataCompany} setDataCompany={setDataCompany} />
            </ModalComponent>
        </div>
    )
}