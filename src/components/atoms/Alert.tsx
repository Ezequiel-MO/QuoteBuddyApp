import React from 'react'

type AlertProps = {
	alert: {
		error: boolean
		msg: string
	}
}

export const Alert: React.FC<AlertProps> = ({ alert }) => {
	return (
		<div
			className={`${
				alert.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'
			} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white-100 font-bold text-sm my-10`}
		>
			{alert && alert.msg}
		</div>
	)
}
