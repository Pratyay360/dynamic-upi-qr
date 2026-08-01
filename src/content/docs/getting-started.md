---
title: "Getting Started"
description: "Learn how to use Dynamic UPI to generate instant payment QR codes."
sidebar:
  order: 1
---

# Getting Started

Welcome to **Dynamic UPI** — an open-source tool for generating instant, shareable UPI payment QR codes directly in your browser.

## What is Dynamic UPI?

Dynamic UPI lets anyone create a QR code that links directly to a UPI payment intent. You can customize the payee name, UPI ID, amount, and note. The generated QR code can be scanned by any UPI app (PhonePe, GPay, Paytm, BHIM, etc.) to complete the payment.

## Key Features

- **Instant QR generation** — no signup or app download required.
- **Customizable fields** — set name, UPI ID, amount, and transaction note.
- **UPI App deep link** — generates both a scannable QR image and a direct app link.
- **Privacy-first** — all processing happens in your browser. No data is stored or sent to a server.
- **Dark mode** — comfortable to use in any lighting.

## Try It Now

Jump straight into an interactive demo below — each one showcases the same Rust-to-WASM `upiqrcode` library running inside a different rendering framework:

- [React Demo](/react-demo) — React with hooks managing CDN-loaded WebAssembly
- [Vue Demo](/vue-demo) — Vue 3 Composition API
- [Svelte Demo](/svelte-demo) — Svelte reactive template
- [Plain HTML Demo](/html-demo) — Vanilla JavaScript, no framework

Or visit the [Overview](/) for the full architecture showcase.

## How It Works

The library is compiled from Rust to WebAssembly. When you generate a QR code, the WASM module runs entirely inside your browser's memory sandbox — no server round-trips, no tracking, no data retention.

1. Enter the **UPI VPA** (e.g. `success@upi`) and **payee name**.
2. Optionally set an **amount** and a **transaction note**.
3. Click **Generate QR Code** — the WASM module builds a vector SVG and a `upi://pay` intent link instantly.
4. Scan the QR with any UPI app, or tap **Open in App** to launch your payment app directly.

## Learn More

- [How to Use](/how-to-use/) — step-by-step usage instructions
- [UPI QR Format](/upi-format/) — the data format behind the QR codes and intent links
- [Privacy](/privacy/) — what data is (not) collected
- [FAQ](/faq/) — frequently asked questions
