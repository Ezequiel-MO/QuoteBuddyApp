import { ModalComponent } from '../../../../components/atoms/modal/Modal'
import {ClientSpecs} from "../../../clients/specs/ClientSpecs"

export const ModalClientForm = ({open,setOpen , dataCompany , setDataCompany}) =>{
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '60%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2
    }

    return(
        <div>
            <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
                <ClientSpecs open={open} setOpen={setOpen} dataCompany={dataCompany} setDataCompany={setDataCompany}/>
            </ModalComponent>
        </div>
    )
}