import { useMemo } from 'react'
import { CoordItem } from '../MapLogic'

interface MapOptions {
  mapId: string
  center: google.maps.LatLngLiteral
  controlSize: number
  disableDefaultUI: boolean
  clickableIcons: boolean
  zoomControl: boolean
  mapTypeControl: boolean
  scaleControl: boolean
  rotateControl: boolean
  fullscreenControl: boolean
}

export const useMapOptions = (centralCoords: CoordItem): MapOptions => {
  return useMemo(
    () => ({
      mapId: '37537533e1cc90',
      center: centralCoords.coords,
      controlSize: 25,
      disableDefaultUI: false,
      clickableIcons: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      rotateControl: false,
      fullscreenControl: true
    }),
    [centralCoords]
  )
}
