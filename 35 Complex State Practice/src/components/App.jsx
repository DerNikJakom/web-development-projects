import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function changeHandler(event) {
    const { value, name } = event.target;

    setContact((prevValue) => {
      // prevValue is equal to contact
      const { fName, lName, email } = prevValue;
      console.log(prevValue);
      console.log(contact);

      if (name === "fName") {
        return {
          fName: value,
          lName: lName,
          email: email,
        };
      } else if (name === "lName") {
        return {
          fName: fName,
          lName: value,
          email: email,
        };
      } else {
        return {
          fName: fName,
          lName: lName,
          email: value,
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          onChange={changeHandler}
          name="fName"
          placeholder="First Name"
          value={contact.fName}
        />
        <input
          onChange={changeHandler}
          name="lName"
          placeholder="Last Name"
          value={contact.lName}
        />
        <input
          onChange={changeHandler}
          name="email"
          placeholder="Email"
          value={contact.email}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
