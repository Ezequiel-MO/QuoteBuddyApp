import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import baseAPI from 'src/axios/axiosConfig'
import { usePayment } from '../../context/PaymentsProvider'
import { IPayment } from '@interfaces/payment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { errorSweetalert } from 'src/components/atoms/sweetalert/ErrorSweetalert'

const fetchProjectByCode = async (code: string) => {
	try {
		const response = await baseAPI.get(`/projects?code=${code}`)
		return response.data?.data.data?.[0] ?? null
	} catch (error) {
		console.error('Error fetching project:', error)
		return null
	}
}

const mySwal = withReactContent(Swal)

// Utility: Confirm Alert for Sending Payment
const confirmSendPaymentAlert = async (titleAlert: string) =>
	mySwal.fire({
		title: titleAlert,
		text: 'AN EMAIL WILL BE SENT WITH YOUR PAYMENT REQUEST',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'yes',
		cancelButtonText: `Cancel`,
		customClass: { container: 'custom-container' }
	})

// Utility: Confirm Alert for Completed Payment
const confirmSendPaymentCompletedAlert = async (
	firstName: string = 'N/A',
	familyName: string = 'N/A'
) =>
	mySwal.fire({
		title: 'Send email!',
		text: `Proof of payment will be sent to the account manager (${firstName} ${familyName})`,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'yes',
		cancelButtonText: `Cancel`,
		customClass: { container: 'custom-container' }
	})

interface IPaymentValues extends IPayment {
	vendorInvoiceId: string
}

// Form Data Helper for Payment API Requests
const PaymentFormData = {
	create: (values: IPaymentValues, files: File[] = []) => {
		const formData = new FormData()
		formData.set('amount', values.amount.toString())
		formData.set('paymentDate', values.paymentDate)
		formData.set('method', values.method as string)
		formData.set('status', values.status)
		formData.set('vendorInvoiceId', values.vendorInvoiceId)
		files.forEach((file, index) =>
			formData.append(`proofOfPaymentPDF`, file)
		)
		return formData
	},
	update: (values: IPaymentValues) => {
		const jsonData = {} as any
		jsonData.amount = values.amount
		jsonData.method = values.method
		jsonData.paymentDate = values.paymentDate
		jsonData.status = values.status
		jsonData.proofOfPaymentPDF = values.proofOfPaymentPDF
		return jsonData
	},
	updatePdfData: (values: any, files: File[] = []) => {
		const formData = new FormData()
		formData.set('typeImage', 'proofOfPaymentPDF')
		if (values?.imageContentUrl.length > 0) {
			formData.append('imageUrls', values.imageContentUrl)
		}
		if (values?.deletedImage?.length > 0) {
			formData.append('deletedImage', values.deletedImage)
		}
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.set('proofOfPaymentPDF', files[i])
			}
		}
		return formData
	}
}

interface ReturnProps {
	submitFrom: (
		values: any,
		files: File[],
		endpoint: string,
		update: boolean
	) => Promise<void>
	isLoading: boolean
}

export const usePaymentSubmitForm = (payment: IPayment): ReturnProps => {
	const navigate = useNavigate()
	const location = useLocation()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { dispatch, state, setForceRefresh } = usePayment()

	const submitFrom = async (
		values: any,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)
		const loadingToast = toast.loading('please wait!')
		interface AccountManager {
			firstName?: string
			familyName?: string
		}

		try {
			if (!state.vendorInvoice || !state.vendorInvoice.project) {
				throw new Error('Vendor invoice or project data is missing.')
			}

			let accountManager =
				state.vendorInvoice?.project?.accountManager?.[0] || null

			if (!accountManager) {
				const projectCode = state.vendorInvoice?.project?.code
				const updatedProject = projectCode
					? await fetchProjectByCode(projectCode)
					: null
				if (!updatedProject) {
					throw new Error('Project data could not be fetched.')
				}
				state.vendorInvoice.project = updatedProject
				accountManager = updatedProject.accountManager?.[0] || {}
			}
			const { firstName = 'N/A', familyName = 'N/A' } = accountManager

			if (!update) {
				const titleAlert = `Send Email! ${
					state.vendorInvoice?.project?.requiresCashFlowVerification
						? 'This project requires cash flow verification'
						: ''
				}`
				const isConfirm = await confirmSendPaymentAlert(titleAlert)
				if (!isConfirm.isConfirmed) return
				const dataPost = PaymentFormData.create(values, files)
				const response = await baseAPI.post('payments', dataPost)
				dispatch({
					type: 'ADD_PAYMENT_TO_VENDORINVOICE',
					payload: {
						payment: response.data.data.data
					}
				})
			} else if (update && endpoint === 'payments/pdf') {
				const isConfirm = await confirmSendPaymentCompletedAlert(
					firstName,
					familyName
				)
				if (!isConfirm.isConfirmed) {
					return
				}
				const valuesUpdatePdf = PaymentFormData.updatePdfData(values, files)
				const dataPdf = (
					await baseAPI.patch(
						`/payments/pdfPayment/${payment._id}`,
						valuesUpdatePdf
					)
				).data.data.data
				const valuesUpdate = PaymentFormData.update(values)
				valuesUpdate.proofOfPaymentPDF = dataPdf.proofOfPaymentPDF
				valuesUpdate.vendorInvoice = state.vendorInvoice
				const updatedPayment = (
					await baseAPI.patch(`/payments/${payment._id}`, valuesUpdate)
				).data.data.data
				dispatch({
					type: 'UPDATE_PAYMENT_TO_VENDORINVOICE',
					payload: {
						payment: updatedPayment
					}
				})
			} else if (update) {
				const dataUpdate = PaymentFormData.update(values)
				dataUpdate.vendorInvoice = state.vendorInvoice
				const updatedPayment = (
					await baseAPI.patch(`/payments/${payment._id}`, dataUpdate)
				).data.data.data
				dispatch({
					type: 'UPDATE_PAYMENT_TO_VENDORINVOICE',
					payload: {
						payment: updatedPayment
					}
				})
			}
			// Success Notification and Cache Clear
			toast.success(
				!update ? 'Payment Created' : 'Payment Update',
				toastOptions
			)
			await baseAPI.post(`admin/clearCache`)
			setForceRefresh((prev) => prev + 1)
			setTimeout(() => {
				if (location.pathname.includes('specs')) {
					navigate(-1)
				} else {
					navigate('payment')
				}
			}, 800)
		} catch (error: any) {
			console.error('Error:', error)
			errorSweetalert(
				'Error Creating/Updating Payment',
				error.response?.data?.message || 'An unexpected error occurred'
			)
		} finally {
			toast.dismiss(loadingToast)
			setIsLoading(false)
		}
	}
	return { submitFrom, isLoading }
}
