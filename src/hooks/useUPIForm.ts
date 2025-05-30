import { useState, useCallback } from 'react';

interface UPIFormData {
  upiId: string;
  name: string;
  amount: string;
  note: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Enhanced UPI validation - simplified to accept any valid UPI format
const validateUPI = (upiId: string): boolean => {
  // Basic validation: must contain @ and have at least 3 characters on each side
  if (!upiId.includes('@') || upiId.length < 6) {
    return false;
  }
  
  const parts = upiId.split('@');
  if (parts.length !== 2 || parts[0].length < 1 || parts[1].length < 1) {
    return false;
  }
  
  // Allow any alphanumeric characters, dots, hyphens, and underscores
  const validPattern = /^[\w\.-]+@[\w\.-]+$/;
  return validPattern.test(upiId);
};

// Validate amount with better formatting
const validateAmount = (amount: string): { isValid: boolean; cleanAmount: string; error?: string } => {
  if (!amount) return { isValid: true, cleanAmount: "0" };
  
  const num = parseFloat(amount);
  if (isNaN(num)) return { isValid: false, cleanAmount: "0", error: "Invalid amount format" };
  if (num < 0) return { isValid: false, cleanAmount: "0", error: "Amount cannot be negative" };
  if (num > 100000) return { isValid: false, cleanAmount: "100000", error: "Amount cannot exceed ₹1,00,000" };
  
  // Format to 2 decimal places if needed
  const formatted = num % 1 === 0 ? num.toString() : num.toFixed(2);
  return { isValid: true, cleanAmount: formatted };
};

export const useUPIForm = () => {
  const [formData, setFormData] = useState<UPIFormData>({
    upiId: '',
    name: '',
    amount: '',
    note: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateField = useCallback((field: keyof UPIFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [errors]);

  const validateForm = useCallback((): ValidationResult => {
    const newErrors: Record<string, string> = {};
    
    // Validate UPI ID
    if (!formData.upiId.trim()) {
      newErrors.upiId = "UPI ID is required";
    } else if (!validateUPI(formData.upiId)) {
      newErrors.upiId = "Please enter a valid UPI ID (e.g., user@paytm)";
    }
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Validate amount
    if (formData.amount) {
      const amountValidation = validateAmount(formData.amount);
      if (!amountValidation.isValid) {
        newErrors.amount = amountValidation.error || "Invalid amount";
      }
    }
    
    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  }, [formData]);

  const submitForm = useCallback((onSuccess: (params: URLSearchParams) => void) => {
    setIsLoading(true);
    
    const validation = validateForm();
    if (!validation.isValid) {
      setIsLoading(false);
      return;
    }

    try {
      const { cleanAmount } = validateAmount(formData.amount);
      
      const params = new URLSearchParams({
        upiid: formData.upiId.trim(),
        name: formData.name.trim(),
        money: cleanAmount,
        ...(formData.note.trim() && { note: formData.note.trim() })
      });
      
      onSuccess(params);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ general: 'An error occurred. Please try again.' });
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData({
      upiId: '',
      name: '',
      amount: '',
      note: ''
    });
    setErrors({});
    setIsLoading(false);
  }, []);

  return {
    formData,
    errors,
    isLoading,
    updateField,
    validateForm,
    submitForm,
    resetForm,
    setIsLoading
  };
};
