import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
import { useRouter } from "next/router";

const PER_PAGE = 20;

export default function Home() {
  const router = useRouter();
  // console.log("router", router);
  const { query } = router;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const setCurrentPage = (num) => {
    const href = `/?page=${num}&search=${query.search || ""}`;
    router.push(href, href, { shallow: true });
  };

  const setSearch = (value) => {
    const href = `/?page=${1}&search=${value.toLowerCase()}`;
    router.push(href, href, { shallow: true });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const res = await axios.get("./api.json");

      setPosts(res.data.results);

      setLoading(false);
      // console.log(res.data.results);
      // console.log(query.page);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    router.asPath === "/" ? setCurrentPage(1) : null;
  }, []);

  const indexOfLastPost = (query.page || 1) * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;

  // const memData = useMemo(() => {
  //   return posts.filter((el) => {
  //     return query?.search === ""
  //       ? el
  //       : el.name.first.toLowerCase().includes(query.search) ||
  //           el.name.last.toLowerCase().includes(query.search) ||
  //           el.location.country.toLowerCase().includes(query.search) ||
  //           el.phone.includes(query.search) ||
  //           el.email.toLowerCase().includes(query.search) ||
  //           el.dob.date.slice(0, 10).includes(query.search) ||
  //           el.gender.toLowerCase().includes(query.search);
  //   });
  // }, [query.search]);

  // const memDataonPage = useMemo(() => {
  //   return memData.slice(indexOfFirstPost, indexOfLastPost);
  // }, [query.page]);

  const currentPosts = posts
    .filter((el) => {
      return query?.search === ""
        ? el
        : el.name.first.toLowerCase().includes(query.search) ||
            el.name.last.toLowerCase().includes(query.search) ||
            el.location.country.toLowerCase().includes(query.search) ||
            el.phone.includes(query.search) ||
            el.email.toLowerCase().includes(query.search) ||
            el.dob.date.slice(0, 10).includes(query.search) ||
            el.gender.toLowerCase().includes(query.search);
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log("pages in index", currentPosts.length, PER_PAGE);
  return (
    <div className="container mt-5">
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Поиск"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={query.search || ""}
        />
      </div>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={PER_PAGE}
        totalPosts={posts?.length}
        paginate={paginate}
        pages={posts?.length / PER_PAGE}
      />
    </div>
  );
}
