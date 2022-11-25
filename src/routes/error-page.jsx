import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <main className='container mx-auto mt-4 md:mt-15 p-5 md:flex md:justify-center'>
      <div className='md:w-2/3 lg:w-2/5'>
        <div id='error-page'>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </main>
  )
}
