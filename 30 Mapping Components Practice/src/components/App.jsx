import React from "react";
import Entry from "./Entry";
import emojies from "../emojipedia";

function createCard(emojies) {
  return (
    <Entry
      key={emojies.id}
      emoji={emojies.emoji}
      term={emojies.name}
      description={emojies.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojies.map(createCard)}</dl>
    </div>
  );
}

export default App;
