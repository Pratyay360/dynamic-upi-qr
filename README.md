# Astro Starter Kit: Basics

```sh
bun create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `bun install`         | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

A lightweight Nodejs package to generate UPI QR codes dynamically . this is the reference documentation to showcase that..

## Quick Start

**Install**

```bash
npm install upiqrcode
```

**Usage**

```javascript
const { generateUPIQR } = require("upiqrcode");

const qr = generateUPIQR({
  upiid: "username@paytm",
  name: "John Doe",
  money: "100",
  note: "Coffee Payment",
});
```

vulns

Most JS-based QR generators are heavy and there dependency trees are crazy if you look into recent npm vulns. so made this a selfcontained rust based wasm . so that it depends on no crazy deps

## Disclaimer

This is an educational project. It isn't affiliated with NPCI, BHIM, or any official UPI provider. Use it for learning and testing purposes only.

**Repo**: [github.com/Pratyay360/dynamic-upi-qr](https://github.com/Pratyay360/dynamic-upi-qr)
