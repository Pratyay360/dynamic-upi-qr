"use client";
import { Suspense } from "react";
import Body from "./index";
import "./globals.css";
import { useClientTheme } from '../hooks/useClientTheme';

function LoadingFallback() {
  const { isDark, mounted } = useClientTheme();
  
  if (!mounted) {
    return (
      <div className="container px-5 py-24 mx-auto text-center">
        <div className="qr-container bg-gray-100 items-center justify-center p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container px-5 py-24 mx-auto text-center transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`qr-container items-center justify-center p-8 rounded-2xl transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>Loading...</h2>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto transition-colors duration-300 ${
          isDark ? 'border-white' : 'border-gray-800'
        }`}></div>
      </div>
    </div>
  );
}

function EducationalDisclaimer() {
  const { isDark, mounted } = useClientTheme();
  
  if (!mounted) {
    return (
      <div className="educational-disclaimer fixed bottom-0 left-0 right-0 z-50 py-3 px-4 text-center bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50">
        <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
          <span className="text-yellow-400 text-base animate-pulse">⚠️</span>
          <span className="text-xs sm:text-sm font-medium tracking-wide text-gray-200">
            This is an educational project, not affiliated with NPCI/BHIM. Learn more at{" "}
            <a
              href="https://github.com/Pratyay360/dynamic-upi-qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors duration-200"
            >
              GitHub
            </a>
          </span>
          <span className="text-blue-400 text-base">🎓</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`educational-disclaimer fixed bottom-0 left-0 right-0 z-50 py-3 px-4 text-center backdrop-blur-md border-t transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/95 border-gray-700/50' 
        : 'bg-white/95 border-gray-200/50'
    }`}>
      <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
        <span className="text-yellow-400 text-base animate-pulse">⚠️</span>
        <span className={`text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 ${
          isDark ? 'text-gray-200' : 'text-gray-700'
        }`}>
          This is an educational project, not affiliated with NPCI/BHIM. Learn more at{" "}
          <a
            href="https://github.com/Pratyay360/dynamic-upi-qr"
            target="_blank"
            rel="noopener noreferrer"
            className={`underline underline-offset-2 transition-colors duration-200 ${
              isDark 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-500'
            }`}
          >
            GitHub
          </a>
        </span>
        <span className={`text-base transition-colors duration-300 ${
          isDark ? 'text-blue-400' : 'text-blue-600'
        }`}>🎓</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content="upi qrcode" />
      </header>
      <div>
        <Suspense fallback={<LoadingFallback />}>
          <Body />
          <EducationalDisclaimer />
        </Suspense>
      </div>
    </>
  );
}
