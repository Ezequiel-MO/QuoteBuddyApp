export const baseSize = 40

export function calculateMarkerSize(zoomLevel: number): number {
  const minSize = 40
  const maxSize = 60
  const minZoom = 5
  const maxZoom = 40
  const slope = (maxSize - minSize) / (maxZoom - minZoom)
  return zoomLevel * slope + minSize - minZoom * slope
}
