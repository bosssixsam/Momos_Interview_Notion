import React from 'react'
import { Input } from '@/components/ui/input'
import { useInputs } from '@/shared/hooks/useInputs'
import { cn } from '@/shared/utils'

export interface SearchProps {
    className?: string
    isNumber?: boolean
    placeHolder?: string
    name: string
    value: string
    onChangeValue: (value: string, name: string) => void
}

const Search: React.FC<SearchProps> = ({ className, placeHolder, isNumber, name, value, onChangeValue }) => {
    const handleDebounceChange = React.useCallback((value: string) => {
        onChangeValue(value, name)
    }, [])

    React.useEffect(() => {
        handleChangeValue(value)
    }, [value])

    const { text, handleChange, handleChangeValue } = useInputs({
        defaultValue: value,
        onHandleDebounce: handleDebounceChange
    })

    return (
        <Input
            type={isNumber ? 'number' : 'text'}
            className={cn('max-w-[250px]', className)}
            placeholder={placeHolder}
            value={text}
            onChange={handleChange}
        />
    )
}

export default Search
