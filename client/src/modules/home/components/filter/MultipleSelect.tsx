import React from 'react'
import { OptionProps } from '@/components/select'
import MultipleSelect from '@/components/select/MultipleSelect'

export interface FilterMultipleSelectProps {
    className?: string
    contentClassName?: string
    placeholder?: string
    name: string
    value: string[]
    options: OptionProps[]
    onChangeValue: (value: string[], name: string) => void
}

const FilterMultipleSelect: React.FC<FilterMultipleSelectProps> = ({ onChangeValue, name, ...props }) => {
    const handleChangeValue = (value: string[]) => {
        onChangeValue(value, name)
    }

    return <MultipleSelect onChangeValue={handleChangeValue} {...props} />
}

export default FilterMultipleSelect
