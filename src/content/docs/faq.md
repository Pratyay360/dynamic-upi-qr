---
title: "FAQ"
description: "Frequently asked questions about Dynamic UPI."
sidebar:
  order: 4
---

# FAQ

## Is my data safe?

Yes. Every step — QR encoding, SVG generation, and intent-link creation — happens entirely in your browser's memory. No data is sent to any server or stored anywhere.

## What UPI apps are supported?

Any app that can scan a UPI QR code or open a `upi://pay` intent link. This includes PhonePe, GPay, Paytm, BHIM, and most other UPI-enabled apps.

## Do I need to install anything?

No. The demos load the `upiqrcode` WebAssembly module directly from the jsDelivr CDN. If you want to use it in your own project, you can `npm install upiqrcode`.

## Why WebAssembly?

The QR encoding logic is written in Rust and compiled to WebAssembly. This gives you near-native performance, a tiny dependency tree, and the same output across every platform — all without any server-side processing.

## Can I set a custom amount?

Yes — the amount field is optional. Leave it blank for an open amount, or set a specific value like `150.00`.
