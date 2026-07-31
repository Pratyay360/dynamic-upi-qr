import { useState, useCallback } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUPI(value: string): string | undefined {
  if (!value.trim()) return "UPI ID is required";
  if (!EMAIL_REGEX.test(value)) return "UPI ID format looks invalid";
}

function validateName(value: string): string | undefined {
  if (!value.trim()) return "Name is required";
  if (value.trim().length < 2) return "Name must be at least 2 characters";
}

function validateAmount(value: string): string | undefined {
  if (!value) return undefined;
  const num = Number(value);
  if (Number.isNaN(num) || num < 0) return "Amount must be a positive number";
}

function validateNote(value: string): string | undefined {
  if (value && value.length > 100) return "Note must be under 100 characters";
}

export type FormData = {
  upiId: string;
  name: string;
  amount: string;
  note: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

export function useUPIForm() {
  const [formData, setFormData] = useState<FormData>({
    upiId: "",
    name: "",
    amount: "",
    note: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const next: FormErrors = {};
    const upiError = validateUPI(formData.upiId);
    const nameError = validateName(formData.name);
    const amountError = validateAmount(formData.amount);
    const noteError = validateNote(formData.note);

    if (upiError) next.upiId = upiError;
    if (nameError) next.name = nameError;
    if (amountError) next.amount = amountError;
    if (noteError) next.note = noteError;

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [formData]);

  const submitForm = useCallback(
    (callback: (params: URLSearchParams) => void) => {
      if (!validate()) return;
      setIsLoading(true);
      setTimeout(() => {
        const params = new URLSearchParams();
        params.set("upiid", formData.upiId.trim());
        params.set("name", formData.name.trim());
        if (formData.amount.trim()) params.set("money", formData.amount.trim());
        if (formData.note.trim()) params.set("note", formData.note.trim());
        callback(params);
        setIsLoading(false);
      }, 350);
    },
    [formData, validate],
  );

  return {
    formData,
    errors,
    isLoading,
    updateField,
    submitForm,
  };
}
