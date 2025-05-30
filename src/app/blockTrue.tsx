"use client";
import { useState, useEffect } from 'react';
import upiqrcode from 'upiqrcode';
import Image from 'next/image';
import jso from '../data.json';
import Link from 'next/link';
import { useClientTheme } from '../hooks/useClientTheme';
import { LottiePlayer } from './components/LottiePlayer';

interface UPIOptions {
  payeeVPA: string;
  payeeName: string;
  amount?: string;
  currency?: string;
  transactionNote?: string;
  transactionId?: string;
  minimumAmount?: string;
  colorDark?: string;
  colorLight?: string;
  margin?: number;
  scale?: number;
  embedLogo?: boolean;
  logo?: string;
}

const createPaymentQR = async (amount: string, note: string) => {
  return await upiqrcode({
    payeeVPA: jso.UPI || "business@upi",
    payeeName: jso.NAME || "My Business",
    amount: amount,
    currency: "INR",
    transactionNote: note,
    transactionId: `TXN_${Date.now()}`,
    minimumAmount: amount
  });
};

export default function BlockTrue() {
    const { isDark, mounted } = useClientTheme();
    const [qrCode, setQrCode] = useState("");
    const [intentLink, setIntentLink] = useState("");
    const [currentUpiId, setCurrentUpiId] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (jso.UPI && jso.NAME) {
            setCurrentUpiId(jso.UPI);
            setCurrentAmount(jso.MONEY);
            setIsLoading(true);
            setError("");
            createPaymentQR(jso.MONEY, jso.NOTE)
                .then((upi: { qr: string, intent: string }) => {
                    setQrCode(upi.qr);
                    setIntentLink(upi.intent);
                    setIsLoading(false);
                })
                .catch((err: Error) => {
                    console.error("Error generating QR code:", err);
                    setError("Failed to generate QR code. Please try again.");
                    setIsLoading(false);
                });
        }
    }, []); 

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(currentUpiId);
            const copyId = document.getElementById('copy-id');
            if (copyId) {
                const originalText = copyId.innerHTML;
                copyId.innerHTML = `
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Copied!
                `;
                copyId.className = copyId.className.replace('bg-blue-600 hover:bg-blue-700', 'bg-green-600 hover:bg-green-700');
                
                setTimeout(() => {
                    copyId.innerHTML = originalText;
                    copyId.className = copyId.className.replace('bg-green-600 hover:bg-green-700', 'bg-blue-600 hover:bg-blue-700');
                }, 2000);
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = currentUpiId;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                const copyId = document.getElementById('copy-id');
                if (copyId) {
                    copyId.innerHTML = "Copied!";
                    setTimeout(() => {
                        copyId.innerHTML = "Copy UPI ID";
                    }, 2000);
                }
            } catch (fallbackErr) {
                console.error('Fallback copy failed: ', fallbackErr);
            }
            document.body.removeChild(textArea);
        }
    };

    // Use resolvedTheme to avoid hydration mismatch
    
    // Prevent flash of unstyled content
    if (!mounted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-gray-50">
                <div className="w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center bg-white">
                    <div className="animate-pulse">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded mb-4 w-48"></div>
                        <div className="space-y-3 w-full">
                            <div className="h-48 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
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
                    <div className="flex flex-col items-center mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 mb-4 shadow-lg animate-spin-slow">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Generating Your QR Code</h2>
                        <p className={`mt-2 text-base sm:text-lg font-semibold text-center transition-colors duration-300 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>Please wait while we create your payment QR code...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`container px-1 py-6 sm:px-3 sm:py-12 mx-auto text-center transition-colors duration-300 ${
                isDark ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
                <div className="qr-container items-center justify-center">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-red-500 to-pink-600 mb-6 shadow-2xl">
                            <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-6 transition-colors duration-300 ${
                        isDark ? 'text-red-400' : 'text-red-600'
                    }`}>Oops! Something went wrong</h2>
                    <div className={`p-6 border-2 rounded-2xl mb-8 transition-colors duration-300 ${
                        isDark 
                            ? 'bg-gradient-to-r from-red-900/20 to-pink-900/20 border-red-700' 
                            : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
                    }`}>
                        <p className={`mb-6 text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                            isDark ? 'text-red-300' : 'text-red-700'
                        }`}>{error}</p>
                    </div>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-4 text-white font-bold rounded-2xl transition-all duration-400 text-lg sm:text-xl overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                        aria-label="Try generating QR code again"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-40 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <div className="relative flex items-center gap-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Try Again</span>
                        </div>
                    </button>
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
                {/* Header */}
                <div className="flex flex-col items-center mb-4">
                    <h1 className="text-xl font-extrabold bg-gradient-to-r from-green-600 via-blue-600 to-purple-500 bg-clip-text text-transparent mb-1 tracking-tight">Your UPI QR Code</h1>
                    <p className={`text-sm font-medium text-center max-w-xs transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>Scan or share this QR to receive payments</p>
                </div>
                {/* QR Code */}
                <div className="w-full flex flex-col items-center my-4">
                    {qrCode ? (
                        <Image 
                            src={qrCode} 
                            alt="UPI QR Code" 
                            width={192}
                            height={192}
                            className={`w-48 h-48 rounded-xl border shadow-md object-contain transition-colors duration-300 ${
                                isDark ? 'border-gray-600 bg-white' : 'border-gray-200 bg-white'
                            }`}
                        />
                    ) : (
                        <div className={`w-48 h-48 flex items-center justify-center rounded-xl animate-pulse transition-colors duration-300 ${
                            isDark ? 'bg-gray-800' : 'bg-gray-100'
                        }`}>
                            <span className={`transition-colors duration-300 ${
                                isDark ? 'text-gray-500' : 'text-gray-400'
                            }`}>Loading...</span>
                        </div>
                    )}
                </div>
                {/* UPI ID and Amount */}
                <div className="w-full flex flex-col items-center gap-2 mb-4">
                    <div className={`flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold transition-colors duration-300 ${
                        isDark 
                            ? 'bg-gray-800 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                        <span className="font-bold">UPI:</span> <span className="truncate max-w-[10rem]">{currentUpiId}</span>
                    </div>
                    {currentAmount && currentAmount !== "0" && (
                        <div className={`flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold transition-colors duration-300 ${
                            isDark 
                                ? 'bg-blue-900/50 text-blue-300' 
                                : 'bg-blue-100 text-blue-700'
                        }`}>
                            <span className="font-bold">₹</span> {currentAmount}
                        </div>
                    )}
                </div>
                {/* Action Buttons */}
                <div className="w-full flex flex-col sm:flex-row gap-2 mt-2">
                    <Link href={intentLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <button className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-base shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                            isDark 
                                ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-900/25' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
                        }`}>
                            Open in UPI App
                        </button>
                    </Link>
                    <button onClick={() => navigator.clipboard.writeText(currentUpiId)} className={`flex-1 w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-base shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                        isDark 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 shadow-gray-800/25' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-gray-300/25'
                    }`}>
                        Copy UPI ID
                    </button>
                </div>

                {/* Animation Section under the buttons */}
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
                            🎯 Ready to Use • 📱 Scan & Pay • ✨ Instant
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}