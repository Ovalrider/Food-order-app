import React, { useEffect, useCallback, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong!");
  }
  
  return resData;
}

export default function useHttp(url, config, initData) {
  const [data, setrData] = useState(initData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function clearData(){
    setrData(initData)
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config, body:data});
        setrData(resData);
        
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method) || !config) {
      sendRequest();
    }
  }, [sendRequest]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
