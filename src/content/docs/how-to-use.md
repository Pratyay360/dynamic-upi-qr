---
title: "How to Use"
description: "Step-by-step guide to generating UPI QR codes with Dynamic UPI."
sidebar:
  order: 2
---

# How to Use

Dynamic UPI is designed to be instant and friction-free. Here's how to generate a UPI payment QR code:

## 1. Enter the Payee VPA

Type a valid UPI Virtual Payment Address (VPA), such as `success@upi` or `john@okicici`. The VPA must:
- Be at least 5 characters long
- Contain an `@` symbol

## 2. Enter the Payee Name

Provide the name of the person or merchant receiving the payment (minimum 4 characters).

## 3. (Optional) Set Amount and Note

- **Amount** — a positive number, e.g. `150.00`
- **Note** — a short description that appears in the payer's UPI app, e.g. `Coffee`

## 4. Generate

Click the **Generate QR Code** button. The Rust-to-WASM library compiles instantly in your browser and produces:

- A **vector SVG QR code** you can scan with any UPI app
- A **`upi://pay` intent link** you can copy or open directly in a UPI app

## Framework Demos

Every demo uses the same `@1.5.5` CDN build — the only difference is the surrounding framework:

| Framework | Component              | Where to try     |
| --------- | ---------------------- | ---------------- |
| React     | `ReactUPIQRCode.tsx`   | `/react-demo`    |
| Vue 3     | `VueUPIQRCode.vue`     | `/vue-demo`      |
| Svelte    | `SvelteUPIQRCode.svelte` | `/svelte-demo` |
| Plain HTML| `PlainHTMLUPIQRCode.astro` | `/html-demo`   |

## Install the Package (NPM)

If you want to use the library in your own project:

```bash
npm install upiqrcode
```

```javascript
const { upiqrcode } = require('upiqrcode');

const result = await upiqrcode({
  payeeVPA: 'success@upi',
  payeeName: 'John Doe',
  amount: '150.00',
  currency: 'INR',
  transactionNote: 'Coffee',
});
// result.qr      → SVG string
// result.intent → upi://pay?... intent link
```
