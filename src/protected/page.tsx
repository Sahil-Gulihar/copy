'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Protected() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/protected', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError('You need to log in.');
        router.push('/login');
      } else {
        const result = await response.json();
        setData(result);
      }
    };

    fetchProtectedData();
  }, [router]);

  return (
    <div>
      <h1>Protected Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
