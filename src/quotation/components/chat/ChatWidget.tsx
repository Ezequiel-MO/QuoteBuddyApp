import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useApiPost } from 'src/hooks/useApiPost'
import { useCurrentProject } from 'src/hooks'
import { IProject } from '@interfaces/project'
import { useBreakpoint } from '../../hooks/useMediaQuery'

// Message interface
interface Message {
	id: string
	sender: 'user' | 'bot'
	content: string
	timestamp: Date
}

// API response structure
interface ApiResponse {
	status: string
	data: {
		data: {
			projectId: string
			question: string
			answer: string
			source: string
			referencedEntities: {
				hotels: any[]
				restaurants: any[]
				activities: any[]
				entertainments: any[]
				gifts: any[]
			}
			_id: string
			createdAt: string
			updatedAt: string
		}
	}
}

const ChatWidget: React.FC = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const [isOpen, setIsOpen] = useState(false)
	const [message, setMessage] = useState('')
	const [chatHistory, setChatHistory] = useState<Message[]>([])
	const { isMobile } = useBreakpoint()

	// Get post method from custom hook
	const { post, isLoading } = useApiPost<ApiResponse>(
		`/projects/${currentProject?._id}/qa`
	)

	// Refs for auto-scrolling and animation
	const chatEndRef = useRef<HTMLDivElement>(null)
	const widgetRef = useRef<HTMLDivElement>(null)

	// Handle toggling the chat widget
	const toggleChat = () => {
		setIsOpen(!isOpen)
	}

	// Auto-scroll to bottom when chat updates
	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [chatHistory, isLoading])

	// Click outside to close
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				widgetRef.current &&
				!widgetRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	// Handle message submission
	const handleSendMessage = async () => {
		const trimmedMessage = message.trim()
		if (!trimmedMessage) return

		// Generate a unique ID for this message
		const newMessageId = `msg-${Date.now()}`

		// Add user message to chat history
		const userMessage: Message = {
			id: newMessageId,
			sender: 'user',
			content: trimmedMessage,
			timestamp: new Date()
		}

		setChatHistory((prev) => [...prev, userMessage])
		setMessage('')

		try {
			// Send to API
			const response = await post({ question: trimmedMessage })

			if (response?.data?.data?.answer) {
				const botMessage: Message = {
					id: `resp-${Date.now()}`,
					sender: 'bot',
					content: response.data.data.answer,
					timestamp: new Date()
				}

				setChatHistory((prev) => [...prev, botMessage])
			} else {
				// Fallback response
				const errorMessage: Message = {
					id: `err-${Date.now()}`,
					sender: 'bot',
					content:
						"I couldn't find a specific answer to that. Can you try rephrasing your question?",
					timestamp: new Date()
				}

				setChatHistory((prev) => [...prev, errorMessage])
			}
		} catch (error) {
			console.error('Error sending message:', error)

			// Error response
			const errorMessage: Message = {
				id: `err-${Date.now()}`,
				sender: 'bot',
				content:
					'Sorry, I encountered an error processing your request. Please try again later.',
				timestamp: new Date()
			}

			setChatHistory((prev) => [...prev, errorMessage])
		}
	}

	// Handle keyboard shortcuts
	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	// Format timestamp to display time
	const formatTimestamp = (date: Date) => {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	return (
		<div
			ref={widgetRef}
			className={`
        fixed z-50 transition-all duration-300 ease-in-out
        ${isMobile ? 'inset-x-0 bottom-0' : 'bottom-6 right-6'}
      `}
		>
			{isOpen ? (
				<div
					className={`
            ${
							isMobile
								? 'w-full h-[70vh] rounded-t-xl'
								: 'w-96 h-[500px] rounded-xl'
						}
            bg-white-0 dark:bg-gray-800 shadow-2xl flex flex-col overflow-hidden
            border border-gray-200 dark:border-gray-700
          `}
				>
					{/* Header */}
					<div className="px-4 py-3 bg-cyan-500 text-white-0 border-b border-cyan-600 flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Icon icon="mdi:message-text" width="20" height="20" />
							<h3 className="font-medium">Project Assistant</h3>
						</div>
						<button
							onClick={toggleChat}
							className="p-1 hover:bg-cyan-600 rounded-full transition-colors"
							aria-label="Close chat"
						>
							<Icon icon="mdi:close" width="20" height="20" />
						</button>
					</div>

					{/* Chat history */}
					<div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
						{chatHistory.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-full text-center px-4">
								<Icon
									icon="mdi:message-question"
									className="text-gray-400 mb-4"
									width="48"
									height="48"
								/>
								<h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
									Ask me anything about this project
								</h4>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									I can help with details about the hotels, schedule,
									activities, and budget.
								</p>
								<div className="mt-4 space-y-2 w-full">
									{[
										'When is check-in time?',
										'What activities are planned?',
										"What's the budget breakdown?"
									].map((suggestion) => (
										<button
											key={suggestion}
											className="w-full px-3 py-2 text-left text-sm bg-white-0 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
											onClick={() => {
												setMessage(suggestion)
												setTimeout(() => {
													handleSendMessage()
												}, 100)
											}}
										>
											{suggestion}
										</button>
									))}
								</div>
							</div>
						) : (
							<div className="space-y-3">
								{chatHistory.map((msg) => (
									<div
										key={msg.id}
										className={`
                      flex ${
												msg.sender === 'user' ? 'justify-end' : 'justify-start'
											}
                      animate-fadeIn
                    `}
									>
										<div
											className={`
                        max-w-xs lg:max-w-sm px-4 py-2 rounded-lg 
                        ${
													msg.sender === 'user'
														? 'bg-cyan-500 text-white-0 rounded-br-none'
														: 'bg-white-0 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700'
												}
                      `}
										>
											<div className="text-sm whitespace-pre-wrap">
												{msg.content}
											</div>
											<div
												className={`
                          text-xs mt-1 opacity-75 
                          ${
														msg.sender === 'user'
															? 'text-cyan-100'
															: 'text-gray-500 dark:text-gray-400'
													}
                        `}
											>
												{formatTimestamp(msg.timestamp)}
											</div>
										</div>
									</div>
								))}

								{isLoading && (
									<div className="flex justify-start">
										<div className="max-w-xs lg:max-w-sm px-4 py-3 rounded-lg bg-white-0 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700">
											<div className="flex items-center space-x-2">
												<div
													className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
													style={{ animationDelay: '0ms' }}
												/>
												<div
													className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
													style={{ animationDelay: '300ms' }}
												/>
												<div
													className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
													style={{ animationDelay: '600ms' }}
												/>
											</div>
										</div>
									</div>
								)}

								{/* Scroll anchor */}
								<div ref={chatEndRef} />
							</div>
						)}
					</div>

					{/* Input area */}
					<div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white-0 dark:bg-gray-800">
						<div className="flex items-end space-x-2">
							<textarea
								className="flex-1 min-h-[40px] max-h-32 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white-0 dark:bg-gray-700 text-gray-800 dark:text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
								placeholder="Type your question..."
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								onKeyDown={handleKeyPress}
								disabled={isLoading}
								rows={1}
							/>
							<button
								onClick={handleSendMessage}
								disabled={isLoading || !message.trim()}
								className="p-2 bg-cyan-500 text-white-0 rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								aria-label="Send message"
							>
								<Icon icon="mdi:send" width="20" height="20" />
							</button>
						</div>
					</div>
				</div>
			) : (
				<button
					onClick={toggleChat}
					className="p-4 bg-cyan-500 hover:bg-cyan-600 text-white-0 rounded-full shadow-lg transition-colors"
					aria-label="Open chat"
				>
					<Icon icon="mdi:message-text" width="24" height="24" />
				</button>
			)}
		</div>
	)
}

export default ChatWidget
