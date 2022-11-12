export const parseGeoPosition = (location) => {
  const { latitude, longitude } = location
  return {
    latitude: Number(latitude),
    longitude: Number(longitude),
  }
}
