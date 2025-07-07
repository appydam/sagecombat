import { Check } from 'lucide-react';
import { KycStep } from './types';

interface KYCProgressBarProps {
  currentStep: KycStep;
  steps: readonly KycStep[];
}

export const KYCProgressBar = ({ currentStep, steps }: KYCProgressBarProps) => {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex items-center w-full px-2">
      {steps.map((step, index) => {
        const isCompleted = currentIndex > index;
        const isCurrent = currentIndex === index;

        if (step === 'success') return null;

        return (
          <div key={step} className="flex items-center w-full">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-blue-500 text-white'
                    : isCurrent
                    ? 'bg-blue-100 border-2 border-blue-500 text-blue-600'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <p className={`mt-2 text-xs text-center capitalize ${
                isCurrent ? 'font-semibold text-blue-600' : 'text-gray-500'
              }`}>
                {step.replace('-input', '')}
              </p>
            </div>
            {index < steps.length - 2 && (
              <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                isCompleted ? 'bg-blue-500' : 'bg-gray-200'
              }`}/>
            )}
          </div>
        );
      })}
    </div>
  );
};
