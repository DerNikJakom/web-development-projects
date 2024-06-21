import React, { useState } from "react";

function CreateArea(props) {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(input);
    setInput({
      title: "",
      content: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <form onSubmit={submitNote}>
        <input
          name="title"
          value={input.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          name="content"
          value={input.content}
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
