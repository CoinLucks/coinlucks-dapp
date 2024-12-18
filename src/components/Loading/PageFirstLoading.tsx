'use client';

import { Image } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

const PageFirstLoading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);

      const timeout = setTimeout(() => setLoading(false), 5000);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div className="text-center">
        <Image
          src="/img/logo-gray.png"
          alt="Loading"
          className="mx-auto mb-4 w-24 h-24"
        />

      </div>
    </div>
  );
};

export default PageFirstLoading;