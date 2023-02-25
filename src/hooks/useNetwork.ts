import { useEffect, useState } from 'react';

export default function useNetwork() {
  const [isConnected, setIsConnected] = useState(navigator.onLine);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener('offline', handleNetworkChange);
    window.addEventListener('online', handleNetworkChange);

    return () => {
      window.removeEventListener('offline', handleNetworkChange);
      window.removeEventListener('online', handleNetworkChange);
    };
  }, [isConnected]);

  return { isConnected };
}
