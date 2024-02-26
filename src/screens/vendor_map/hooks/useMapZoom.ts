import { useEffect } from 'react'
import { CoordItem } from '../MapLogic'

export const useMapZoom = (
  map: google.maps.Map | null,
  location: CoordItem,
  vendors: CoordItem[]
) => {
  useEffect(() => {
    if (!map) return
    let isInitialLoad = true
    const newBounds = new google.maps.LatLngBounds()

    if (location.distance === null) {
      vendors.forEach((vendor) => {
        newBounds.extend(vendor.coords)
      })
    } else {
      newBounds.extend(location.coords)
      vendors.forEach((vendor) => {
        if (vendor.distance !== null) {
          newBounds.extend(vendor.coords)
        }
      })
    }

    const fitAndAdjustZoom = () => {
      setTimeout(() => {
        map.fitBounds(newBounds)
      }, 1000)

      if (isInitialLoad) {
        isInitialLoad = false
        return
      }

      const currentZoom = map.getZoom()

      if (typeof currentZoom === 'number') {
        const zoomChangeListener = google.maps.event.addListener(
          map,
          'bounds_changed',
          () => {
            if (map.getZoom() !== currentZoom) {
              google.maps.event.removeListener(zoomChangeListener)
              map.setZoom(Math.min(currentZoom + 1, map.getZoom()!))
            }
          }
        )
      }
    }

    fitAndAdjustZoom()
  }, [map, location, vendors])
}
