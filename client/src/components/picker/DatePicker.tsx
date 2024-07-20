import React from 'react'
import { format } from 'date-fns'
import { DateFormat } from '@/shared/constants'
import { cn } from '@/shared/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export interface DatePickerProps {
    value: Types.Undefined<Date>
    onChangeValue: (value: Types.Undefined<Date>) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChangeValue }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, DateFormat.dateTime) : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={value} onSelect={onChangeValue} initialFocus />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker
