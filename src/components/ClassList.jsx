import React from "react";
import { CLASS_LIST } from "../data/constants";

// ClassList component displays a list of classes and their requirements
function ClassList({
  meetsClassRequirements,
  setDisplayRequirements,
  displayRequirements,
  hideRequirements,
}) {
  return (
    <div className="border p-1">
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map((roleClass) => (
        <div
          key={roleClass}
          className={`${meetsClassRequirements(roleClass) ? "green" : "gray"} cursor-pointer`}
          onClick={() => setDisplayRequirements(roleClass)}
        >
          {roleClass}
        </div>
      ))}
      {displayRequirements && (
        <div className="border p-1">
          <h2>{displayRequirements} Minimum Requirements</h2>
          {Object.keys(CLASS_LIST[displayRequirements]).map((attribute) => (
            <div key={attribute}>
              {attribute}: {CLASS_LIST[displayRequirements][attribute]}
            </div>
          ))}
          <button onClick={hideRequirements}>Close Requirement View</button>
        </div>
      )}
    </div>
  );
}

export default ClassList;
