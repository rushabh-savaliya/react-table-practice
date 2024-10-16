import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [user_data, setPosts] = useState([]);

  useEffect(() => {
    get_date();
  }, []);
  const get_date = async () => {
    try {
      let user_data = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      console.log(user_data);
      setPosts(user_data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <table>
        <tr>
          <th>id</th>
          <th>userId</th>
          <th>title</th>
          <th>completed</th>
        </tr>
        {user_data.map((ele) => (
          <tr key={ele.id}>
            <td>{ele.id}</td>
            <td>{ele.userId}</td>
            <td>{ele.title}</td>
            <td>{ele.completed ? "True" : "False"}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default App;
