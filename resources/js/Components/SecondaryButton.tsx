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
            className={`lmc-btn lmc-btn-secondary ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
