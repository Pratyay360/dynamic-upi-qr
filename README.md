# Dynamic UPI QR Code Generator

> ⚠️ **Educational Project Disclaimer**: This is an educational project and is not affiliated with NPCI (National Payments Corporation of India) or BHIM (Bharat Interface for Money). The purpose of this project is for learning and demonstration purposes only.

A modern, responsive web application built with Next.js that generates dynamic UPI QR codes for seamless digital payments in India. This project demonstrates how to create personalized UPI payment links with custom amounts and transaction notes.

## 🚀 Features

- **Dynamic QR Generation**: Create UPI QR codes with custom amounts and notes
- **Enhanced Styling**: Professional QR codes with custom colors and branding
- **Payment Intent Links**: Direct "Pay Now" buttons for mobile users
- **Responsive Design**: Works perfectly on all devices
- **Educational Purpose**: Learn about UPI payment integration
- **Modern UI**: Beautiful interface with Tailwind CSS and Lottie animations

## 📱 How It Works

### Step 1: Enter Your Details
<img src="./public/1.png" width="500">

Enter your UPI ID, name, amount (optional), and transaction note (optional).

### Step 2: Generate QR Code
<img src="./public/2.png" width="500">

Click "Generate QR Code" to create your personalized payment QR.

### Step 3: Share Your Payment Link
<img src="https://wekwttnnowtwqzntesch.supabase.co/storage/v1/object/public/projects/upipay.webp" width="500">

Your QR code page is ready! Share it anywhere for instant payments.

## 🔗 API Usage

Generate QR codes programmatically using URL parameters:

```
https://your-domain.com/?upiid=<upi-id>&name=<name>&money=<amount>&note=<transaction-note>
```

**Parameters:**
- `upiid` (required): Your UPI ID (e.g., username@paytm)
- `name` (required): Payee name
- `money` (optional): Payment amount in INR
- `note` (optional): Transaction description

**Example:**
```
https://your-domain.com/?upiid=john@paytm&name=John%20Doe&money=100&note=Coffee%20Payment
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **QR Generation**: upiqrcode library
- **Animations**: Lottie React Player
- **Analytics**: Vercel Analytics

## 🚀 Deployment

### Recommended Platforms

1. **Vercel** (Recommended)
   - Zero configuration deployment
   - Automatic HTTPS
   - Global CDN

2. **Netlify**
   - Easy static site hosting
   - Continuous deployment from Git

3. **Cloudflare Pages**
   - Global edge network
   - Fast deployment

### Deploy Steps

1. Fork this repository
2. Connect your Git provider to your hosting platform
3. Deploy with default Next.js settings
4. Your UPI QR generator is live!

## 💻 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pratyay360/dynamic-upi-qr.git
   cd dynamic-upi-qr
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📦 Dependencies

```json
{
  "next": "^15.1.3",
  "react": "^19.0.0",
  "typescript": "^5.7.3",
  "tailwindcss": "^3.4.19",
  "upiqrcode": "^1.0.5",
  "@lottiefiles/react-lottie-player": "^3.6.4",
  "@vercel/analytics": "^2.0.0"
}
```

## 🎯 Educational Objectives

This project demonstrates:
- UPI payment integration in web applications
- Dynamic QR code generation
- Modern React/Next.js development practices
- TypeScript implementation
- Responsive design principles
- API parameter handling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Important Disclaimers

- **Educational Purpose Only**: This project is created for learning and demonstration purposes
- **Not Affiliated**: Not affiliated with NPCI, BHIM, or any official UPI service providers
- **No Commercial Use**: Not intended for commercial use or to compete with official UPI applications
- **Security Notice**: Always verify payment details before processing any transactions
- **Responsibility**: Users are responsible for ensuring compliance with local regulations

## 💡 Inspiration

Special thanks to [inulute](https://github.com/inulute/upi) for the initial inspiration.

## 📞 Support

If you find this project helpful for learning, please give it a ⭐ on GitHub!

---

**Repository**: [https://github.com/Pratyay360/dynamic-upi-qr](https://github.com/Pratyay360/dynamic-upi-qr)

<div align="center">
  <p>🎓 Created for Educational Purposes | 💡 Learn • Build • Share</p>
</div>
