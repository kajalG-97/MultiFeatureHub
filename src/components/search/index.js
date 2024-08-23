import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const AutoCompleteSearch = () => {
  const observer = useRef();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    isLoading: false,
    isError: false,
    error: null,
  });

  // Throttle the handleChange function to execute at most once per second
  // const throttledHandleChange = useRef(
  //   throttle((value) => {
  //     setQuery(value);
  //   }, 1000)
  // ).current;

  const handleChange = (e) => {
    let timer;
    if (timer) {
      clearImmediate(timer);
    }

    timer = setTimeout(() => {
      setQuery(e.target.value);
    }, 1000);

    // throttledHandleChange(e.target.value);
  };

  // function debounce(func, delay) {
  //   let timerId;
  //   return function (...args) {
  //     if (!timerId) {
  //       timerId = setTimeout(() => {
  //         func(...args);
  //         timerId = null;
  //       }, delay);
  //     }
  //   };
  // }

  // function throttlee(func, delay) {
  //   let lastCall = 0;
  //   return function (...args) {
  //     const now = new Date().getTime();
  //     if (now - lastCall < delay) {
  //       return;
  //     }
  //     lastCall = now;
  //     func(...args);
  //   };
  // }

  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        func(...args);
        lastCall = now;
      }
    };
  }

  // Throttle the loadMore function to execute at most once per second
  const throttledLoadMore = useRef(
    throttle(() => {
      if (!status.isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 1000)
  ).current;

  const lastElement = (node) => {
    if (status?.isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && data?.length > 0) {
        throttledLoadMore(); // Throttled call to loadMore function
      }
    });

    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    const controller = new AbortController();

    const getApiResponse = async () => {
      setStatus({ isLoading: true });

      try {
        const res = await fetch(
          `http://openlibrary.org/search.json?title=${query}&page=${page}`,
          { signal: controller.signal }
        );

        const data = await res?.json();

        controller.abort();

        setStatus({ isLoading: false });

        setData((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...data.docs.map((b) => ({
                title: b?.title,
                key: b?.key,
                authorName: b?.author_name?.[0],
              })),
            ]),
          ];
        });
      } catch (error) {
        console.log("error", error);
        setStatus({ isLoading: false, isError: true, error });
      }
    };

    if (query?.length > 1) getApiResponse();
  }, [query, page]);

  useEffect(() => {
    if (!query) setData([]);
  }, [query]);

  return (
    <>
      {status?.error && (
        <alert>{status?.error || "Something Went Wrong"}</alert>
      )}
      <div padding="24px" style={{ width: "60%", margin: "auto" }}>
        <input
          type="text"
          style={{ fontSize: "18px" }}
          placeholder="Search Book"
          onChange={handleChange}
        />
        {data?.map((book, index) => {
          if (data.length === index + 1) {
            return (
              <p
                ref={lastElement}
                style={{ textAlign: "start" }}
                key={book?.key}
              >
                {book?.title}
              </p>
            );
          } else {
            return (
              <p style={{ textAlign: "start" }} key={book?.key}>
                {book?.title}
              </p>
            );
          }
        })}

        {status?.isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default AutoCompleteSearch;
