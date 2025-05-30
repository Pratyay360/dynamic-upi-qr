"use client";

import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUPIForm } from '../hooks/useUPIForm';
import { useClientTheme } from '../hooks/useClientTheme';
import { LottiePlayer } from './components/LottiePlayer';

export default function BlockFalse() {
    const { 
        formData, 
        errors, 
        isLoading, 
        updateField, 
        submitForm 
    } = useUPIForm();
    
    const { isDark, mounted } = useClientTheme();
    const router = useRouter();

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        updateField(field, value);
    };

    // Only show general or name/amount errors, not UPI provider errors
    const errorMsg = errors.general || errors.name || errors.amount || errors.note || (errors.upiId === 'UPI ID is required' ? errors.upiId : '');

    const handleSubmit = () => {
        submitForm((params) => {
            router.push(`/?${params.toString()}`);
        });
    };

    // Prevent flash of unstyled content
    if (!mounted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-gray-50">
                <div className="w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center bg-white">
                    <div className="animate-pulse">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded mb-4 w-48"></div>
                        <div className="space-y-3 w-full">
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center min-h-[60vh] w-full transition-colors duration-300 ${
            isDark 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
                : 'bg-gradient-to-br from-gray-50 to-blue-50'
        }`}>
            <div className={`w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center transition-colors duration-300 ${
                isDark 
                    ? 'bg-gray-900/90 border border-gray-700/50' 
                    : 'bg-white/90 border border-gray-200/50'
            }`}>
                {/* Header with icon */}
                <div className="flex flex-col items-center mb-4">
                  
                    <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-1 tracking-tight">
                        Create UPI QR Code
                    </h1>
                    <p className={`text-sm font-medium text-center max-w-xs transition-colors duration-300 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                        Generate your personalized UPI payment QR code instantly
                    </p>
                </div>

                {/* Form */}
                <form className="w-full space-y-3" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                    <div>
                        <label htmlFor="upi-id-input" className={`block text-sm font-semibold mb-1 transition-colors duration-300 ${
                            isDark ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            UPI ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="upi-id-input"
                            type="text"
                            value={formData.upiId}
                            onChange={e => handleInputChange('upiId', e.target.value)}
                            placeholder="e.g., business@paytm"
                            className={`w-full px-3 py-2 rounded-lg border text-base outline-none transition-all duration-300 ${
                                isDark 
                                    ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-900/20' 
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50'
                            }`}
                            required
                            aria-required="true"
                            aria-label="Payee UPI ID"
                            autoComplete="off"
                        />
                        {errors.upiId && errors.upiId === 'UPI ID is required' && (
                            <div className="text-red-600 text-xs mt-1">{errors.upiId}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="name-input" className={`block text-sm font-semibold mb-1 transition-colors duration-300 ${
                            isDark ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name-input"
                            type="text"
                            value={formData.name}
                            onChange={e => handleInputChange('name', e.target.value)}
                            placeholder="e.g., My Business"
                            className={`w-full px-3 py-2 rounded-lg border text-base outline-none transition-all duration-300 ${
                                isDark 
                                    ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-900/20' 
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50'
                            }`}
                            required
                            aria-required="true"
                            aria-label="Payee Name"
                            autoComplete="off"
                        />
                        {errors.name && <div className="text-red-600 text-xs mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label htmlFor="amount-input" className={`block text-sm font-semibold mb-1 transition-colors duration-300 ${
                            isDark ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            Amount <span className={`font-normal text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>(optional)</span>
                        </label>
                        <input
                            id="amount-input"
                            type="number"
                            value={formData.amount}
                            onChange={e => handleInputChange('amount', e.target.value)}
                            placeholder="Leave empty for flexible amount"
                            min="0"
                            step="0.01"
                            className={`w-full px-3 py-2 rounded-lg border text-base outline-none transition-all duration-300 ${
                                isDark 
                                    ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-900/20' 
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50'
                            }`}
                            aria-label="Amount (optional)"
                            autoComplete="off"
                        />
                        {errors.amount && <div className="text-red-600 text-xs mt-1">{errors.amount}</div>}
                    </div>

                    <div>
                        <label htmlFor="note-input" className={`block text-sm font-semibold mb-1 transition-colors duration-300 ${
                            isDark ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                            Note <span className={`font-normal text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>(optional)</span>
                        </label>
                        <input
                            id="note-input"
                            type="text"
                            value={formData.note}
                            onChange={e => handleInputChange('note', e.target.value)}
                            placeholder="Payment description"
                            className={`w-full px-3 py-2 rounded-lg border text-base outline-none transition-all duration-300 ${
                                isDark 
                                    ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-900/20' 
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50'
                            }`}
                            aria-label="Note (optional)"
                            autoComplete="off"
                        />
                        {errors.note && <div className="text-red-600 text-xs mt-1">{errors.note}</div>}
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg font-bold text-base shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                                isDark 
                                    ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-900/25' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
                            }`}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Generating...
                                </span>
                            ) : (
                                <span>Generate QR Code</span>
                            )}
                        </button>

                        {errorMsg && (
                            <div className={`mt-3 p-3 border text-sm font-medium rounded-xl shadow-sm transition-colors duration-300 ${
                                isDark 
                                    ? 'bg-red-900/30 border-red-700 text-red-300' 
                                    : 'bg-red-50 border-red-200 text-red-700'
                            }`} role="alert" aria-live="polite">
                                <span>{errorMsg}</span>
                            </div>
                        )}
                    </div>
                </form>

                {/* Animation Section under the button */}
                <div className="text-center mt-4">
                    <div className="flex justify-center mb-3">
                        <LottiePlayer
                          src="https://lottie.host/2b51d7af-7099-49f5-93df-f8190dde11bb/WU9eejAueC.json"
                          style={{ height: '80px', width: '80px' }}
                        />
                    </div>
                </div>

                {/* Decorative Section */}
                <div className="text-center mt-2">
                    <div className={`p-2 rounded-xl max-w-xs mx-auto transition-colors duration-300 ${
                        isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
                    }`}>
                        <p className={`text-xs font-bold transition-colors duration-300 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            🔒 Secure • ⚡ Fast • ✅ Reliable
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}