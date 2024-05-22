export interface IUser {
	_id?: string
	name: string
	password: string
	isPasswordAlreadyHashed?: boolean
	email: string
	role: 'user' | 'admin'
	token?: string
	confirmed: boolean
	isValidPassword: boolean
	resetPasswordToken?: string
	resetPasswordExpires?: Date
}
