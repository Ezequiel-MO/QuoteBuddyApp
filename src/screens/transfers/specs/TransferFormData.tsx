import { ITransfer } from 'src/interfaces'

export const TransferFormData = {
    create: (values: ITransfer) => {
        return values
    },
    update: (values: ITransfer) => {
        const jsonData = values
        return jsonData
    },
    updateImageData: (values: any, files: File[]) => {
    }
}