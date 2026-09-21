import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// Global Event Listener for Date and Time Pickers
if (typeof window !== 'undefined') {
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // If user clicked directly on a date, time, or datetime-local input
        if (target instanceof HTMLInputElement && ['date', 'time', 'datetime-local'].includes(target.type)) {
            try {
                target.showPicker();
            } catch (err) {}
            return;
        }

        // If user clicked on a wrapper or calendar/clock icon next to the input
        const wrapper = target.closest('.relative, .lmc-date-input-wrapper');
        if (wrapper) {
            const input = wrapper.querySelector('input[type="date"], input[type="time"], input[type="datetime-local"]') as HTMLInputElement | null;
            if (input && target !== input) {
                try {
                    input.focus();
                    input.showPicker();
                } catch (err) {}
            }
        }
    });
}
