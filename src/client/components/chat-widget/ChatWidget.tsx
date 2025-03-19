import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import AnimateRobot from './AnimateRobot'
import { useApiPost } from 'src/hooks/useApiPost'
import { useCurrentProject } from 'src/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { useDarkMode } from 'src/hooks'

// Define message structure
interface Message {
	id: string
	sender: 'user' | 'bot'
	content: string
	timestamp: Date
	status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error'
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

// Sample quick reply suggestions
const QUICK_REPLIES = [
	'Tell me about our hotel options',
	'What activities are planned?',
	'Show me the schedule',
	'What restaurants are we visiting?',
	'When is the departure?'
]

const ChatWidget = () => {
	const [isDarkMode] = useDarkMode()
	const { currentProject } = useCurrentProject()
	const [isOpen, setIsOpen] = useState(false)
	const [message, setMessage] = useState('')
	const [chatHistory, setChatHistory] = useState<Message[]>([])
	const [showQuickReplies, setShowQuickReplies] = useState(true)
	const [isTyping, setIsTyping] = useState(false)
	const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(
		null
	)
	const [unreadCount, setUnreadCount] = useState(0)

	// Set up animation state
	const [chatEntryComplete, setChatEntryComplete] = useState(false)

	// Refs
	const chatEndRef = useRef<HTMLDivElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	// API hook
	const { post, isLoading, error } = useApiPost<ApiResponse>(
		`/projects/${currentProject?._id}/qa`
	)

	// Format timestamps
	const formatTimestamp = (date: Date) => {
		const hours = date.getHours().toString().padStart(2, '0')
		const minutes = date.getMinutes().toString().padStart(2, '0')
		return `${hours}:${minutes}`
	}

	// Generate unique ID for messages
	const generateId = () =>
		`msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

	// Toggle chat open/closed
	const toggleChat = () => {
		setIsOpen(!isOpen)
		if (!isOpen) {
			setUnreadCount(0) // Clear unread count when opening
		}
	}

	// Handle input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value)
	}

	// Handle quick reply selection
	const handleQuickReplyClick = (reply: string) => {
		setMessage(reply)
		setShowQuickReplies(false)
		setSelectedSuggestion(null)
		// Focus the textarea
		if (textareaRef.current) {
			textareaRef.current.focus()
		}
	}

	// Handle sending messages
	const handleSendMessage = async () => {
		const trimmedMessage = message.trim()
		if (!trimmedMessage) return

		// Create new user message
		const userMessage: Message = {
			id: generateId(),
			sender: 'user',
			content: trimmedMessage,
			timestamp: new Date(),
			status: 'sending'
		}

		// Add to chat history
		setChatHistory((prevHistory) => [...prevHistory, userMessage])
		setMessage('')
		setShowQuickReplies(false) // Hide quick replies when user sends a message
		setIsTyping(true) // Show typing indicator

		try {
			// Update status to sent
			setChatHistory((prev) =>
				prev.map((msg) =>
					msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
				)
			)

			// Make API request
			const response = await post({ question: trimmedMessage })

			// Handle successful response
			if (response?.data?.data?.answer) {
				// Show typing indicator for a bit to simulate natural typing speed
				setTimeout(() => {
					setChatHistory((prev) =>
						prev.map((msg) =>
							msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
						)
					)

					// Add bot response after a short delay
					const botResponse: Message = {
						id: generateId(),
						sender: 'bot',
						content: response.data.data.answer,
						timestamp: new Date()
					}

					setChatHistory((prevHistory) => [...prevHistory, botResponse])
					setIsTyping(false)

					if (!isOpen) {
						setUnreadCount((prev) => prev + 1)
					}
				}, 1000)
			} else {
				// Handle empty response
				setTimeout(() => {
					const errorResponse: Message = {
						id: generateId(),
						sender: 'bot',
						content:
							"I couldn't find information about that. Is there something else I can help with?",
						timestamp: new Date()
					}
					setChatHistory((prevHistory) => [...prevHistory, errorResponse])
					setIsTyping(false)
				}, 1000)
			}
		} catch (err) {
			console.error('Error in chat request:', err)

			// Update message status to error
			setChatHistory((prev) =>
				prev.map((msg) =>
					msg.id === userMessage.id ? { ...msg, status: 'error' } : msg
				)
			)

			// Add error response after a short delay
			setTimeout(() => {
				const errorResponse: Message = {
					id: generateId(),
					sender: 'bot',
					content:
						'Sorry, there was an error processing your request. Please try again later.',
					timestamp: new Date()
				}
				setChatHistory((prevHistory) => [...prevHistory, errorResponse])
				setIsTyping(false)
			}, 800)
		}
	}

	// Handle Enter key to send message
	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	// Auto-resize textarea as user types
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height =
				Math.min(textareaRef.current.scrollHeight, 120) + 'px'
		}
	}, [message])

	// Scroll to bottom of chat when new messages arrive
	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [chatHistory, isTyping])

	// Mark messages as read when chat is opened
	useEffect(() => {
		if (isOpen) {
			setChatHistory((prev) =>
				prev.map((msg) =>
					msg.sender === 'bot' ? { ...msg, status: 'read' } : msg
				)
			)
			setUnreadCount(0)
		}
	}, [isOpen])

	// Animation variants
	const chatButtonVariants = {
		initial: { scale: 0.9, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		whileHover: { scale: 1.05 },
		whileTap: { scale: 0.95 }
	}

	const chatPanelVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.95 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: 'spring',
				damping: 25,
				stiffness: 500,
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		exit: {
			opacity: 0,
			y: 20,
			scale: 0.95,
			transition: { duration: 0.2 }
		}
	}

	// Define type for message animation custom props
	type MessageAnimationCustomProps = {
		sender: 'user' | 'bot'
	}

	const messageVariants = {
		hidden: (custom: MessageAnimationCustomProps) => ({
			opacity: 0,
			x: custom.sender === 'user' ? 20 : -20
		}),
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				damping: 25,
				stiffness: 500
			}
		}
	}

	const fadeInVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { delay: 0.3, duration: 0.3 }
		}
	}

	// Helper to render message status icons
	const renderMessageStatus = (status?: string) => {
		switch (status) {
			case 'sending':
				return (
					<Icon icon="eos-icons:loading" className="h-3 w-3 text-gray-400" />
				)
			case 'sent':
				return <Icon icon="mdi:check" className="h-3 w-3 text-gray-400" />
			case 'delivered':
				return <Icon icon="mdi:check-all" className="h-3 w-3 text-gray-400" />
			case 'read':
				return <Icon icon="mdi:check-all" className="h-3 w-3 text-blue-500" />
			case 'error':
				return <Icon icon="mdi:alert-circle" className="h-3 w-3 text-red-500" />
			default:
				return null
		}
	}

	// After initial animation completes
	const handleAnimationComplete = () => {
		setChatEntryComplete(true)
	}

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{/* Expanded Chat Panel */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="w-80 sm:w-96 max-h-[80vh] bg-white-0 dark:bg-gray-800 shadow-xl rounded-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={chatPanelVariants}
						onAnimationComplete={handleAnimationComplete}
					>
						{/* Header */}
						<div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white-0 rounded-t-2xl">
							<div className="flex items-center space-x-2">
								<div className="relative">
									<AnimateRobot />
									<motion.div
										className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ delay: 0.5 }}
									/>
								</div>
								<div>
									<h2 className="text-lg font-semibold">
										QUOTE/Buddy Assistant
									</h2>
									<motion.p
										className="text-xs opacity-90"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.3 }}
									>
										Online • Ask me about {currentProject?.groupName}
									</motion.p>
								</div>
							</div>
							<div className="flex space-x-1.5">
								<motion.button
									onClick={() => {
										if (chatHistory.length > 0) {
											if (
												confirm('Are you sure you want to clear all messages?')
											) {
												setChatHistory([])
												setShowQuickReplies(true)
											}
										}
									}}
									className={`p-1.5 rounded-full ${
										chatHistory.length > 0
											? 'hover:bg-indigo-700 text-white-0'
											: 'text-indigo-300 cursor-not-allowed'
									}`}
									disabled={chatHistory.length === 0}
									whileHover={chatHistory.length > 0 ? { scale: 1.1 } : {}}
									whileTap={chatHistory.length > 0 ? { scale: 0.9 } : {}}
								>
									<Icon icon="mdi:delete-outline" className="h-5 w-5" />
								</motion.button>

								<motion.button
									onClick={toggleChat}
									className="p-1.5 rounded-full hover:bg-indigo-700 text-white-0"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<Icon icon="mdi:close" className="h-5 w-5" />
								</motion.button>
							</div>
						</div>

						{/* Project Reference Bar */}
						<motion.div
							className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/30"
							variants={fadeInVariants}
						>
							<div className="flex items-center text-sm text-blue-600 dark:text-blue-300">
								<Icon
									icon="mdi:file-document-outline"
									className="h-4 w-4 mr-2"
								/>
								<span className="font-medium">{currentProject?.code}</span>
								<span className="mx-2">•</span>
								<span className="truncate">{currentProject?.groupName}</span>
							</div>
						</motion.div>

						{/* Chat Messages */}
						<div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-850 relative">
							{chatHistory.length === 0 ? (
								<motion.div
									className="flex flex-col items-center justify-center h-full text-center px-6 py-10"
									variants={fadeInVariants}
								>
									<div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
										<Icon
											icon="mdi:message-text-outline"
											className="w-10 h-10 text-blue-500 dark:text-blue-400"
										/>
									</div>

									<h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
										Welcome to QUOTE/Buddy
									</h3>

									<p className="text-gray-600 dark:text-gray-400 mb-4">
										I'm your project assistant. Ask me anything about your
										travel plans, schedule, or accommodations.
									</p>

									{showQuickReplies && (
										<div className="w-full space-y-2">
											<p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">
												Try asking:
											</p>

											{QUICK_REPLIES.slice(0, 3).map((reply, index) => (
												<motion.button
													key={index}
													className="w-full text-left px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 transition-colors text-sm"
													onClick={() => handleQuickReplyClick(reply)}
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.5 + index * 0.1 }}
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
												>
													{reply}
												</motion.button>
											))}
										</div>
									)}
								</motion.div>
							) : (
								<div className="space-y-3">
									{/* Date separator for conversations */}
									<div className="flex justify-center my-4">
										<div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
											Today
										</div>
									</div>

									{/* Message bubbles */}
									{chatHistory.map((msg, index) => (
										<motion.div
											key={msg.id}
											custom={{ sender: msg.sender }}
											variants={messageVariants}
											initial="hidden"
											animate="visible"
											className={`flex ${
												msg.sender === 'user' ? 'justify-end' : 'justify-start'
											}`}
										>
											<div
												className={`
                        max-w-[85%] 
                        ${
													msg.sender === 'user'
														? 'bg-blue-600 text-white rounded-t-lg rounded-bl-lg rounded-br-sm'
														: 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white-0 rounded-t-lg rounded-br-lg rounded-bl-sm border border-gray-200 dark:border-gray-600'
												}
                        shadow-sm px-4 py-2 relative
                      `}
											>
												{/* Message content */}
												<div className="mb-4">{msg.content}</div>

												{/* Time and status indicators */}
												<div
													className={`
                          absolute bottom-1 right-2
                          flex items-center space-x-1 text-xs
                          ${
														msg.sender === 'user'
															? 'text-blue-200'
															: 'text-gray-400 dark:text-gray-500'
													}
                        `}
												>
													<span>{formatTimestamp(msg.timestamp)}</span>
													{msg.sender === 'user' && (
														<span className="ml-1">
															{renderMessageStatus(msg.status)}
														</span>
													)}
												</div>

												{/* Bubble "tail" */}
												<div
													className={`
                          absolute bottom-0 w-4 h-4 overflow-hidden
                          ${
														msg.sender === 'user'
															? 'right-0 -mr-4'
															: 'left-0 -ml-4'
													}
                        `}
												>
													<div
														className={`
                            w-4 h-4 transform rotate-45 origin-bottom-left
                            ${
															msg.sender === 'user'
																? 'bg-blue-600 -ml-2'
																: 'bg-white dark:bg-gray-700 border-b border-r border-gray-200 dark:border-gray-600 -ml-2'
														}
                          `}
													></div>
												</div>
											</div>
										</motion.div>
									))}

									{/* Typing indicator */}
									{isTyping && (
										<motion.div
											className="flex justify-start"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											<div className="bg-white dark:bg-gray-700 rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-600">
												<div className="flex items-center space-x-2">
													<div className="flex space-x-1">
														{[0, 1, 2].map((i) => (
															<motion.div
																key={i}
																className="h-2 w-2 bg-blue-600 dark:bg-blue-500 rounded-full"
																animate={{
																	y: [0, -5, 0],
																	opacity: [0.5, 1, 0.5]
																}}
																transition={{
																	repeat: Infinity,
																	duration: 1,
																	delay: i * 0.2
																}}
															/>
														))}
													</div>
													<span className="text-sm text-gray-500 dark:text-gray-400">
														QUOTE/buddy is typing...
													</span>
												</div>
											</div>
										</motion.div>
									)}
								</div>
							)}
							<div ref={chatEndRef} />
						</div>

						{/* Quick Replies (if available and after some messages) */}
						<AnimatePresence>
							{showQuickReplies &&
								chatEntryComplete &&
								chatHistory.length > 0 && (
									<motion.div
										className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
									>
										<p className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-2">
											Suggested questions:
										</p>
										<div className="flex overflow-x-auto pb-1 space-x-2 px-1">
											{QUICK_REPLIES.map((reply, index) => (
												<motion.button
													key={index}
													className={`
                          flex-shrink-0 px-3 py-1.5 rounded-full text-xs whitespace-nowrap
                          border transition-colors
                          ${
														selectedSuggestion === index
															? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
															: 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
													}
                        `}
													onClick={() => handleQuickReplyClick(reply)}
													onMouseEnter={() => setSelectedSuggestion(index)}
													onMouseLeave={() => setSelectedSuggestion(null)}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
												>
													{reply}
												</motion.button>
											))}
										</div>
									</motion.div>
								)}
						</AnimatePresence>

						{/* Input Area */}
						<div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white-0 dark:bg-gray-800">
							<div className="relative rounded-xl border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors bg-white dark:bg-gray-700">
								<textarea
									ref={textareaRef}
									rows={1}
									placeholder="Type a message..."
									className="w-full px-3 py-2.5 rounded-xl resize-none focus:outline-none bg-transparent text-gray-800 dark:text-white-0 placeholder-gray-500 dark:placeholder-gray-400 pr-10"
									value={message}
									onChange={handleInputChange}
									onKeyDown={handleKeyPress}
									disabled={isLoading || isTyping}
								/>

								<div className="absolute right-2 bottom-2 flex items-center space-x-1">
									<motion.button
										onClick={handleSendMessage}
										className={`
                      p-1.5 rounded-full flex items-center justify-center
                      ${
												message.trim()
													? 'bg-blue-600 text-white hover:bg-blue-700'
													: 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
											}
                    `}
										disabled={!message.trim() || isLoading || isTyping}
										whileHover={message.trim() ? { scale: 1.1 } : {}}
										whileTap={message.trim() ? { scale: 0.9 } : {}}
										title="Send message"
									>
										<Icon
											icon="material-symbols:send-rounded"
											className="h-5 w-5"
										/>
									</motion.button>
								</div>
							</div>

							<motion.p
								className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
							>
								Powered by QUOTE/Buddy AI • {currentProject?.code}
							</motion.p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Chat Button */}
			{!isOpen && (
				<motion.button
					onClick={toggleChat}
					className="relative p-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white-0 rounded-full shadow-lg focus:outline-none"
					aria-label="Open chat"
					variants={chatButtonVariants}
					initial="initial"
					animate="animate"
					whileHover="whileHover"
					whileTap="whileTap"
				>
					<Icon icon="material-symbols:chat" width="26" height="26" />

					{/* Notification badge */}
					<AnimatePresence>
						{unreadCount > 0 && (
							<motion.div
								className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								exit={{ scale: 0 }}
								transition={{ type: 'spring', stiffness: 500, damping: 30 }}
							>
								{unreadCount}
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>
			)}
		</div>
	)
}

export default ChatWidget
