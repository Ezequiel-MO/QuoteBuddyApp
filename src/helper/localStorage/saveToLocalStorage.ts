import { IProject } from '@interfaces/project'

export const saveToLocalStorage = (data: IProject) => {
	localStorage.setItem('schedule', JSON.stringify(data.schedule))
	localStorage.setItem('hotels', JSON.stringify(data.hotels))
	localStorage.setItem('gifts', JSON.stringify(data.gifts))
	localStorage.setItem('currentProject', JSON.stringify(data))
	localStorage.setItem('userIsLogged', 'true')
}
