import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Lock, Mail, ArrowRight, Shield } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const fillRole = (email: string) => {
        setData((prev) => ({
            ...prev,
            email: email,
            password: 'password',
        }));
    };

    return (
        <GuestLayout>
            <Head title="Enterprise Portal Sign In" />

            {status && (
                <div className="mb-4 text-xs font-semibold text-emerald-700 bg-emerald-50 p-3 rounded border border-emerald-200">
                    {status}
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-xl font-bold text-[#0B1C30]">Sign In to Management Portal</h2>
                <p className="text-xs text-gray-500 mt-1">
                    Enter your authorized corporate credentials to access your dashboard.
                </p>
            </div>

            {/* Quick-fill Demo Accounts for effortless testing */}
            <div className="mb-6 p-3 bg-gray-50 rounded border border-gray-200">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#DA7A31]" />
                    <span>Quick Demo Credentials:</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <button
                        type="button"
                        onClick={() => fillRole('admin@lmcglobal.tech')}
                        className="py-1.5 px-2 bg-white hover:bg-orange-50 hover:border-[#DA7A31] border border-gray-300 rounded font-semibold text-[#0B1C30] transition text-center"
                    >
                        Admin
                    </button>
                    <button
                        type="button"
                        onClick={() => fillRole('staff@lmcglobal.tech')}
                        className="py-1.5 px-2 bg-white hover:bg-orange-50 hover:border-[#DA7A31] border border-gray-300 rounded font-semibold text-[#0B1C30] transition text-center"
                    >
                        Staff
                    </button>
                    <button
                        type="button"
                        onClick={() => fillRole('intern@lmcglobal.tech')}
                        className="py-1.5 px-2 bg-white hover:bg-orange-50 hover:border-[#DA7A31] border border-gray-300 rounded font-semibold text-[#0B1C30] transition text-center"
                    >
                        Intern
                    </button>
                </div>
                <div className="text-[10px] text-gray-400 mt-1.5 text-center">
                    Default password: <code className="font-mono text-gray-600">password</code>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                        Corporate Email Address
                    </label>
                    <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full pl-9 text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-2"
                            autoComplete="username"
                            required
                            placeholder="user@lmcglobal.tech"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-[#0B1C30] mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full pl-9 text-xs rounded border-gray-300 focus:border-[#DA7A31] focus:ring-[#DA7A31] py-2"
                            autoComplete="current-password"
                            required
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer text-gray-600">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-[#DA7A31] focus:ring-[#DA7A31]"
                        />
                        <span>Remember session</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs text-[#DA7A31] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#DA7A31] hover:bg-[#C2631D] text-white font-bold text-xs py-2.5 rounded shadow transition flex items-center justify-center gap-2"
                    >
                        <span>{processing ? 'Authenticating...' : 'Sign In to Portal'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
