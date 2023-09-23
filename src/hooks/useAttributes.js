import { useState, useCallback } from "react";
import useTraitModifier from "./useTraitModifier";
import { alertUser, calculateModifier } from "../utils/helper";
import { MAX_TOTAL_ATTRIBUTES } from "../data/constants";

// Custom hook for managing character attributes
const useAttributes = (initialAttributes, modifiers, setModifiers) => {
  // Use the useTraitModifier hook to get attribute-related functionalities
  const { data: attributes, increaseValue, decreaseValue } = useTraitModifier(initialAttributes);

  const [totalAttributePoints, setTotalAttributePoints] = useState(
    Object.values(initialAttributes).reduce((acc, curr) => acc + curr, 0)
  );

  const canIncreaseAttribute = useCallback(() => {
    const canIncrease = totalAttributePoints + 1 <= MAX_TOTAL_ATTRIBUTES;
    return canIncrease;
  }, [totalAttributePoints]);

  const updateModifiers = useCallback(
    (attribute, value) => {
      const updatedModifier = calculateModifier(value);
      if (updatedModifier !== modifiers[attribute]) {
        setModifiers((prevModifiers) => ({
          ...prevModifiers,
          [attribute]: updatedModifier,
        }));
      }
    },
    [modifiers, setModifiers]
  );

  const increaseAttribute = useCallback(
    (attribute) => {
      if (canIncreaseAttribute()) {
        const newAttribute = increaseValue(attribute);
        updateModifiers(attribute, newAttribute);
        setTotalAttributePoints((prev) => prev + 1);
      } else {
        alertUser(
          `Oops! You're maxed out at ${MAX_TOTAL_ATTRIBUTES}. Even superheroes have limits! 🦸`
        );
      }
    },
    [canIncreaseAttribute, increaseValue, updateModifiers]
  );

  const decreaseAttribute = useCallback(
    (attribute) => {
      const newAttribute = decreaseValue(attribute);
      updateModifiers(attribute, newAttribute);
      setTotalAttributePoints((prev) => prev - 1);
    },
    [decreaseValue, updateModifiers]
  );

  return {
    attributes,
    totalAttributePoints,
    increaseAttribute,
    decreaseAttribute,
  };
};

export default useAttributes;
