import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import AnimateRobot from './AnimateRobot'
import { useApiPost } from 'src/hooks/useApiPost'
import { useCurrentProject } from 'src/hooks'

// Define the structure of a chat message
interface Message {
	sender: 'user' | 'bot'
	content: string
}

// Updated API response structure based on your current backend
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

const ChatWidget = () => {
	const { currentProject } = useCurrentProject()
	const [isOpen, setIsOpen] = useState(false)
	const [message, setMessage] = useState('')
	const [chatHistory, setChatHistory] = useState<Message[]>([])

	// Utilize the custom useApiPost hook
	const { post, isLoading, error } = useApiPost<ApiResponse>(
		`/projects/${currentProject?._id}/qa`
	)

	// Ref to keep the chat history scrolled to the bottom
	const chatEndRef = useRef<HTMLDivElement>(null)

	const toggleChat = () => {
		setIsOpen(!isOpen)
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		setMessage(e.target.value)
	}

	const handleSendMessage = async () => {
		const trimmedMessage = message.trim()
		if (!trimmedMessage) return

		const userMessage: Message = { sender: 'user', content: trimmedMessage }

		// Add user message to chat history
		setChatHistory((prevHistory) => [...prevHistory, userMessage])
		setMessage('')

		try {
			// Make the POST request
			const response = await post({ question: trimmedMessage })

			// Check if we have the answer in the new response structure
			if (
				response &&
				response.data &&
				response.data.data &&
				response.data.data.answer
			) {
				const botResponse: Message = {
					sender: 'bot',
					content: response.data.data.answer
				}
				setChatHistory((prevHistory) => [...prevHistory, botResponse])
			} else if (!error) {
				// If no response and no error, provide a default message
				const defaultBotResponse: Message = {
					sender: 'bot',
					content: 'Sorry, I could not process your request.'
				}
				setChatHistory((prevHistory) => [...prevHistory, defaultBotResponse])
			}
		} catch (err) {
			console.error('Error in chat request:', err)
			const errorBotResponse: Message = {
				sender: 'bot',
				content: 'Sorry, there was an error processing your request.'
			}
			setChatHistory((prevHistory) => [...prevHistory, errorBotResponse])
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	// Scroll to the bottom of the chat history when a new message is added
	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [chatHistory, isLoading])

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{isOpen && (
				<div className="w-96 max-h-[80vh] bg-orange-400 dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-orange-700">
						<div className="flex items-center space-x-2">
							<AnimateRobot />
							<h2 className="text-lg font-semibold text-gray-900 dark:text-orange-400">
								Ask me anything about this Project
							</h2>
						</div>
						<button onClick={toggleChat}>
							<Icon
								icon="mdi:close"
								width="24"
								height="24"
								className="text-gray-900 dark:text-white-0"
							/>
						</button>
					</div>

					{/* Chat History */}
					<div className="flex-1 p-4 overflow-y-auto">
						{chatHistory.length === 0 ? (
							<p className="text-gray-500 dark:text-gray-400">
								No messages yet. Start the conversation!
							</p>
						) : (
							chatHistory.map((msg, index) => (
								<div
									key={index}
									className={`mb-2 p-2 rounded-lg ${
										msg.sender === 'user'
											? 'bg-cyan-500 text-white self-end'
											: 'bg-gray-300 text-gray-900 self-start dark:bg-gray-700 dark:text-white-0'
									}`}
								>
									{msg.content}
								</div>
							))
						)}
						{isLoading && (
							<div className="mb-2 p-2 rounded-lg bg-gray-300 text-gray-900 self-start dark:bg-gray-700 dark:text-white-0">
								QUOTE/buddy is typing...
							</div>
						)}
						<div ref={chatEndRef} />
					</div>

					{/* Input Area */}
					<div className="p-4 border-t border-gray-200 dark:border-gray-700">
						<textarea
							rows={3}
							placeholder="Type your message..."
							className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
							value={message}
							onChange={handleInputChange}
							onKeyDown={handleKeyPress}
							disabled={isLoading}
						/>
						<button
							onClick={handleSendMessage}
							className="mt-2 w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none disabled:bg-blue-400 dark:disabled:bg-blue-300"
							disabled={isLoading || !message.trim()}
						>
							{isLoading ? 'Sending...' : 'Send'}
						</button>
					</div>
				</div>
			)}

			{/* Chat Button */}
			{!isOpen && (
				<button
					onClick={toggleChat}
					className="p-3 bg-blue-600 dark:bg-blue-500 text-white-0 rounded-full shadow-lg focus:outline-none hover:bg-blue-700 dark:hover:bg-blue-600 transition"
					aria-label="Open chat"
				>
					<Icon icon="mdi:chat" width="24" height="24" />
				</button>
			)}
		</div>
	)
}

export default ChatWidget
