import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`lmc-btn lmc-btn-primary h-[42px] py-0 px-4 text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-2 shadow-2xs ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
