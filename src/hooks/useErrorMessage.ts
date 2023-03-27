import React from 'react';

export const useErrorMessage = (
  error: string,
  setError: (value: string) => void,
  time?: number | 5000,
) => {
  React.useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(''), time);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);
};
