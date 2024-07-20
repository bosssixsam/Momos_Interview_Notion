import React from 'react'
import lodash from 'lodash'

// import { useQueryHooks } from './useQueryHooks'

export interface useInputProps {
    type?: 'text' | 'number'
    defaultValue?: string
    onHandleDebounce?: (value: string) => void
    onHandleChange?: (value: string) => void
}

export const useInputs = ({ defaultValue, onHandleDebounce, onHandleChange }: useInputProps) => {
    // const { getQueryStr } = useQueryHooks()
    // const queryStr = getQueryStr()
    const [text, setText] = React.useState<string>(defaultValue ?? '')

    const debouncedHandleChange = React.useCallback(
        lodash.debounce((newValue) => {
            onHandleDebounce?.(newValue)
        }, 250),
        [onHandleDebounce]
    )

    const handleValue = (value: string) => {
        setText(value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        debouncedHandleChange(e.target.value)
        onHandleChange?.(e.target.value)
    }

    const handleChangeValue = (value: string) => {
        setText(value)
        debouncedHandleChange(value)
        onHandleChange?.(value)
    }

    const handleClearValue = () => {
        setText('')
        debouncedHandleChange('')
        onHandleChange?.('')
    }

    return {
        text,
        handleChange,
        handleClearValue,
        handleChangeValue,
        handleValue
    }
}
