import React from 'react'
import { DatePicker, DatePickerProps } from '@/components/picker'

export interface FilterPickerProps {
    name: string
    value: Types.Undefined<Date>
    onChangeValue: (value: Types.Undefined<Date>, name: string) => void
}

const Picker: React.FC<FilterPickerProps> = ({ value, name, onChangeValue }) => {
    const handlePicker = (value: Types.Undefined<Date>) => {
        onChangeValue(value, name)
    }

    return <DatePicker value={value} onChangeValue={handlePicker} />
}

export default Picker
