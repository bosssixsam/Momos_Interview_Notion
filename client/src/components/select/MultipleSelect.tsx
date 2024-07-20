import React from 'react'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { cn } from '@/shared/utils'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { OptionProps } from './Select'

export interface MultipleSelectProps {
    className?: string
    contentClassName?: string
    placeholder?: string
    value: string[]
    options: OptionProps[]
    onChangeValue: (value: string[]) => void
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({ className, contentClassName, placeholder, value, options, onChangeValue }) => {
    const { state: open, handleToggle } = useBoolean()

    return (
        <Popover open={open} onOpenChange={handleToggle}>
            <PopoverTrigger>
                <div
                    className={cn(
                        'bg-white min-w-[200px] rounded border-[1px] border-border-default flex gap-2 transition-transform duration-150 ease-linear focus:ring-0 justify-between',
                        {
                            '[&>svg]:rotate-180 border-surface-support-1-darkest': open
                        },
                        // SearchSelectVariants({ size }),
                        contentClassName
                    )}
                >
                    <div className={cn('flex w-full justify-between items-center gap-1 p-2')}>
                        {/* <span className="font-semibold text-base text-base-black capitalize">{name}: </span> */}
                        <span className={cn('text-base-black font-normal', { 'text-border-default': value && value.length > 0 })}>
                            {value && value.length > 0 ? `${value.length} selected` : (placeholder ?? 'Please select')}
                        </span>
                        {value.length > 0 && (
                            <Button variant={'secondary'} className="w-[20%]" onClick={() => onChangeValue([])}>
                                X
                            </Button>
                        )}
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent
                className={cn('p-0 bg-base-white border border-border-default rounded-[4px]', {
                    // 'w-[464px]': showChips
                })}
            >
                <Command className={cn('w-full', className)}>
                    {options.length === 0 && <CommandEmpty className="p-0 pt-2 text-center">No item found.</CommandEmpty>}
                    <div className="flex">
                        <CommandGroup className="max-h-64 overflow-auto p-0 pt-2 flex flex-col gap-1 flex-1">
                            {options.map((option, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        onChangeValue(
                                            value.includes(option.value)
                                                ? value.filter((item) => item !== option.value)
                                                : [...value, option.value]
                                        )
                                        // setOpen(true)
                                    }}
                                    className={cn('hover:bg-slate-100 rounded-none flex gap-2 p-2 cursor-pointer', {
                                        'mt-1': idx !== 0
                                    })}
                                >
                                    <Checkbox checked={value.includes(option.value)} />
                                    {option.label}
                                </div>
                            ))}
                        </CommandGroup>
                    </div>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default MultipleSelect
