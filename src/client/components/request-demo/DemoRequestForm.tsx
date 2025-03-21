import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

interface DemoRequestFormProps {
	onSubmit: (data: { email: string; explanation: string }) => Promise<void>
}

const DemoRequestForm: React.FC<DemoRequestFormProps> = ({ onSubmit }) => {
	// Form state
	const [email, setEmail] = useState('')
	const [explanation, setExplanation] = useState('')

	// Validation state
	const [emailError, setEmailError] = useState('')
	const [explanationError, setExplanationError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState('')
	const [submitSuccess, setSubmitSuccess] = useState(false)

	// Validate email with regex
	const validateEmail = (email: string): boolean => {
		const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return re.test(email)
	}

	// Validate form fields
	const validateForm = (): boolean => {
		let isValid = true

		// Email validation
		if (!email.trim()) {
			setEmailError('Email is required')
			isValid = false
		} else if (!validateEmail(email)) {
			setEmailError('Please enter a valid email address')
			isValid = false
		} else {
			setEmailError('')
		}

		// Explanation validation
		if (!explanation.trim()) {
			setExplanationError('Please provide a brief explanation')
			isValid = false
		} else if (explanation.length < 10) {
			setExplanationError('Explanation should be at least 10 characters long')
			isValid = false
		} else {
			setExplanationError('')
		}

		return isValid
	}

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Reset error states
		setSubmitError('')

		// Validate form
		if (!validateForm()) {
			return
		}

		try {
			setIsSubmitting(true)
			await onSubmit({ email, explanation })
			setSubmitSuccess(true)
			// Reset form
			setEmail('')
			setExplanation('')
		} catch (error) {
			setSubmitError(
				'There was an error submitting your request. Please try again.'
			)
			console.error('Demo request submission error:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div>
			{submitSuccess ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center"
				>
					<div className="mb-6 flex justify-center">
						<div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
							<Icon
								icon="mdi:check-circle"
								className="text-green-600 dark:text-green-400 w-16 h-16"
							/>
						</div>
					</div>
					<h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
						Thank you for your interest!
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Your request has been submitted successfully. We'll be in touch with
						you soon.
					</p>
					<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
						<p className="text-sm text-blue-700 dark:text-blue-300 flex items-start">
							<Icon
								icon="mdi:information"
								className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
							/>
							<span>
								A confirmation has been sent to your email address. Please check
								your inbox.
							</span>
						</p>
					</div>
				</motion.div>
			) : (
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="mb-6">
						<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
							<p className="text-sm text-blue-700 dark:text-blue-300">
								Please fill out the form below to request a demo of QUOTE/Buddy
								for your business. Both fields are required.
							</p>
						</div>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>
							Email Address <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Icon
									icon="mdi:email-outline"
									className="h-5 w-5 text-gray-400"
								/>
							</div>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={`pl-10 w-full px-4 py-2 border ${
									emailError
										? 'border-red-500 dark:border-red-400'
										: 'border-gray-300 dark:border-gray-600'
								} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white`}
								placeholder="your@email.com"
								required
								aria-describedby={emailError ? 'email-error' : undefined}
							/>
						</div>
						{emailError && (
							<p
								id="email-error"
								className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"
							>
								<Icon icon="mdi:alert-circle" className="w-4 h-4 mr-1" />
								{emailError}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="explanation"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>
							Tell us about your needs <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<textarea
								id="explanation"
								name="explanation"
								value={explanation}
								onChange={(e) => setExplanation(e.target.value)}
								rows={4}
								className={`w-full px-4 py-2 border ${
									explanationError
										? 'border-red-500 dark:border-red-400'
										: 'border-gray-300 dark:border-gray-600'
								} rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white`}
								placeholder="Tell us about your business and how you'd like to use QUOTE/Buddy..."
								required
								aria-describedby={
									explanationError ? 'explanation-error' : undefined
								}
							/>
							<div className="absolute bottom-2 right-2 text-xs text-gray-400">
								{explanation.length} characters
							</div>
						</div>
						{explanationError && (
							<p
								id="explanation-error"
								className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center"
							>
								<Icon icon="mdi:alert-circle" className="w-4 h-4 mr-1" />
								{explanationError}
							</p>
						)}
					</div>

					{submitError && (
						<div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md">
							<p className="flex items-center">
								<Icon icon="mdi:alert-circle" className="mr-2 flex-shrink-0" />
								{submitError}
							</p>
						</div>
					)}

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={isSubmitting}
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? (
								<>
									<Icon icon="mdi:loading" className="animate-spin mr-2" />
									Submitting...
								</>
							) : (
								<>
									<Icon icon="mdi:send" className="mr-2" />
									Submit Request
								</>
							)}
						</button>
					</div>
				</form>
			)}
		</div>
	)
}

export default DemoRequestForm
