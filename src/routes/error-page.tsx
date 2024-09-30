import React, { useEffect } from 'react'
import { Button } from '@components/atoms'
import { Link, useRouteError, useLocation } from 'react-router-dom'
import { logger } from "src/helper/debugging/logger"

type ErrorType = {
	statusText?: string
	message?: string
}

export const ErrorPage: React.FC = () => {
	const error = useRouteError() as ErrorType
	const location = useLocation()

	useEffect(() => {
		// console.log({ error })
		// console.log(location)
		const sendError = error as any
		logger.logErrorToDatabase(`${sendError.message}, error in ${location.pathname} `, sendError.fileName)
	}, [error])


	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<main
				id="error-page"
				className="container mx-auto mt-4 md:mt-15 p-5 md:flex md:justify-center text-white-0 flex items-center justify-center"
			>
				<p className="text-8xl font-bold">404 |</p>
				<p className="text-4xl ml-10">
					<i>{error?.statusText || error?.message || 'Error occurred'}</i>
				</p>
			</main>
			<Link to="/app">
				<Button icon="noto:back-arrow">
					Back to Home Page
				</Button>
			</Link>
		</div>
	)
}
