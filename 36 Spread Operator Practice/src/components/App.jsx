import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [listItems, setListItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInput(newValue);
  }

  function handleClick() {
    setListItems((prevValue) => {
      return [...prevValue, input];
    });
    setInput("");
  }

  function getItems(item) {
    return <li>{item}</li>;
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleChange} value={input} />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>{listItems.map(getItems)}</ul>
      </div>
    </div>
  );
}

export default App;
