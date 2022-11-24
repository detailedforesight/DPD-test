import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Фото</th>
          <th scope="col">ФИО</th>
          <th scope="col">Пол</th>
          <th scope="col">Страна</th>
          <th scope="col">Дата рождения</th>
          <th scope="col">Почта</th>
          <th scope="col">Телефон</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index} className="">
            <td>
              <img src={post.picture.medium} className="rounded" />
            </td>
            <td>
              {post.name.title} {post.name.first} {post.name.last}
            </td>
            <td>{post.gender}</td>
            <td>{post.location.country}</td>
            <td>{post.dob.date.slice(0, 10)}</td>
            <td>{post.email}</td>
            <td>{post.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Posts;
