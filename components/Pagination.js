import React from "react";
import { useRouter } from "next/router";

const Pagination = ({ postsPerPage, totalPosts, paginate, pages }) => {
  const router = useRouter();

  const { query } = router;
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }
  const pageNumbers = Array.from(new Array(pages).keys());
  // console.log("pages", pages);
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((_, number) => (
          <li
            key={number}
            className={`page-item ${query.page == number + 1 ? "active" : ""}`}
            // style={{ color: query.page == number ? "red" : "blue" }}
          >
            <a onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
