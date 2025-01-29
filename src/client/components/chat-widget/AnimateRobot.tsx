import React, { useEffect } from 'react'
import { gsap } from 'gsap'

const AnimateRobot = () => {
	useEffect(() => {
		// Animate the head (turning left and right)
		gsap.to('.robot-head', {
			rotation: 15, // Degrees to rotate left
			transformOrigin: '50% 100%', // Pivot at the bottom center of the head
			repeat: -1, // Infinite repetition
			yoyo: true, // Reverse the animation on every alternate cycle
			duration: 2, // Duration of one half-cycle (left or right)
			ease: 'power1.inOut' // Smooth easing
		})
	}, [])

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="50"
			height="75"
			viewBox="0 0 200 300"
			style={{ verticalAlign: 'middle' }}
			aria-label="Animated Robot Thinking"
			role="img"
		>
			{/* Define gradients for a sleek look */}
			<defs>
				<linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#6C63FF" />
					<stop offset="100%" stopColor="#3C3B6E" />
				</linearGradient>
				<linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#FF6584" />
					<stop offset="100%" stopColor="#FF8E72" />
				</linearGradient>
				<linearGradient id="eyeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#FFFFFF" />
					<stop offset="100%" stopColor="#D1D1D1" />
				</linearGradient>
				<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
					<feDropShadow
						dx="0"
						dy="4"
						stdDeviation="4"
						floodColor="#000"
						floodOpacity="0.2"
					/>
				</filter>
			</defs>

			{/* Head */}
			<g className="robot-head" id="head" filter="url(#shadow)">
				<rect
					x="70"
					y="20"
					width="60"
					height="60"
					rx="10"
					ry="10"
					fill="url(#bodyGradient)"
					stroke="#333"
					strokeWidth="2"
				/>
				{/* Eyes */}
				<circle cx="90" cy="50" r="6" fill="url(#eyeGradient)" />
				<circle cx="130" cy="50" r="6" fill="url(#eyeGradient)" />
				{/* Antenna */}
				<line x1="100" y1="10" x2="100" y2="20" stroke="#333" strokeWidth="2" />
				<circle cx="100" cy="10" r="4" fill="#FF6584" />
				{/* Mouth */}
				<path
					d="M85,70 Q100,80 115,70"
					stroke="#FFFFFF"
					strokeWidth="2"
					fill="none"
					strokeLinecap="round"
				/>
			</g>

			{/* Torso */}
			<g id="torso" filter="url(#shadow)">
				<rect
					x="60"
					y="80"
					width="80"
					height="100"
					rx="15"
					ry="15"
					fill="url(#bodyGradient)"
					stroke="#333"
					strokeWidth="2"
				/>
				{/* Panels */}
				<line
					x1="100"
					y1="80"
					x2="100"
					y2="180"
					stroke="#333"
					strokeWidth="2"
				/>
				<line
					x1="60"
					y1="110"
					x2="140"
					y2="110"
					stroke="#333"
					strokeWidth="2"
				/>
				<line
					x1="60"
					y1="140"
					x2="140"
					y2="140"
					stroke="#333"
					strokeWidth="2"
				/>
				<line
					x1="60"
					y1="170"
					x2="140"
					y2="170"
					stroke="#333"
					strokeWidth="2"
				/>
			</g>

			{/* Left Arm */}
			<g id="left-arm" filter="url(#shadow)">
				<rect
					x="40"
					y="80"
					width="20"
					height="60"
					rx="10"
					ry="10"
					fill="url(#armGradient)"
					stroke="#333"
					strokeWidth="2"
				/>
				{/* Left Hand */}
				<circle
					cx="50"
					cy="150"
					r="8"
					fill="#FF8E72"
					stroke="#333"
					strokeWidth="2"
				/>
			</g>

			{/* Right Arm (Thinking Motion) */}
			<g id="right-arm" transform="translate(140, 80)" filter="url(#shadow)">
				<rect
					className="right-arm"
					x="0"
					y="0"
					width="20"
					height="60"
					rx="10"
					ry="10"
					fill="url(#armGradient)"
					stroke="#333"
					strokeWidth="2"
				/>
				{/* Right Hand */}
				<circle
					cx="10"
					cy="60"
					r="8"
					fill="#FF8E72"
					stroke="#333"
					strokeWidth="2"
				/>
			</g>
		</svg>
	)
}

export default AnimateRobot
