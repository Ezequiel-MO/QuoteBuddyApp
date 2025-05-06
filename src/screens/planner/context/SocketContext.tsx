import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode
} from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from 'src/context/auth/AuthProvider'

interface UserData {
  id: string;
  role?: 'AM' | 'Clients'; // Match backend user structure
}

interface SocketContextType {
	socket: Socket | null;
	isConnected: boolean;
	activeRoomId: string | null;
	roomUsers: UserData[];
	joinRoom: (roomId: string) => void;
	leaveRoom: (roomId: string) => void;
	sendComment: (roomId: string, content: string) => void;
	sendTypingIndicator: (roomId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
	activeRoomId: null,
	roomUsers: [],
	joinRoom: () => {},
	leaveRoom: () => {},
	sendComment: () => {},
	sendTypingIndicator: () => {}
})

interface SocketProviderProps {
	children: ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
	const [roomUsers, setRoomUsers] = useState<UserData[]>([]);
	const { auth, loading: authLoading } = useAuth(); // MODIFICATION: Get authLoading state
	console.log('SocketProvider: Auth loading ===>:', auth) // MODIFICATION: Log authLoading state
	useEffect(() => {
		let isMounted = true
		let socketInstance: Socket | null = null

		const connectSocket = () => {
			if (socketInstance) {
				socketInstance.disconnect()
			}

			// It's good practice to check if auth object itself exists,
			// though authLoading should cover the initialization period.
			if (!auth) {
				console.log('SocketProvider: Auth object not available.')
				return
			}

			if (!auth?.token) {
				// This is line 55, where the warning originates
				console.warn(
					// This is line 56
					'SocketProvider: No auth token available - stopping connection attempts'
				)
				return
			}

			console.log('SocketProvider: Attempting to connect socket...')
			socketInstance = io('http://localhost:3001', {
				auth: { token: auth.token },
				reconnection: false, // Disable automatic reconnection
				timeout: 5000
			})

			socketInstance.on('connect', () => {
				console.log('Socket connected:', socketInstance?.id)
				if (isMounted) {
					setIsConnected(true);
					// Join a default room for general notifications (optional, or handle specific room joining)
					// const defaultRoomId = 'general-room';
					// socketInstance?.emit('join-room', defaultRoomId);
				}
			});

			socketInstance.on('room-state', (data: { roomId: string; users: UserData[] }) => {
				if (isMounted) {
					console.log('SocketProvider: Received room-state', data);
					setActiveRoomId(data.roomId);
					setRoomUsers(data.users || []);
				}
			});

			socketInstance.on('connect_error', (err) => {
				console.error('Socket connection error:', err.message)
				if (isMounted) {
					setIsConnected(false)
				}
			})

			socketInstance.on('disconnect', (reason) => {
				console.log('Socket disconnected:', reason)
				if (isMounted) {
					setIsConnected(false)
				}
			})

			if (isMounted) {
				setSocket(socketInstance)
			}
		}

		// MODIFICATION: Only attempt to connect if authentication is not loading
		if (!authLoading) {
			if (isMounted) {
				// Ensure component is still mounted before connecting
				connectSocket()
			}
		} else {
			console.log('SocketProvider: Waiting for authentication to complete...')
		}

		return () => {
			isMounted = false
			console.log('SocketProvider: Cleaning up socket connection...')
			if (socketInstance) {
				socketInstance.disconnect()
			}
			setSocket(null);
			setIsConnected(false);
			setActiveRoomId(null);
			setRoomUsers([]);
		}
	}, [auth, authLoading]) // MODIFICATION: Add authLoading to dependency array

	// Function to join a room
	const joinRoom = (roomId: string) => {
		if (socket && roomId && isConnected) {
			// Ensure socket is connected before joining
			console.log(`SocketProvider: Joining room: ${roomId}`);
			socket.emit('join-room', roomId); // Backend expects roomId directly
			// setActiveRoomId(roomId); // Room state will be updated by 'room-state' event
		}
	}

	// Function to leave a room
	const leaveRoom = (roomId: string) => {
		if (socket && roomId) {
			console.log(`SocketProvider: Leaving room: ${roomId}`);
			socket.emit('leave-room', roomId);
			if (roomId === activeRoomId) {
				setActiveRoomId(null);
				setRoomUsers([]);
			}
		}
	}

	// Function to send a comment
	const sendComment = (roomId: string, content: string) => {
		if (socket && roomId && content && isConnected) {
			// Ensure socket is connected
			console.log(
				`Sending comment to room ${roomId}: ${content.substring(0, 20)}...`
			)
			socket.emit('comment-added', { roomId, content })
		}
	}

	// Function to send typing indicator
	const sendTypingIndicator = (roomId: string) => {
		if (socket && roomId && isConnected) {
			// Ensure socket is connected
			console.log(`Sending typing indicator to room: ${roomId}`)
			socket.emit('user-typing', roomId)
		}
	}

	return (
		<SocketContext.Provider
			value={{
				socket,
				isConnected,
				activeRoomId,
				roomUsers,
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
