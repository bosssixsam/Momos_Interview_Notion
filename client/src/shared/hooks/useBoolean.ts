import React from 'react'

export const useBoolean = (defaultValue?: boolean) => {
    const [state, setState] = React.useState<boolean>(defaultValue ?? false)

    const handleTrue = () => {
        setState(true)
    }
    const handleFalse = () => {
        setState(false)
    }
    const handleToggle = () => {
        setState(!state)
    }
    const handleWithValue = (value: boolean) => {
        setState(value)
    }

    return {
        state,
        handleTrue,
        handleFalse,
        handleToggle,
        handleWithValue
    }
}
