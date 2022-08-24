import { useState, useEffect } from 'react';

function useFetch <T>(url: string, initialData: any): { data: T, loading: boolean, error: boolean } {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('send request');
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(true);
        } else {
            setData(res);
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default useFetch;