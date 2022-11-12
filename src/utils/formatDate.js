import moment from 'moment'

export const DATE_FORMAT = 'DD.MM.YYYY HH:mm:ss'

export const HOUR_IN_MINUTES = 60

export const TARGET = {
  read: 'read',
  create: 'create',
}

export const formatDate = (
  date,
  target = TARGET.read,
  format = DATE_FORMAT,
) => {
  if (target === TARGET.create) {
    return moment(date).utc()
  }

  const timeZone = moment.parseZone(date).utcOffset() / HOUR_IN_MINUTES
  // Локальная дата
  return date ? moment(date).add(timeZone, 'h').format(format) : ''
}
