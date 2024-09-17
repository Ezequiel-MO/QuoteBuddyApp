import baseAPI from 'src/axios/axiosConfig'

class Logger {
	environment: string

	constructor() {
		this.environment = process.env.NODE_ENV || 'development'
	}

	async logErrorToDatabase(message: string, stack?: string) {
		try {
			await baseAPI.post('log-error', {
				message,
				stack,
				level: 'error'
			})
		} catch (err) {
			console.error('Failed to send error log to database:', err)
		}
	}

	debug(message: string, data?: any) {
		if (this.environment === 'development') {
			console.debug(`[DEBUG] ${message}`, data)
		}
	}

	info(message: string, data?: any) {
		if (this.environment === 'development') {
			console.info(`[INFO] ${message}`, data)
		}
	}

	warn(message: string, data?: any) {
		if (this.environment === 'development') {
			console.warn(`[WARN] ${message}`, data)
		}
	}

	error(message: string, error?: any) {
		console.error(`[ERROR] ${message}`, error)

		// Send error details to the backend API using the baseAPI instance
		this.logErrorToDatabase(message, error?.stack)
	}

	logLevel(
		level: 'debug' | 'info' | 'warn' | 'error',
		message: string,
		data?: any
	) {
		switch (level) {
			case 'debug':
				this.debug(message, data)
				break
			case 'info':
				this.info(message, data)
				break
			case 'warn':
				this.warn(message, data)
				break
			case 'error':
				this.error(message, data)
				break
			default:
				console.log(message, data)
		}
	}
}

export const logger = new Logger()
