export const createMap = (key, array) =>
  array?.reduce((map, item) => {
    let copy = { ...map }
    copy = {
      ...copy,
      [item[key]]: item,
    }

    return copy
  }, {})
