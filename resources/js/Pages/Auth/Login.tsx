import React, { useState, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Lock, Mail, LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

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

    return (
        <GuestLayout>
            <Head title="Enterprise Portal Sign In" />

            {/* Status Alert */}
            {status && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5 shadow-lg shadow-emerald-500/10">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{status}</span>
                </div>
            )}

            {/* Page Title & Subtitle */}
            <div className="mb-8 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Sign In to Portal
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                    Enter your authorized corporate credentials to access your management workspace.
                </p>
            </div>

            {/* Login Form */}
            <form onSubmit={submit} className="space-y-6">
                {/* Corporate Email */}
                <div>
                    <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                        Corporate Email Address *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Mail className="w-4 h-4" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            required
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            className="lmc-input-has-icon w-full text-sm rounded-xl border border-white/15 bg-[#071220] pl-11 pr-4 py-3.5 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/25 transition-all shadow-inner"
                            placeholder="user@lmcglobal.tech"
                        />
                    </div>
                    {errors.email && (
                        <InputError message={errors.email} className="mt-1.5" />
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                        Account Password *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Lock className="w-4 h-4" />
                        </div>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            required
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="lmc-input-has-icon w-full text-sm rounded-xl border border-white/15 bg-[#071220] pl-11 pr-11 py-3.5 text-white placeholder:text-gray-500 focus:border-[#DA7A31] focus:ring-2 focus:ring-[#DA7A31]/25 transition-all shadow-inner"
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4 text-[#DA7A31]" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <InputError message={errors.password} className="mt-1.5" />
                    )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white transition-colors select-none">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 rounded border-white/20 bg-[#071220] text-[#DA7A31] focus:ring-[#DA7A31]/30 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="font-medium">Remember Session</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs font-semibold text-[#DA7A31] hover:text-amber-400 transition-colors hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        id="submit-login-btn"
                        className="lmc-btn lmc-btn-primary group w-full py-3.5 rounded-xl font-bold text-sm tracking-wide justify-center shadow-lg shadow-[#DA7A31]/20 transition-all hover:scale-[1.01]"
                    >
                        <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>{processing ? 'Authenticating Credentials...' : 'Sign In to Portal'}</span>
                    </button>
                </div>

                {/* Security Footer Note */}
                <div className="pt-4 border-t border-white/10 text-center">
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                        Authorized Personnel Only &bull; Protected under SOC-2 Type II Enterprise Protocols.
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
