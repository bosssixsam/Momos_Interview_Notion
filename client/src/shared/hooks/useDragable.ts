import React from 'react'
import { DropResult } from 'react-beautiful-dnd'

const useDragable = () => {
    const handleDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return
        }

        // const items = reorder(columns, result.source.index, result.destination.index)

        // setColumns([...items])
    }
    return {}
}

export default useDragable
