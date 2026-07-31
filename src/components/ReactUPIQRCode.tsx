import { useState, useEffect } from 'react';

export default function ReactUPIQRCode() {
  const [vpa, setVpa] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('UPI Payment');
  const [currency, setCurrency] = useState('INR');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/upiqrcode@1.5.5/upiqrcode.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const generateQR = async () => {
    if (!vpa || !amount) {
      setError('Please fill in all required fields');
      return;
    }

    setError('');
    setQrCode('');
    setLoading(true);

    try {
      if (!window.upiqrcode) {
        setError('upiqrcode library not loaded. Please wait...');
        return;
      }

      const result = await window.upiqrcode({
        payeeVPA: vpa,
        amount: amount,
        currency: currency,
        transactionNote: note
      });

      if (result && result.qr) {
        setQrCode(result.qr);
        setError('');
      } else {
        setError('Failed to generate QR code');
      }
    } catch (err) {
      setError('Error: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${qrCode}`;
    link.download = 'upi-qr-code.png';
    link.click();
  };

  return (
    <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#f9fafb', maxWidth: '600px', margin: '2rem auto' }}>
      <h3 style={{ marginTop: 0, color: '#1f2937' }}>React UPI QR Generator</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={{ fontWeight: 500, color: '#374151' }}>UPI VPA:</label>
        <input 
          type="text" 
          value={vpa}
          onChange={(e) => setVpa(e.target.value)}
          placeholder="Enter UPI VPA (e.g., example@paytm)" 
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', fontSize: '1rem' }}
        />
        
        <label style={{ fontWeight: 500, color: '#374151' }}>Amount (₹):</label>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount" 
          min="1"
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', fontSize: '1rem' }}
        />
        
        <label style={{ fontWeight: 500, color: '#374151' }}>Note (optional):</label>
        <input 
          type="text" 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter note (optional)"
          style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', fontSize: '1rem' }}
        />
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            onClick={generateQR}
            disabled={loading || !vpa || !amount}
            style={{ 
              backgroundColor: loading || !vpa || !amount ? '#9ca3af' : '#3b82f6',
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.375rem', 
              fontWeight: 500, 
              cursor: loading || !vpa || !amount ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            {loading ? 'Generating...' : 'Generate QR Code'}
          </button>
          
          <button 
            onClick={downloadQR}
            disabled={!qrCode}
            style={{ 
              backgroundColor: !qrCode ? '#9ca3af' : '#10b981',
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.375rem', 
              fontWeight: 500, 
              cursor: !qrCode ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            Download QR
          </button>
        </div>
        
        {error && <div style={{ color: '#dc2626', marginTop: '0.5rem' }}>{error}</div>}
        
        {qrCode && !loading && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <img 
              src={`data:image/png;base64,${qrCode}`}
              alt="UPI QR Code"
              style={{ maxWidth: '200px', margin: '0 auto', display: 'block' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
