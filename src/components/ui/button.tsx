import clsx from "clsx";
import {forwardRef} from "react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            type = 'button',
            text = 'Button',
            ...buttonProps
        },
        ref
    ) => {
        return (
            <button  ref={ref}
                     type={type}
                     className={ clsx( "px-6 border-0 text-white bg-emerald-600 rounded w-full py-4 hover:bg-emerald-800 hover:transition-colors hover:duration-150", className )}>{text}</button>
        )
    }
)

Button.displayName = 'Button';
export default Button;
