import React, { useState, useEffect, useRef } from "react";

// Types matching upiqrcode.d.ts
interface UpiqrcodeParams {
  payeeVPA?: string;
  payeeName?: string;
  amount?: string;
  transactionNote?: string;
  currency?: string;
}

interface UpiqrcodeResult {
  qr: string; // SVG string
  intent: string; // upi://pay intent link
}

export default function ReactUPIQRCode() {
  const [vpa, setVpa] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("Payment");
  const [result, setResult] = useState<UpiqrcodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const upiqrcodeRef = useRef<any>(null);

  // Load the WASM-bindgen library from CDN on mount
  useEffect(() => {
    let active = true;
    const initLib = async () => {
      try {
        const url = "https://cdn.jsdelivr.net/npm/upiqrcode@1.5.5/upiqrcode.js";
        const mod = await import(/* @vite-ignore */ url);
        await mod.default(); // Initialize WASM
        if (active) {
          upiqrcodeRef.current = mod;
        }
      } catch (err) {
        console.error("Failed to load upiqrcode WASM library from CDN", err);
        if (active) {
          setError("Failed to initialize UPI QR engine from CDN.");
        }
      }
    };
    void initLib();
    return () => {
      active = false;
    };
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // Frontend validations to avoid Rust panics/errors
    const trimmedVpa = vpa.trim();
    const trimmedName = name.trim();
    if (!trimmedVpa || trimmedVpa.length < 5 || !trimmedVpa.includes("@")) {
      setError("UPI VPA is required and must be a valid handle (e.g. name@bank, min 5 chars)");
      return;
    }
    if (!trimmedName || trimmedName.length < 4) {
      setError("Payee Name is required and must be at least 4 characters");
      return;
    }

    if (amount) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        setError("Amount must be a valid positive number");
        return;
      }
    }

    if (!upiqrcodeRef.current) {
      setError("UPI QR engine is still loading. Please try again in a moment.");
      return;
    }

    setLoading(true);
    try {
      const params: UpiqrcodeParams = {
        payeeVPA: trimmedVpa,
        payeeName: trimmedName,
        currency: "INR",
        transactionNote: note.trim() || "Payment",
      };

      if (amount.trim()) {
        params.amount = parseFloat(amount).toFixed(2);
      }

      // Generate using WASM
      const res = await upiqrcodeRef.current.upiqrcode(params);
      if (res && res.qr) {
        setResult(res);
      } else {
        setError("Failed to generate QR code. Verify inputs.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Error occurred during QR generation.");
    } finally {
      setLoading(false);
    }
  };

  const copyIntent = () => {
    if (!result?.intent) return;
    void navigator.clipboard.writeText(result.intent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvg = () => {
    if (!result?.qr) return;
    const blob = new Blob([result.qr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `upi-qr-${vpa.replace("@", "-")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-8 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-md font-bold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
          React Component
        </h3>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            Payee UPI VPA <span className="text-stone-400 dark:text-stone-500">*</span>
          </label>
          <input
            type="text"
            required
            value={vpa}
            onChange={(e) => setVpa(e.target.value)}
            placeholder="e.g. success@upi"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-950 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            Payee Name <span className="text-stone-400 dark:text-stone-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. John Doe"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-950 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
              Amount (INR) <span className="text-stone-400 dark:text-stone-500">(Optional)</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 150.00"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-950 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
              Note
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Payment"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-950 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-stone-950 border border-amber-200 dark:border-stone-800/80 text-amber-900 dark:text-stone-300 text-xs">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !upiqrcodeRef.current}
          className="w-full py-3.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-950 font-bold tracking-wide active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all text-sm"
        >
          {loading ? "Initializing WASM..." : "Generate QR Code"}
        </button>
      </form>

      {result && (
        <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col items-center">
          <div
            className="p-4 rounded-xl bg-white text-neutral-900 border border-stone-200 flex justify-center items-center shadow-sm mb-6"
            dangerouslySetInnerHTML={{ __html: result.qr }}
          />

          <div className="w-full space-y-3">
            <div className="flex items-center gap-2 p-3 bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg">
              <span className="text-xs font-mono text-stone-600 dark:text-stone-400 truncate flex-1 block select-all">
                {result.intent}
              </span>
              <button
                onClick={copyIntent}
                className="px-3 py-1.5 rounded bg-white hover:bg-stone-50 dark:bg-stone-900 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 active:scale-[0.97] transition-all whitespace-nowrap"
              >
                {copied ? "Copied! ✓" : "Copy"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={downloadSvg}
                className="py-3 px-4 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 active:scale-[0.98] transition-all"
              >
                Download SVG
              </button>
              <a
                href={result.intent}
                className="py-3 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-xs font-semibold text-white dark:text-stone-950 text-center active:scale-[0.98] transition-all"
              >
                Open in App
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
