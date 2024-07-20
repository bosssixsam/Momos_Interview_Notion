import React from 'react'
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as USelect } from '@/components/ui/select'
import { cn } from '@/shared/utils'

export interface OptionProps {
    value: string
    label?: React.ReactNode
}

export interface SelectProps {
    className?: string
    placeHolder?: string
    name: string
    value: string
    options: OptionProps[]
    onValueChange: (value: string, name: string) => void
}

const Select: React.FC<SelectProps> = ({ className, placeHolder, name, value, options, onValueChange }) => {
    return (
        <USelect value={value} onValueChange={(value) => onValueChange(value, name)}>
            <SelectTrigger className={cn('w-[180px]', value.length > 0 && 'bg-slate-100', className)}>
                <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent>
                {options.map(({ value, label }, index) => (
                    <SelectItem key={index} value={value}>
                        {label ?? value}
                    </SelectItem>
                ))}
            </SelectContent>
        </USelect>
    )
}

export default Select
