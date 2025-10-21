// reCAPTCHA configuration
export const RECAPTCHA_CONFIG = {
  SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcAIckrAAAAAOpCCxmNp848y9z6wakZuhgyTB0u',
  THEME: 'light',
  SIZE: 'normal'
};

export const getRecaptchaToken = (recaptchaRef) => {
  return new Promise((resolve, reject) => {
    if (!recaptchaRef || !recaptchaRef.current) {
      console.error('reCAPTCHA ref not available:', { recaptchaRef });
      reject(new Error('Please complete the reCAPTCHA verification'));
      return;
    }
    
    try {
      const token = recaptchaRef.current.getValue();
      console.log('reCAPTCHA token obtained:', token ? 'Yes' : 'No');
      
      if (!token) {
        reject(new Error('Please complete the reCAPTCHA verification'));
        return;
      }
      
      resolve(token);
    } catch (error) {
      console.error('reCAPTCHA getValue error:', error);
      reject(new Error('reCAPTCHA verification failed. Please try again.'));
    }
  });
};