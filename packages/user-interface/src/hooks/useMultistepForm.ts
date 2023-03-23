import React, { ReactElement, useState, ReactNode } from 'react';

export function useMultistepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep((prev) => prev + 1);
  }

  function back() {
    setCurrentStep((prev) => prev - 1);
  }

  function setError() {
    let confirmPasswordInput = document.getElementById('confirmPassword')!;
    let errorMessage = document.getElementById('error-message')!;
    confirmPasswordInput.style.borderColor = 'red';
    confirmPasswordInput.style.borderWidth = '2px';
    errorMessage.textContent = "Password didn't match";
    errorMessage.style.fontSize = 'small';
    errorMessage.style.color = 'red';
  }

  return {
    currentStep,
    next,
    back,
    setError,
  };
}
