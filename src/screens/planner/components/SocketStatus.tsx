import React, { useState, useEffect } from 'react'
import { useSocket } from '../context/SocketContext'
import { Icon } from '@iconify/react'
import { useAuth } from '@context/auth/AuthProvider'

interface UserData {
  id?: string
  role?: string
}

interface RoomData {
  users?: UserData[]
}

const SocketStatus: React.FC = () => {
	const { isConnected, socket } = useSocket()
	const { auth } = useAuth() // Get current user's role
	const [otherRoleIsConnected, setOtherRoleIsConnected] = useState(false)

	// Set up listeners for other users connecting/disconnecting
	useEffect(() => {
		if (!socket) return

		// Listen for other users connecting
		socket.on('user-connected', (userData: UserData) => {
			// If the connected user has a different role than us, mark other role as connected
			if (userData.role && userData.role !== auth.role) {
				setOtherRoleIsConnected(true)
			}
		})

		// Listen for other users disconnecting
		socket.on('user-disconnected', (userData: UserData) => {
			// If the disconnected user has a different role than us, mark other role as disconnected
			if (userData.role && userData.role !== auth.role) {
				setOtherRoleIsConnected(false)
			}
		})

		// Listen for room state (who's already connected)
		socket.on('room-state', (roomData: RoomData) => {
			console.log('Received room state:', roomData);
			if (roomData && Array.isArray(roomData.users)) {
				const otherRoleUsers = roomData.users.filter(
					(user: UserData) => user.role !== auth.role
				);
				console.log('Current room participants:', roomData.users);
				setOtherRoleIsConnected(otherRoleUsers.length > 0);
			} else {
				console.log(
					'Received room-state event with invalid data structure:',
					roomData
				)
				setOtherRoleIsConnected(false)
			}
		})

		// Clean up listeners on unmount
		return () => {
			socket.off('user-connected')
			socket.off('user-disconnected')
			socket.off('room-state')
		}
	}, [socket, auth.role])

	// Determine status text based on role and connection states
	const statusText = () => {
		if (!isConnected) return 'Disconnected'

		// If we're connected but no other role is connected
		if (!otherRoleIsConnected) {
			return (
				'Connected (Waiting for ' +
				(auth.role === 'client' ? 'Account Manager' : 'Client') +
				')'
			)
		}

		// If both we and the other role are connected
		return auth.role === 'client'
			? 'Account Manager Connected'
			: 'Client Connected'
	}

	// Determine status color
	const statusColor = () => {
		if (!isConnected) return 'bg-red-500' // Disconnected
		if (!otherRoleIsConnected) return 'bg-yellow-500' // Connected but waiting
		return 'bg-green-500' // Fully connected
	}

	return (
		<div className="fixed top-35 right-4 z-50 bg-gray-800 rounded-lg shadow-md p-1 text-sm flex items-center gap-1">
			<div className={`w-3 h-3 rounded-full ${statusColor()}`}></div>
			<span className="text-gray-300">{statusText()}</span>
			{/* Keep existing socket ID display */}
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
						otherRoleIsConnected
					})
				}
			>
				<Icon icon="mdi:information-outline" className="w-4 h-4" />
			</button>
		</div>
	)
}

export default SocketStatus
