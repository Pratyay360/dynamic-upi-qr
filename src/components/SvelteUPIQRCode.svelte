<script>
  import { onMount } from 'svelte';

  let vpa = '';
  let name = '';
  let amount = '';
  let note = 'Payment';
  let result = null;
  let loading = false;
  let error = '';
  let copied = false;
  let libLoaded = false;
  let upiqrcodeLib = null;

  onMount(async () => {
    try {
      const url = 'https://cdn.jsdelivr.net/npm/upiqrcode@1.5.5/upiqrcode.js';
      const mod = await import(
        /* @vite-ignore */ url
      );
      await mod.default(); // Initialize WASM
      upiqrcodeLib = mod;
      libLoaded = true;
    } catch (err) {
      console.error('Failed to load upiqrcode WASM library from CDN', err);
      error = 'Failed to initialize UPI QR engine from CDN.';
    }
  });

  async function handleGenerate(e) {
    e.preventDefault();
    error = '';
    result = null;

    const trimmedVpa = vpa.trim();
    const trimmedName = name.trim();

    if (!trimmedVpa || trimmedVpa.length < 5 || !trimmedVpa.includes('@')) {
      error = 'UPI VPA is required and must be a valid handle (e.g. name@bank, min 5 chars)';
      return;
    }
    if (!trimmedName || trimmedName.length < 4) {
      error = 'Payee Name is required and must be at least 4 characters';
      return;
    }

    if (amount) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        error = 'Amount must be a valid positive number';
        return;
      }
    }

    if (!upiqrcodeLib) {
      error = 'UPI QR engine is still loading. Please try again.';
      return;
    }

    loading = true;
    try {
      const params = {
        payeeVPA: trimmedVpa,
        payeeName: trimmedName,
        currency: 'INR',
        transactionNote: note.trim() || 'Payment',
      };

      if (amount.trim()) {
        params.amount = parseFloat(amount).toFixed(2);
      }

      const res = await upiqrcodeLib.upiqrcode(params);
      if (res && res.qr) {
        result = res;
      } else {
        error = 'Failed to generate QR code. Verify inputs.';
      }
    } catch (err) {
      console.error(err);
      error = err.message || 'Error occurred during QR generation.';
    } finally {
      loading = false;
    }
  }

  function copyIntent() {
    if (!result?.intent) return;
    void navigator.clipboard.writeText(result.intent);
    copied = true;
    setTimeout(() => copied = false, 2000);
  }

  function downloadSvg() {
    if (!result?.qr) return;
    const blob = new Blob([result.qr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upi-qr-${vpa.replace('@', '-')}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="w-full max-w-xl mx-auto my-6 p-8 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 shadow-sm transition-all duration-300">
  <div class="flex items-center gap-3 mb-6">
    <h3 class="text-md font-bold tracking-tight text-stone-900 dark:text-stone-100 uppercase font-sans">Svelte Component Island</h3>
  </div>

  <form on:submit={handleGenerate} class="space-y-4">
    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
        Payee UPI VPA <span class="text-stone-400 dark:text-stone-500">*</span>
      </label>
      <input
        type="text"
        required
        bind:value={vpa}
        placeholder="e.g. success@upi"
        class="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-955 border border-stone-300 dark:border-stone-800 text-stone-955 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
      />
    </div>

    <div>
      <label class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
        Payee Name <span class="text-stone-400 dark:text-stone-500">*</span>
      </label>
      <input
        type="text"
        required
        bind:value={name}
        placeholder="e.g. John Doe"
        class="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-955 border border-stone-300 dark:border-stone-800 text-stone-955 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
          Amount (INR) <span class="text-stone-400 dark:text-stone-500">(Optional)</span>
        </label>
        <input
          type="number"
          step="0.01"
          bind:value={amount}
          placeholder="e.g. 150.00"
          class="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-955 border border-stone-300 dark:border-stone-800 text-stone-955 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
        />
      </div>

      <div>
        <label class="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
          Note
        </label>
        <input
          type="text"
          bind:value={note}
          placeholder="e.g. Payment"
          class="w-full px-4 py-3 rounded-lg bg-white dark:bg-stone-955 border border-stone-300 dark:border-stone-800 text-stone-955 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-500/10 focus:border-stone-500 dark:focus:border-stone-700 transition-all font-sans text-sm"
        />
      </div>
    </div>

    {#if error}
      <div class="p-4 rounded-lg bg-amber-50 dark:bg-stone-955 border border-amber-200 dark:border-stone-800/80 text-amber-900 dark:text-stone-300 text-xs">
        {error}
      </div>
    {/if}

    <button
      type="submit"
      disabled={loading || !libLoaded}
      class="w-full py-3.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-955 font-bold tracking-wide active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all text-sm"
    >
      {loading ? 'Initializing WASM...' : 'Generate QR Code'}
    </button>
  </form>

  {#if result}
    <div class="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col items-center">
      <div class="p-4 rounded-xl bg-white text-neutral-900 border border-stone-200 flex justify-center items-center shadow-sm mb-6 qr-svg-container">
        {@html result.qr}
      </div>

      <div class="w-full space-y-3">
        <div class="flex items-center gap-2 p-3 bg-stone-100 dark:bg-stone-955 border border-stone-200 dark:border-stone-800 rounded-lg">
          <span class="text-xs font-mono text-stone-600 dark:text-stone-400 truncate flex-1 block select-all">
            {result.intent}
          </span>
          <button
            on:click={copyIntent}
            class="px-3 py-1.5 rounded bg-white hover:bg-stone-50 dark:bg-stone-900 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 active:scale-[0.97] transition-all whitespace-nowrap"
          >
            {copied ? 'Copied! ✓' : 'Copy'}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button
            on:click={downloadSvg}
            class="py-3 px-4 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 active:scale-[0.98] transition-all"
          >
            Download SVG
          </button>
          <a
            href={result.intent}
            class="py-3 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-xs font-semibold text-white dark:text-stone-955 text-center active:scale-[0.98] transition-all"
          >
            Open in App
          </a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(.qr-svg-container svg) {
    width: 200px !important;
    height: 200px !important;
    display: block;
  }
</style>
