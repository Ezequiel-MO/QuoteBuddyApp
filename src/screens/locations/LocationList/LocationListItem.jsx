import { useNavigate } from 'react-router-dom'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { removeItemFromList } from '../../../helper/RemoveItemFromList'
import {useAuth} from '../../../hooks'

const LocationListItem = ({ location, locations, setLocations }) => {
  const navigate = useNavigate()

  const {auth} = useAuth()

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        className='bg-green-500 text-lime-50 px-10 mr-10 font-bold rounded uppercase'
        onClick={() =>
          navigate(`/app/location/specs`, {
            state: { location }
          })
        }
      >
        Update
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        className='bg-red-500 text-lime-50 px-10 font-bold rounded uppercase'
        onClick={() =>
          removeItemFromList('locations', location._id, setLocations, locations)
        }
        destructive={true}
      >
        Remove
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <div className='mb-4 p-3 bg-green-50 hover:bg-green-100 cursor-pointer rounded-md'>
      <SwipeableList threshold={0.25}>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={auth.role === "admin" && trailingActions() }
        >
          <div className='grid grid-cols-4 w-full'>
            <p>{location.name}</p>
          </div>
        </SwipeableListItem>
      </SwipeableList>
    </div>
  )
}

export default LocationListItem
