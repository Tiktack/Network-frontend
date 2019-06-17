import { useEffect } from 'react';

const useHandleInputEnter = (inputName, action) => {
  useEffect(() => {
    const handleType = (e) => {
      if (e.keyCode === 13) {
        action();
      }
    };

    const input = document.getElementById(inputName);
    input.addEventListener('keydown', handleType);
    return () => {
      input.removeEventListener('keydown', handleType);
    };
  });
};

export default useHandleInputEnter;
