import { Link, useLocation } from 'react-router-dom'

export const Breadcrumbs = () => {
  const location = useLocation()
  let currentLink = ''
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index) => {
      currentLink += `/${crumb}`
      return (
        <div key={`${crumb}-${index}`}>
          <Link to={currentLink}>
            {crumb}{' '}
            <span>
              {index !== location.pathname.split('/').length - 2 && '/'}
            </span>
          </Link>
        </div>
      )
    })
  return (
    <div className='flex flex-row items-center mt-3 font-semibold text-xl text-black-50'>
      {crumbs}
    </div>
  )
}
