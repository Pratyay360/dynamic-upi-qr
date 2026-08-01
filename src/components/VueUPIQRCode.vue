<template>
  <div
    class="w-full max-w-xl mx-auto my-6 p-8 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 shadow-sm transition-all duration-300"
  >
    <div class="flex items-center gap-3 mb-6">
      <h3 class="text-md font-bold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
        Vue Component Island
      </h3>
    </div>

    <form @submit.prevent="handleGenerate" class="space-y-4">
      <div>
        <label
          class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5"
        >
          Payee UPI VPA <span class="text-stone-400 dark:text-stone-500">*</span>
        </label>
        <input
          type="text"
          required
          v-model="vpa"
          placeholder="e.g. success@upi"
          class="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-950 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
        />
      </div>

      <div>
        <label
          class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5"
        >
          Payee Name <span class="text-stone-400 dark:text-stone-500">*</span>
        </label>
        <input
          type="text"
          required
          v-model="name"
          placeholder="e.g. John Doe"
          class="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-950 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5"
          >
            Amount (INR) <span class="text-stone-400 dark:text-stone-500">(Optional)</span>
          </label>
          <input
            type="number"
            step="0.01"
            v-model="amount"
            placeholder="e.g. 150.00"
            class="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-955 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
          />
        </div>

        <div>
          <label
            class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5"
          >
            Note
          </label>
          <input
            type="text"
            v-model="note"
            placeholder="e.g. Payment"
            class="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-955 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
          />
        </div>
      </div>

      <div
        v-if="error"
        class="p-4 rounded-lg bg-amber-50 dark:bg-stone-955 border border-amber-200 dark:border-stone-800/80 text-amber-900 dark:text-stone-300 text-xs"
      >
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="loading || !libLoaded"
        class="w-full py-3.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-950 font-bold tracking-wide active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all text-sm"
      >
        {{ loading ? "Initializing WASM..." : "Generate QR Code" }}
      </button>
    </form>

    <div
      v-if="result"
      class="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col items-center"
    >
      <div
        class="p-4 rounded-xl bg-white text-neutral-900 border border-stone-200 flex justify-center items-center shadow-sm mb-6 qr-svg-container"
        v-html="result.qr"
      ></div>

      <div class="w-full space-y-3">
        <div
          class="flex items-center gap-2 p-3 bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg"
        >
          <span
            class="text-xs font-mono text-stone-600 dark:text-stone-400 truncate flex-1 block select-all"
          >
            {{ result.intent }}
          </span>
          <button
            @click="copyIntent"
            class="px-3 py-1.5 rounded bg-white hover:bg-stone-50 dark:bg-stone-900 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 active:scale-[0.97] transition-all whitespace-nowrap"
          >
            {{ copied ? "Copied! ✓" : "Copy" }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button
            @click="downloadSvg"
            class="py-3 px-4 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 active:scale-[0.98] transition-all"
          >
            Download SVG
          </button>
          <a
            :href="result.intent"
            class="py-3 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-xs font-semibold text-white dark:text-stone-955 text-center active:scale-[0.98] transition-all"
          >
            Open in App
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const vpa = ref("");
const name = ref("");
const amount = ref("");
const note = ref("Payment");
const result = ref(null);
const loading = ref(false);
const error = ref("");
const copied = ref(false);
const libLoaded = ref(false);
const upiqrcodeLib = ref(null);

onMounted(async () => {
  try {
    const url = "https://cdn.jsdelivr.net/npm/upiqrcode@1.5.5/upiqrcode.js";
    const mod = await import(/* @vite-ignore */ url);
    await mod.default(); // Initialize WASM
    upiqrcodeLib.value = mod;
    libLoaded.value = true;
  } catch (err) {
    console.error("Failed to load upiqrcode WASM library from CDN", err);
    error.value = "Failed to initialize UPI QR engine from CDN.";
  }
});

const handleGenerate = async () => {
  error.value = "";
  result.value = null;

  const trimmedVpa = vpa.value.trim();
  const trimmedName = name.value.trim();

  if (!trimmedVpa || trimmedVpa.length < 5 || !trimmedVpa.includes("@")) {
    error.value = "UPI VPA is required and must be a valid handle (e.g. name@bank, min 5 chars)";
    return;
  }
  if (!trimmedName || trimmedName.length < 4) {
    error.value = "Payee Name is required and must be at least 4 characters";
    return;
  }

  if (amount.value) {
    const numAmount = parseFloat(amount.value);
    if (isNaN(numAmount) || numAmount <= 0) {
      error.value = "Amount must be a valid positive number";
      return;
    }
  }

  if (!upiqrcodeLib.value) {
    error.value = "UPI QR engine is still loading. Please try again.";
    return;
  }

  loading.value = true;
  try {
    const params = {
      payeeVPA: trimmedVpa,
      payeeName: trimmedName,
      currency: "INR",
      transactionNote: note.value.trim() || "Payment",
    };

    if (amount.value.trim()) {
      params.amount = parseFloat(amount.value).toFixed(2);
    }

    const res = await upiqrcodeLib.value.upiqrcode(params);
    if (res && res.qr) {
      result.value = res;
    } else {
      error.value = "Failed to generate QR code. Verify inputs.";
    }
  } catch (err) {
    console.error(err);
    error.value = err.message || "Error occurred during QR generation.";
  } finally {
    loading.value = false;
  }
};

const copyIntent = () => {
  if (!result.value?.intent) return;
  navigator.clipboard.writeText(result.value.intent);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};

const downloadSvg = () => {
  if (!result.value?.qr) return;
  const blob = new Blob([result.value.qr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `upi-qr-${vpa.value.replace("@", "-")}.svg`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<style>
.qr-svg-container svg {
  width: 200px !important;
  height: 200px !important;
  display: block;
}
</style>
