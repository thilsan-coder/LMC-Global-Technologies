import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{ts,tsx,js,jsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                lmc: {
                    navy: {
                        DEFAULT: '#0B1C30',
                        50: '#F4F7FB',
                        100: '#E7EEF6',
                        200: '#C8D9EC',
                        800: '#132842',
                        900: '#0B1C30',
                        950: '#06101D',
                    },
                    orange: {
                        DEFAULT: '#DA7A31',
                        50: '#FFF7ED',
                        100: '#FFEDD5',
                        400: '#E88B44',
                        500: '#DA7A31',
                        600: '#C2631D',
                        700: '#9C4E15',
                    },
                    gray: {
                        DEFAULT: '#F0F0F1',
                        50: '#FAF9F9',
                        100: '#F0F0F1',
                        200: '#E2E2E5',
                        300: '#C9C9CF',
                    },
                    charcoal: {
                        DEFAULT: '#4D4B55',
                        400: '#6C6A76',
                        500: '#4D4B55',
                        700: '#34323A',
                    }
                }
            }
        },
    },

    plugins: [],
};
