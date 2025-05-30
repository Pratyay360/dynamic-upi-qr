import { useState, useEffect, useCallback } from 'react';
import upiqrcode from 'upiqrcode';

interface QRResult {
  qr: string;
  intent: string;
}

interface QRState {
  qrCode: string;
  intentLink: string;
  isLoading: boolean;
  error: string | null;
}

interface QROptions {
  payeeVPA: string;
  payeeName: string;
  amount?: string;
  currency?: string;
  transactionNote?: string;
  transactionId?: string;
  minimumAmount?: string;
}

export const useQRGenerator = () => {
  const [state, setState] = useState<QRState>({
    qrCode: '',
    intentLink: '',
    isLoading: false,
    error: null
  });

  const generateQR = useCallback(async (options: QROptions): Promise<void> => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      // Add retry logic
      let attempts = 0;
      const maxAttempts = 3;
      let result: QRResult;

      while (attempts < maxAttempts) {
        try {
          result = await upiqrcode({
            payeeVPA: options.payeeVPA,
            payeeName: options.payeeName,
            amount: options.amount || '',
            currency: options.currency || 'INR',
            transactionNote: options.transactionNote || '',
            transactionId: options.transactionId || `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            minimumAmount: options.minimumAmount || options.amount || ''
          });
          break;
        } catch (error) {
          attempts++;
          if (attempts === maxAttempts) {
            throw error;
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }

      setState({
        qrCode: result!.qr,
        intentLink: result!.intent,
        isLoading: false,
        error: null
      });

      // Cache the result in localStorage for offline access
      try {
        const cacheKey = `qr_${options.payeeVPA}_${options.amount || '0'}`;
        localStorage.setItem(cacheKey, JSON.stringify(result!));
      } catch (cacheError) {
        console.warn('Failed to cache QR result:', cacheError);
      }

    } catch (error) {
      console.error('QR generation failed:', error);
      
      // Try to load from cache as fallback
      try {
        const cacheKey = `qr_${options.payeeVPA}_${options.amount || '0'}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const cachedResult = JSON.parse(cached);
          setState({
            qrCode: cachedResult.qr,
            intentLink: cachedResult.intent,
            isLoading: false,
            error: 'Using cached QR code (offline mode)'
          });
          return;
        }
      } catch (cacheError) {
        console.warn('Failed to load cached QR:', cacheError);
      }

      setState({
        qrCode: '',
        intentLink: '',
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to generate QR code. Please check your internet connection and try again.'
      });
    }
  }, []);

  const retry = useCallback((options: QROptions) => {
    generateQR(options);
  }, [generateQR]);

  const reset = useCallback(() => {
    setState({
      qrCode: '',
      intentLink: '',
      isLoading: false,
      error: null
    });
  }, []);

  return {
    ...state,
    generateQR,
    retry,
    reset
  };
};
