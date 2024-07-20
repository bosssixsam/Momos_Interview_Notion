import { format, parseISO } from 'date-fns'
import { DateFormat } from '@/shared/constants/format'

export const reorderItem = (list: string[], startIndex: number, endIndex: number): string[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const formatDate = (date: string, formatDate?: string): string => {
    return format(parseISO(date), formatDate ?? DateFormat.dateTime)
}
