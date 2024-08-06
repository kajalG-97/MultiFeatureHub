// /src/components/InfiniteScroll.js
import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:4532/posts?page=${1}&size=${10}`,
          {
            method: "GET", // HTTP method
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NmMzNDA5NmI3ODgxMDQ1YzEzY2Q4MyIsInBhc3N3b3JkIjoiJDJhJDA4JG9ndWhlLzhBN0VVSGM4aUkxcmRwd3U4ZENQLm5nbUU5ZGZUWEh5SFA3SDEvQXcxd0Z6QWthIiwiZW1haWwiOiJrYWphbDExMUBnbWFpbC5jb20iLCJfX3YiOjB9LCJpYXQiOjE3MTg0MzQ2MjgsImV4cCI6MTcxODQ1OTgyOH0.UlhUeW6svqs5-sLaJbzpuwGSoaEzLNR1N5zOkAhv6SU`, // Include the JWT token here
            },
          }
        );
        const data = await res?.json();

        setItems((prevItems) => [...prevItems, ...data?.posts]);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setLoading(false);
      }
    };

    fetchItems();
  }, [page]);

  const handleScroll = () => {
    const bottom =
      observerRef.current.getBoundingClientRect().bottom <= window.innerHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      {items.map((item, index) => (
        <div key={index} className="item">
          {item.content}
        </div>
      ))}
      <div ref={observerRef} className="observer"></div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
