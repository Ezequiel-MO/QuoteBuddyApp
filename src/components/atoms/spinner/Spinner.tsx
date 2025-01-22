import React, { FC } from 'react'
import './Spinner.css'

interface SpinnerProps {
	message?: string
}

export const Spinner: FC<SpinnerProps> = ({ message }) => {
	return (
		<div className="spinner-container" data-testid="Spinner">
			<div className="sk-chase">
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
				<div className="sk-chase-dot"></div>
			</div>
			{message && (
				<p className="spinner-message text-xl mt-4 text-white-0">{message}</p>
			)}
		</div>
	)
}
