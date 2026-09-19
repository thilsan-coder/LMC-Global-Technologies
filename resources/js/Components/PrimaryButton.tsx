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
            className={`lmc-btn lmc-btn-primary ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
