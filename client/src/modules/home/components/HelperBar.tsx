import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/shared/utils'

export interface HelperBarProps {
    className?: string
    sort: string
    onSortTagClick: () => void
}

const HelperBar: React.FC<HelperBarProps> = ({ className, sort, onSortTagClick }) => {
    return (
        <div className="border-[1px] border-solid rounded-md space-y-2 p-4">
            <h2 className="font-semibold text-[1.5rem] capitalize">Helper Bar</h2>
            <div className={cn('flex items-center justify-between', className)}>
                <div className="flex items-center space-x-2">
                    {sort.length > 0 && (
                        <div className="flex space-x-1">
                            <p>SortKey: </p>
                            <Badge variant={'secondary'} className="flex gap-2">
                                <span>{sort}</span>
                                <button className="font-semibold" onClick={onSortTagClick}>
                                    X
                                </button>
                            </Badge>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HelperBar
