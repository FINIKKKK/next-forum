import React from 'react';

export const useBottomBoundary = (
  setBottomBoundary: (value: number | null) => void,
) => {
  React.useEffect(() => {
    const handleResize = () => {
      const boundary = document.documentElement.scrollHeight - 200;
      setBottomBoundary(boundary);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
