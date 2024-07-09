import { IPayment } from "src/interfaces/payment"

export const CreateBlankPayment = (): IPayment => {
    return {
        _id: '',
        amount: 0,
        paymentDate: '',
        status: "" as any,
        method: "",
        proofOfPaymentPDF: [],
        update: false,
        createdAt: '',
        updatedAt: ''
    }
}
