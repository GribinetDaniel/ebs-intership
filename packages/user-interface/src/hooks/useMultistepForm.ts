import { ReactElement, useState } from 'react';

export function useMultistepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep((prev) => prev + 1);
  }

  function back() {
    setCurrentStep((prev) => prev - 1);
  }

  return {
    currentStep,
    next,
    back,
  };
}
