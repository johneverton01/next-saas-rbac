import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export function getRelativeTime(date: string) {
  dayjs.extend(relativeTime)
  return dayjs(date).fromNow()
}
