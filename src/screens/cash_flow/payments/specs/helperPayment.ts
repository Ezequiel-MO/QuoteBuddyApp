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
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import {
	createPayment,
	updatePayment,
	updatePaymentPdf
} from '@services/paymentService'

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

interface IJsonDataUpdate extends IPayment {
	vendorInvoice: Partial<IVendorInvoice>
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
		files.forEach((file) => formData.append(`proofOfPaymentPDF`, file))
		return formData
	},
	update: (values: IPaymentValues) => {
		const jsonData = {} as IJsonDataUpdate
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
		if (values?.imageContentUrl?.length > 0) {
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

	const ensureProjectManager = async () => {
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
		return { firstName, familyName }
	}

	const handleUpdateFlow = async (
		paymentValues: any,
		files: File[],
		firstName: string,
		familyName: string
	) => {
		if (files.length > 0) {
			const isConfirm = await confirmSendPaymentCompletedAlert(
				firstName,
				familyName
			)
			if (!isConfirm.isConfirmed) return

			// 1) Update PDF
			const valuesUpdatePdf = PaymentFormData.updatePdfData(
				paymentValues,
				files
			)
			const dataPdf = await updatePaymentPdf(payment._id, valuesUpdatePdf)

			// 2) Update Payment with new PDF

			const valuesUpdate = PaymentFormData.update(paymentValues)
			valuesUpdate.proofOfPaymentPDF = dataPdf.proofOfPaymentPDF
			valuesUpdate.vendorInvoice = state.vendorInvoice || {}
		} else {
		}
	}

	const submitFrom = async (
		values: any,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)
		const loadingToast = toast.loading('please wait!')

		try {
			const { firstName, familyName } = await ensureProjectManager()
			if (update) {
				await handleUpdateFlow(values, files, firstName, familyName)
			}

			if (!update) {
				const titleAlert = `Send Email! ${
					state.vendorInvoice?.project?.requiresCashFlowVerification
						? 'This project requires cash flow verification'
						: ''
				}`
				const isConfirm = await confirmSendPaymentAlert(titleAlert)
				if (!isConfirm.isConfirmed) return
				const dataPost = PaymentFormData.create(values, files)
				const paymentResponse = await createPayment(dataPost)
				dispatch({
					type: 'ADD_PAYMENT_TO_VENDORINVOICE',
					payload: {
						payment: paymentResponse
					}
				})
			}
			if (update && files.length > 0) {
				const isConfirm = await confirmSendPaymentCompletedAlert(
					firstName,
					familyName
				)
				if (!isConfirm.isConfirmed) return
				const valuesUpdatePdf = PaymentFormData.updatePdfData(values, files)
				const dataPdf = await updatePaymentPdf(payment._id, valuesUpdatePdf)
				const valuesUpdate = PaymentFormData.update(values)
				valuesUpdate.proofOfPaymentPDF = dataPdf.proofOfPaymentPDF
				valuesUpdate.vendorInvoice = state.vendorInvoice || {}

				const updatedPayment = await updatePayment(payment._id, valuesUpdate)

				dispatch({
					type: 'UPDATE_PAYMENT_TO_VENDORINVOICE',
					payload: {
						payment: updatedPayment
					}
				})
			} else if (update) {
				const dataUpdate = PaymentFormData.update(values)
				dataUpdate.vendorInvoice = state.vendorInvoice || {}
				const updatedPayment = await updatePayment(payment._id, dataUpdate)

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
