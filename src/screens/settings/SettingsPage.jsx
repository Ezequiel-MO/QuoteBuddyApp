import { Toggle } from '../../ui'
import {useState} from "react"


const SettingsPage = () => {
  const [data , setData] = useState(false)

  return (
    <div>
      <Toggle />
    </div>
  )
}

export default SettingsPage
