import React from "react";

// AttributeList component displays a list of attributes along with their modifiers
function AttributeList({ attributes, modifiers, increaseAttribute, decreaseAttribute }) {
  return (
    <div className="border p-1">
      <h2>Attributes</h2>
      {Object.keys(attributes).map((attribute) => (
        <div key={attribute}>
          {attribute}: {attributes[attribute]} (Modifier: {modifiers[attribute]})
          <button
            onClick={() => {
              increaseAttribute(attribute);
            }}
          >
            +
          </button>
          <button onClick={() => decreaseAttribute(attribute)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default AttributeList;
