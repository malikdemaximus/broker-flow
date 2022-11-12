export const getCityName = (id, cities) => {
  return cities[id] ? cities[id].name.Ru : 'Город удален'
}
