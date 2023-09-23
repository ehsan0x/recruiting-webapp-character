import { useCallback, useEffect, useState } from "react";
import useTraitModifier from "./useTraitModifier";
import { alertUser } from "../utils/helper";

// Function to calculate the allowed skill points based on intelligence
const calculateAllowedSkillPoints = (intelligence) => Math.max(0, 10 + intelligence * 4);

// Custom hook for managing character skills
const useSkills = (initialSkills, modifiers) => {
  const { data: skills, increaseValue, decreaseValue } = useTraitModifier(initialSkills);
  const [allowedSkillPoints, setAllowedSkillPoints] = useState(() =>
    calculateAllowedSkillPoints(modifiers.Intelligence)
  );
  const [usedSkillPoints, setUsedSkillPoints] = useState(0);

  useEffect(() => {
    setAllowedSkillPoints(calculateAllowedSkillPoints(modifiers.Intelligence));
  }, [modifiers.Intelligence]);

  const updateSkillPoints = useCallback((operation) => {
    setUsedSkillPoints((prevUsedSkillPoints) => Math.max(0, operation(prevUsedSkillPoints)));
  }, []);

  const increaseSkill = useCallback(
    (skill) => {
      if (usedSkillPoints >= allowedSkillPoints) {
        alertUser("You're out of skill points. Time to level up that brain!");
        return;
      }
      increaseValue(skill);
      updateSkillPoints((prev) => prev + 1);
    },
    [allowedSkillPoints, increaseValue, updateSkillPoints, usedSkillPoints]
  );

  const decreaseSkill = useCallback(
    (skill) => {
      decreaseValue(skill);
      updateSkillPoints((prev) => prev - 1);
    },
    [decreaseValue, updateSkillPoints]
  );

  return {
    skills,
    allowedSkillPoints,
    usedSkillPoints,
    increaseSkill,
    decreaseSkill,
  };
};

export default useSkills;
