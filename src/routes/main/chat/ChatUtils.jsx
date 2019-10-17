import { useLayoutEffect, useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useChatSize = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    const handler = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return height;
};
