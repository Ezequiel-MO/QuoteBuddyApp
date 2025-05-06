import React, { useState, useEffect } from 'react'
import { useSocket } from '../context/SocketContext'
import { Icon } from '@iconify/react'
import { useAuth } from '@context/auth/AuthProvider'
import { useClientAuth } from '@context/auth/ClientAuthProvider'

interface UserData {
	id?: string
	role?: string
}

interface RoomData {
	users?: UserData[]
}

const SocketStatus: React.FC = () => {
	const { isConnected, socket } = useSocket()
	const { auth } = useAuth()
	const { clientUserIsLoggedIn } = useClientAuth()
	const [connectedUsers, setConnectedUsers] = useState<UserData[]>([])

	// Set up socket event listeners
	useEffect(() => {
		if (!socket) return

		socket.on('room-state', (roomData: RoomData) => {
			if (roomData && Array.isArray(roomData.users)) {
				setConnectedUsers(roomData.users)
			} else {
				console.log('Received invalid room-state data:', roomData)
				setConnectedUsers([])
			}
		})

		socket.on('user-connected', (userData: UserData) => {
			setConnectedUsers((prev) => [...prev, userData])
		})

		socket.on('user-disconnected', (userData: UserData) => {
			setConnectedUsers((prev) =>
				prev.filter((user) => user.id !== userData.id)
			)
		})

		return () => {
			socket.off('room-state')
			socket.off('user-connected')
			socket.off('user-disconnected')
		}
	}, [socket])

	// Determine if at least one user with the other role is connected
	const otherRoleIsConnected = connectedUsers.some(
		(user) => user.role !== auth.role
	)

	// Define status text based on connection state, role, and login status
	const statusText = () => {
		if (auth.role === 'client' && !clientUserIsLoggedIn) {
			return 'Please log in'
		}
		if (!isConnected) {
			return 'Disconnected'
		}
		if (!otherRoleIsConnected) {
			return auth.role === 'client'
				? 'Waiting for Account Manager'
				: 'Waiting for Client'
		}
		return auth.role === 'client'
			? 'Account Manager Connected'
			: 'Client Connected'
	}

	// Define status color based on connection scenarios and login status
	const statusColor = () => {
		if (auth.role === 'client' && !clientUserIsLoggedIn) {
			return 'bg-red-500' // Not logged in
		}
		if (!isConnected) {
			return 'bg-red-500' // Disconnected
		}
		if (!otherRoleIsConnected) {
			return 'bg-yellow-500' // Waiting for other role
		}
		return 'bg-green-500' // Connected to other role
	}

	return (
		<div className="fixed top-35 right-4 z-50 bg-gray-800 rounded-lg shadow-md p-1 text-sm flex items-center gap-1">
			<div className={`w-3 h-3 rounded-full ${statusColor()}`}></div>
			<span className="text-gray-300">{statusText()}</span>
			{socket && (
				<span className="text-gray-400 text-xs">
					ID: {socket.id?.substring(0, 6)}
				</span>
			)}
			<button
				className="ml-2 text-gray-400 hover:text-white-0 transition-colors"
				onClick={() =>
					console.log('Socket state:', {
						isConnected,
						socketId: socket?.id,
						connectedUsers,
						otherRoleIsConnected,
						clientUserIsLoggedIn
					})
				}
			>
				<Icon icon="mdi:information-outline" className="w-4 h-4" />
			</button>
		</div>
	)
}

export default SocketStatus
