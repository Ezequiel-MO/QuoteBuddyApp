import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ITransfer } from "src/interfaces"

interface AlertSwalProps {
    starts: string
    ends: string
    transferEvent: ITransfer[]
}

export const alertSwal = async ({ starts, ends, transferEvent }: AlertSwalProps) => {
    const mySwal = withReactContent(Swal)
    if (!starts) {
        await mySwal.fire({
            title: "ERROR!",
            text: "SELECT A SERVICE STARTS",
            icon: "warning",
            customClass: { container: 'custom-container' }
        })
        return true
    }
    if (!ends) {
        await mySwal.fire({
            title: "ERROR!",
            text: "SELECT A SERVICE ENDS",
            icon: "warning",
            customClass: { container: 'custom-container' }
        })
        return true
    }
    if (transferEvent.length === 0) {
        await mySwal.fire({
            title: "ERROR!",
            text: "ADD A TRANSFER",
            icon: "warning",
            customClass: { container: 'custom-container' }
        })
        return true
    }
    return false
}