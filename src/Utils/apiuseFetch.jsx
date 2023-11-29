import { useState, useEffect } from "react";

const apiuseFetch = (url) => {

  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch('https://fakestoreapi.com/products'  , {signal : abortCont.signal})
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data from that resource!");
          }
          return res.json();
        })

        .then((date) => {
          setData(date);
          setisPending(false);
          setError(null);
        })

        .catch((err) => {
          if (err.name === "AbortError") {
            console.log('fetch aborted');
          }else{
            setisPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort;
  }, [url]);

  
  return { data, isPending, error };
};
export default apiuseFetch;
