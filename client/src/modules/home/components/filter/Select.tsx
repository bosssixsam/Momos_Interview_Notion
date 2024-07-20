import React from 'react'
import { Select, SelectProps } from '@/components/select'

export interface FilterSelectProps extends SelectProps {}

const FilterSelect: React.FC<FilterSelectProps> = (props) => {
    return <Select {...props} />
}

export default FilterSelect
