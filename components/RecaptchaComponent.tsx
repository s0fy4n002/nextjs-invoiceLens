'use client';

import { useRef, forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaComponentProps {
  onVerify: (token: string | null) => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal' | 'invisible';
}

export interface RecaptchaRef {
  reset: () => void;
  execute: () => void;
}

const RecaptchaComponent = forwardRef<RecaptchaRef, RecaptchaComponentProps>(
  ({ onVerify, theme = 'light', size = 'normal' }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        recaptchaRef.current?.reset();
      },
      execute: () => {
        recaptchaRef.current?.execute();
      },
    }));

    const handleChange = (token: string | null) => {
      onVerify(token);
    };

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined');
      return null;
    }

    return (
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleChange}
        theme={theme}
        size={size}
      />
    );
  }
);

RecaptchaComponent.displayName = 'RecaptchaComponent';

export default RecaptchaComponent;