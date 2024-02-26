import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<h1 className="text-7xl ">Page Not Found</h1>
			<p className="cursor-pointer">
				Go to the <Link to="/">Login Page</Link>
			</p>
		</div>
	)
}

export default NotFound
