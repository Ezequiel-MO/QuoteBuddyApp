import React from 'react'
import { useSocket } from '../context/SocketContext'
import { Icon } from '@iconify/react'

const SocketStatus: React.FC = () => {
	const { isConnected, socket } = useSocket()

	return (
		<div className="fixed top-35 right-4 z-50 bg-gray-800 rounded-lg shadow-md p-1 text-sm flex items-center gap-1">
			<div
				className={`w-3 h-3 rounded-full ${
					isConnected ? 'bg-green-500' : 'bg-red-500'
				}`}
			></div>
			<span className="text-gray-300">
				{isConnected ? 'Connected' : 'Disconnected'}
			</span>
			{socket && (
				<span className="text-gray-400 text-xs">
					ID: {socket.id?.substring(0, 6)}
				</span>
			)}
			<button
				className="ml-2 text-gray-400 hover:text-white-0 transition-colors"
				onClick={() =>
					console.log('Socket state:', { isConnected, socketId: socket?.id })
				}
			>
				<Icon icon="mdi:information-outline" className="w-4 h-4" />
			</button>
		</div>
	)
}

export default SocketStatus
