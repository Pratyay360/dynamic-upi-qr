"use client";

import { useState, useEffect } from "react";
import upiqrcode from "upiqrcode";
import jso from "../data.json";
import { useClientTheme } from "../hooks/useClientTheme";
import { LottiePlayer } from "./components/LottiePlayer";

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
    minimumAmount: amount,
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
        .then((upi: { qr: string; intent: string }) => {
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
      const copyId = document.getElementById("copy-id");
      if (copyId) {
        const originalText = copyId.innerHTML;
        copyId.innerHTML = `
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Copied!
                `;
        copyId.className = copyId.className.replace(
          "bg-blue-600 hover:bg-blue-700",
          "bg-green-600 hover:bg-green-700",
        );

        setTimeout(() => {
          copyId.innerHTML = originalText;
          copyId.className = copyId.className.replace(
            "bg-green-600 hover:bg-green-700",
            "bg-blue-600 hover:bg-blue-700",
          );
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      const textArea = document.createElement("textarea");
      textArea.value = currentUpiId;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        const copyId = document.getElementById("copy-id");
        if (copyId) {
          copyId.innerHTML = "Copied!";
          setTimeout(() => {
            copyId.innerHTML = "Copy UPI ID";
          }, 2000);
        }
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  if (!mounted) {
    return (
      <div
        className={`w-full flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`w-48 h-48 flex items-center justify-center rounded-xl animate-pulse transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <span
            className={`transition-colors duration-300 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`w-full flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`p-4 border rounded-xl text-sm font-medium transition-colors duration-300 ${
            isDark
              ? "bg-red-900/30 border-red-700 text-red-300"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full flex flex-col items-center p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-sm rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center transition-colors duration-300 ${
          isDark
            ? "bg-gray-900/90 border border-gray-700/50"
            : "bg-white/90 border border-gray-200/50"
        }`}
      >
        {/* QR Code */}
        {qrCode ? (
          <img
            src={qrCode}
            alt="UPI QR Code"
            className={`w-48 h-48 object-contain transition-colors duration-300 ${
              isDark ? "border-gray-600 bg-white" : "border-gray-200 bg-white"
            }`}
          />
        ) : (
          <div
            className={`w-48 h-48 flex items-center justify-center rounded-xl animate-pulse transition-colors duration-300 ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <span
              className={`transition-colors duration-300 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Loading...
            </span>
          </div>
        )}
      </div>
      {/* UPI ID and Amount */}
      <div className="w-full flex flex-col items-center gap-2 mb-4">
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold transition-colors duration-300 ${
            isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
          }`}
        >
          <span className="font-bold">UPI:</span>{" "}
          <span className="truncate max-w-40">{currentUpiId}</span>
        </div>
        {currentAmount && currentAmount !== "0" && (
          <div
            className={`flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold transition-colors duration-300 ${
              isDark ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700"
            }`}
          >
            <span className="font-bold">₹</span> {currentAmount}
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-2 mt-2">
        <a href={intentLink} target="_blank" rel="noopener noreferrer" className="flex-1">
          <button
            className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-base shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              isDark
                ? "bg-blue-700 hover:bg-blue-800 text-white shadow-blue-900/25"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25"
            }`}
          >
            Open in UPI App
          </button>
        </a>
        <button
          onClick={() => navigator.clipboard.writeText(currentUpiId)}
          className={`flex-1 w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-base shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
            isDark
              ? "bg-gray-700 hover:bg-gray-600 text-gray-200 shadow-gray-800/25"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-gray-300/25"
          }`}
        >
          Copy UPI ID
        </button>
      </div>

      {/* Animation Section under the buttons */}
      <div className="text-center mt-4">
        <div className="flex justify-center mb-3">
          <LottiePlayer
            src="https://lottie.host/2b51d7af-7099-49f5-93df-f8190dde11bb/WU9eejAueC.json"
            style={{ height: "80px", width: "80px" }}
          />
        </div>
      </div>

      {/* Decorative Section */}
      <div className="text-center mt-2">
        <div
          className={`p-2 rounded-xl max-w-xs mx-auto transition-colors duration-300 ${
            isDark ? "bg-gray-800/50" : "bg-gray-100/50"
          }`}
        >
          <p
            className={`text-xs font-bold transition-colors duration-300 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            🎯 Ready to Use • 📱 Scan & Pay • ✨ Instant
          </p>
        </div>
      </div>

      <div className="text-center mt-3">
        <a
          href="/docs/getting-started/"
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 transition-colors"
        >
          📖 Docs & How to Use
        </a>
      </div>
    </div>
  );
}
