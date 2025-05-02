import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode
} from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from 'src/context/auth/AuthProvider'

interface SocketContextType {
	socket: Socket | null
	isConnected: boolean
	joinRoom: (roomId: string) => void
	leaveRoom: (roomId: string) => void
	sendComment: (roomId: string, content: string) => void
	sendTypingIndicator: (roomId: string) => void
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
	joinRoom: () => {},
	leaveRoom: () => {},
	sendComment: () => {},
	sendTypingIndicator: () => {}
})

interface SocketProviderProps {
	children: ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [isConnected, setIsConnected] = useState(false)
	const { auth } = useAuth()

	useEffect(() => {
		// Only connect if we have authentication
		if (!auth || !auth.token) {
			console.log('No auth token available, skipping socket connection')
			return
		}

		// Connect to the socket server
		const socketInstance = io('http://localhost:3001', {
			auth: { token: auth.token },
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
			timeout: 10000
		})

		// Set up event listeners
		socketInstance.on('connect', () => {
			console.log('Socket connected:', socketInstance.id)
			setIsConnected(true)
		})

		socketInstance.on('connect_error', (err) => {
			console.error('Socket connection error:', err.message)
			setIsConnected(false)
		})

		socketInstance.on('disconnect', (reason) => {
			console.log('Socket disconnected:', reason)
			setIsConnected(false)
		})

		// Store the socket instance
		setSocket(socketInstance)

		// Clean up on unmount
		return () => {
			console.log('Cleaning up socket connection')
			socketInstance.disconnect()
		}
	}, [auth])

	// Function to join a room
	const joinRoom = (roomId: string) => {
		if (socket && roomId) {
			console.log(`Joining room: ${roomId}`)
			socket.emit('join-room', roomId)
		}
	}

	// Function to leave a room
	const leaveRoom = (roomId: string) => {
		if (socket && roomId) {
			console.log(`Leaving room: ${roomId}`)
			socket.emit('leave-room', roomId)
		}
	}

	// Function to send a comment
	const sendComment = (roomId: string, content: string) => {
		if (socket && roomId && content) {
			console.log(
				`Sending comment to room ${roomId}: ${content.substring(0, 20)}...`
			)
			socket.emit('comment-added', { roomId, content })
		}
	}

	// Function to send typing indicator
	const sendTypingIndicator = (roomId: string) => {
		if (socket && roomId) {
			console.log(`Sending typing indicator to room: ${roomId}`)
			socket.emit('user-typing', roomId)
		}
	}

	return (
		<SocketContext.Provider
			value={{
				socket,
				isConnected,
				joinRoom,
				leaveRoom,
				sendComment,
				sendTypingIndicator
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}

export const useSocket = () => {
	const context = useContext(SocketContext)
	if (context === undefined) {
		throw new Error('useSocket must be used within a SocketProvider')
	}
	return context
}
