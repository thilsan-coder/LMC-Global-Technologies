import React from 'react';
import { Link } from '@inertiajs/react';

interface LmcBrandLogoProps {
    variant?: 'light' | 'dark' | 'orange';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showTagline?: boolean;
    showSubtitle?: boolean;
    className?: string;
    href?: string;
}

export default function LmcBrandLogo({
    variant = 'dark',
    size = 'md',
    showTagline = true,
    showSubtitle = true,
    className = '',
    href = '/',
}: LmcBrandLogoProps) {
    const isLight = variant === 'light';

    const sizeClasses = {
        sm: {
            text: 'text-xl',
            sub: 'text-[9px] tracking-wider',
            tagline: 'text-[8px]',
            badge: 'px-1.5 py-0.5 text-[10px]',
        },
        md: {
            text: 'text-2xl',
            sub: 'text-[10px] tracking-widest',
            tagline: 'text-[9px]',
            badge: 'px-2 py-0.5 text-xs',
        },
        lg: {
            text: 'text-3xl',
            sub: 'text-xs tracking-widest',
            tagline: 'text-[10px]',
            badge: 'px-2.5 py-1 text-sm',
        },
        xl: {
            text: 'text-4xl',
            sub: 'text-sm tracking-widest',
            tagline: 'text-xs',
            badge: 'px-3 py-1 text-base',
        },
    }[size];

    const content = (
        <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    <span
                        className={`font-extrabold tracking-tight font-sans transition-colors ${sizeClasses.text} ${
                            isLight ? 'text-white' : 'text-[#0B1C30]'
                        }`}
                    >
                        L<span className="text-[#DA7A31]">M</span>C
                    </span>
                    {showSubtitle && (
                        <span
                            className={`font-semibold border-l pl-2 leading-none uppercase ${sizeClasses.sub} ${
                                isLight
                                    ? 'border-white/20 text-gray-300'
                                    : 'border-gray-300 text-[#4D4B55]'
                            }`}
                        >
                            Global Technologies
                        </span>
                    )}
                </div>
                {showTagline && (
                    <span
                        className={`font-medium tracking-wide ${sizeClasses.tagline} ${
                            isLight ? 'text-orange-400' : 'text-[#DA7A31]'
                        }`}
                    >
                        Technology Beyond Boundaries
                    </span>
                )}
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="inline-block transition-transform hover:opacity-95 focus:outline-none">
                {content}
            </Link>
        );
    }

    return content;
}
