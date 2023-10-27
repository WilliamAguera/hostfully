import { forwardRef } from 'react'
import clsx from 'clsx'

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    placeholder?: string
    disabled?: boolean
    label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...inputProps }, ref) => {
        return (
            <div className="w-full">
                {inputProps.label && (
                    <label className="text-sm font-semibold text-gray-700">
                        {inputProps.label}
                    </label>
                )}
                <input
                    ref={ref}
                    {...inputProps}
                    className={clsx(
                        'peer block h-[50px] w-full bg-transparent font-normal transition duration-200 focus:outline-none focus:ring-[1px] disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:placeholder:text-gray-400',
                        className
                    )}
                />
            </div>
        )
    }
)

Input.displayName = 'Input'
export default Input
