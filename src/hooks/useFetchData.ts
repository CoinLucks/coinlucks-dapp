import { useState, useCallback } from "react";

const useFetchData = (initialData = [], method = "GET") => {
  const [data, setData] = useState(initialData);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (url: string, body?: any) => {
      if (!url) return;
      setIsLoading(true);
      hasError && setHasError(false);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (response.ok) {
        const result = await response.json();
        setData(result["data"]);
      } else {
        setData(initialData);
        !hasError && setHasError(true);
      }

      setIsLoading(false);
      return response;
    },
    [hasError, initialData, method],
  );

  return { data, fetchData, isLoading, hasError };
};

export default useFetchData;
