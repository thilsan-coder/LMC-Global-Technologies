import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={`lmc-btn lmc-btn-secondary h-[42px] py-0 px-4 text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-2 ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
