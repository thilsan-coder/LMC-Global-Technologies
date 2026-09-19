import { ButtonHTMLAttributes } from 'react';

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`lmc-btn lmc-btn-danger ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
