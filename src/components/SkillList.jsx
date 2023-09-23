import React from "react";
import { SKILL_LIST } from "../data/constants";

// SkillList component displays and controls character skills
function SkillList({
  skills,
  modifiers,
  increaseSkill,
  decreaseSkill,
  usedSkillPoints,
  allowedSkillPoints,
}) {
  return (
    <div className="border p-1">
      <h2>Skills</h2>
      <h3>
        Total skill points (used/total): {usedSkillPoints}/{allowedSkillPoints}
      </h3>
      {SKILL_LIST.map((skill) => (
        <div key={skill.name}>
          {skill.name}: {skills[skill.name]}
          &nbsp;(Modifier: {skill.attributeModifier}):&nbsp;
          {modifiers[skill.attributeModifier]}&nbsp;
          <button onClick={() => increaseSkill(skill.name)}>+</button>&nbsp;
          <button onClick={() => decreaseSkill(skill.name)}>-</button>&nbsp; total:&nbsp;
          {skills[skill.name] + modifiers[skill.attributeModifier]}
        </div>
      ))}
    </div>
  );
}

export default SkillList;
