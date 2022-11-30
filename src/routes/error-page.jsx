import { Link, useRouteError } from 'react-router-dom'
import Button from '../ui/Button'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <main
        id='error-page'
        className=' container mx-auto mt-4 md:mt-15 p-5 md:flex md:justify-center text-white-0 flex items-center justify-center '
      >
        <p className='text-8xl font-bold'>404 |</p>
        <p className='text-4xl ml-10'>
          <i>{error.statusText || error.message}</i>
        </p>
      </main>
      <Button>
        <Link to='/'>Back to Home Page</Link>
      </Button>
    </div>
  )
}
