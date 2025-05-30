"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useClientTheme } from '../hooks/useClientTheme';
export default function BlockElse() {
    const { isDark, mounted } = useClientTheme();

    // Prevent flash of unstyled content
    if (!mounted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-gray-50">
                <div className="w-full max-w-sm rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center bg-white">
                    <div className="animate-pulse">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded mb-4 w-32"></div>
                        <div className="space-y-2 w-full">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
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
            <div className={`w-full max-w-sm rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center transition-colors duration-300 ${
                isDark 
                    ? 'bg-gray-900/90 border border-gray-700/50' 
                    : 'bg-white/90 border border-gray-200/50'
            }`}>
                <div className="flex flex-col items-center mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 transition-colors duration-300 ${
                        isDark ? 'bg-red-600' : 'bg-red-500'
                    }`}>
                        <span className="text-2xl text-white">⚠️</span>
                    </div>
                    <h1 className={`text-lg font-bold mb-1 text-center transition-colors duration-300 ${
                        isDark ? 'text-red-400' : 'text-red-600'
                    }`}>Invalid Parameters</h1>
                    <p className={`text-sm text-center max-w-xs transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                        Please make sure you have entered your UPI ID and Name correctly. Both fields are required to generate a QR code.
                    </p>
                </div>
                <div className="w-full flex flex-col items-center mt-2">
                    <Link href="/" className="w-full">
                        <button className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-base shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                            isDark 
                                ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-900/25' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
                        }`}>
                            ← Go Back &amp; Try Again
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}