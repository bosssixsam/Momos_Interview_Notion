import React from 'react'
import { Input } from '@/components/ui/input'
import { useInputs } from '@/shared/hooks/useInputs'
import { cn } from '@/shared/utils'

export interface SearchProps {
    className?: string
    name: string
    value: string
    onChangeValue: (value: string, name: string) => void
}

const Search: React.FC<SearchProps> = ({ className, name, value, onChangeValue }) => {
    const handleDebounceChange = React.useCallback((value: string) => {
        onChangeValue(value, name)
    }, [])

    const { text, handleChange } = useInputs({
        defaultValue: value,
        onHandleDebounce: handleDebounceChange
    })

    return <Input className={cn('max-w-[250px]', className)} placeholder="Search name" value={text} onChange={handleChange} />
}

export default Search
