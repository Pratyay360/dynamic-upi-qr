# Plain HTML Demo

This example demonstrates using upiqrcode in plain HTML via CDN.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UPI QR Code Generator - Plain HTML</title>
  <script src="https://cdn.jsdelivr.net/npm/upiqrcode@1.5.5/upiqrcode.js"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 600px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .container {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 12px;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #495057;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    input:focus {
      border-color: #6366f1;
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .generate-btn {
      background: #6366f1;
      color: white;
    }
    .generate-btn:hover:not(:disabled) {
      background: #5855eb;
    }
    .generate-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    .download-btn {
      background: #10b981;
      color: white;
    }
    .download-btn:hover:not(:disabled) {
      background: #059669;
    }
    .download-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    .qr-display {
      margin-top: 2rem;
      text-align: center;
    }
    .qr-image {
      max-width: 200px;
      padding: 1rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .error {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    .loading {
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 3px solid rgba(99, 102, 241, 0.3);
      border-radius: 50%;
      border-top-color: #6366f1;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Plain HTML QR Code Generator</h1>

    <div class="form-group">
      <label for="payeeVPA">Payee VPA:</label>
      <input type="text" id="payeeVPA" placeholder="example@payee">
    </div>

    <div class="form-group">
      <label for="amount">Amount:</label>
      <input type="text" id="amount" placeholder="100.00">
    </div>

    <div class="form-group">
      <label for="note">Note (optional):</label>
      <input type="text" id="note" placeholder="Customer Transaction">
    </div>

    <div class="form-group">
      <label for="currency">Currency:</label>
      <input type="text" id="currency" placeholder="INR" value="INR">
    </div>

    <div id="error" class="error"></div>

    <div class="button-group">
      <button class="generate-btn" id="generateBtn">
        Generate QR Code
      </button>
      <button class="download-btn" id="downloadBtn" disabled>
        Download QR Code
      </button>
    </div>

    <div id="qrDisplay" class="qr-display" style="display: none;">
      <h2>Generated QR Code</h2>
      <img id="qrImage" alt="QR Code" class="qr-image">
    </div>
  </div>

  <script>
    // upiqrcode is available globally from the CDN script
    // It provides: upiqrcode(params) and svg_qr_code(intent)

    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrDisplay = document.getElementById('qrDisplay');
    const qrImage = document.getElementById('qrImage');
    const errorDiv = document.getElementById('error');
    const payeeVPA = document.getElementById('payeeVPA');
    const amount = document.getElementById('amount');
    const note = document.getElementById('note');
    const currency = document.getElementById('currency');

    let qrCodeBase64 = '';

    generateBtn.addEventListener('click', async () => {
      const vpa = payeeVPA.value.trim();
      const amt = amount.value.trim();
      const nt = note.value.trim();
      const curr = currency.value.trim() || 'INR';

      if (!vpa || !amt) {
        errorDiv.textContent = 'Please fill in Payee VPA and Amount';
        return;
      }

      errorDiv.textContent = '';
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span class="loading"></span>Generating...';

      try {
        // Use upiqrcode from CDN
        const result = await upiqrcode({
          payeeVPA: vpa,
          amount: amt,
          currency: curr,
          transactionNote: nt || 'Payment'
        });

        if (result.qr) {
          qrCodeBase64 = result.qr;
          qrImage.src = `data:image/png;base64,${result.qr}`;
          qrDisplay.style.display = 'block';
          downloadBtn.disabled = false;
        }
      } catch (err) {
        errorDiv.textContent = 'Failed to generate QR Code: ' + err.message;
      } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate QR Code';
      }
    });

    downloadBtn.addEventListener('click', () => {
      if (!qrCodeBase64) return;

      const link = document.createElement('a');
      link.href = `data:image/png;base64,${qrCodeBase64}`;
      link.download = 'upi-qr-code.png';
      link.click();
    });
  </script>
</body>
</html>
```

## Interactive Demo

<PlainHTMLUPIQRCode client:visible />