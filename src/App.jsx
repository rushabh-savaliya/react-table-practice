import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [user_data, setPosts] = useState([]);
  const [getSeachText, setSeachText] = useState("");
  const [getDropDownValue, setDropDownValue] = useState("title");

  useEffect(() => {
    get_date();
  }, []);
  const get_date = async () => {
    try {
      let user_data = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      setPosts(user_data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filterData = (ele) => {
    const searchText = getSeachText.toLowerCase();
    switch (getDropDownValue) {
      case "id":
      case "userId":
        return ele[getDropDownValue].toString().includes(searchText);
      case "title":
        return ele.title.toLowerCase().includes(searchText);
      case "completed":
        return ele.completed.toString().toLowerCase().includes(searchText);
      default:
        return false;
    }
  };
  return (
    <>
      <select onChange={(e) => setDropDownValue(e.target.value)}>
        <option value="id">id</option>
        <option value="userId">userId</option>
        <option value="title">title</option>
        <option value="completed">completed</option>
      </select>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSeachText(e.target.value);
        }}
      />
      <table>
        <tr>
          <th>id</th>
          <th>userId</th>
          <th>title</th>
          <th>completed</th>
        </tr>
        {user_data.filter(filterData).map((ele) => (
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
