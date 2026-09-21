import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface CustomDropdownOption {
    value: string;
    label: string;
}

export interface CustomDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: CustomDropdownOption[];
    variant?: 'navy' | 'white';
    icon?: React.ElementType;
    className?: string;
    placeholder?: string;
    align?: 'left' | 'right';
}

export default function CustomDropdown({
    value,
    onChange,
    options,
    variant = 'navy',
    icon: Icon,
    className = '',
    placeholder = 'Select Option',
    align = 'left',
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isNavy = variant === 'navy';

    return (
        <div ref={dropdownRef} className={`relative w-full sm:w-auto shrink-0 ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between gap-3 px-3.5 h-[42px] text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs ${
                    isNavy
                        ? 'bg-[#0B1C30] text-white hover:bg-[#132B4A] border border-[#0B1C30]'
                        : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 focus:border-[#DA7A31]'
                } ${isOpen ? 'ring-2 ring-[#DA7A31]/50 border-[#DA7A31]' : ''}`}
            >
                <div className="flex items-center gap-2.5 min-w-0 flex-1 text-left">
                    {Icon && (
                        <Icon className={`w-4 h-4 shrink-0 ${isNavy ? 'text-[#DA7A31]' : 'text-gray-400'}`} />
                    )}
                    <span className="whitespace-nowrap truncate text-left max-w-[200px] sm:max-w-none">
                        {selectedOption?.label || placeholder}
                    </span>
                </div>
                <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isNavy ? 'text-white/80' : 'text-gray-400'
                    } ${isOpen ? 'rotate-180 text-[#DA7A31]' : ''}`}
                />
            </button>

            {isOpen && (
                <div
                    className={`absolute ${
                        align === 'right' ? 'right-0' : 'left-0'
                    } top-full mt-2 w-max min-w-full max-w-xs bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100`}
                >
                    <div className="max-h-60 overflow-y-auto space-y-0.5 custom-scrollbar">
                        {options.map((opt) => {
                            const isSelected = opt.value === value;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                                        isSelected
                                            ? 'bg-orange-50/80 text-[#DA7A31] font-semibold'
                                            : 'text-gray-700 hover:bg-slate-50 hover:text-gray-900'
                                    }`}
                                >
                                    <span className="whitespace-nowrap">{opt.label}</span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-[#DA7A31] shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
