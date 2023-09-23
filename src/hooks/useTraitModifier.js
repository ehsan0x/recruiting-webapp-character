import { useCallback, useState } from "react";
import { alertUser, isValidValue } from "../utils/helper";

// Custom hook for managing trait operations like attributes and skills
const useTraitModifier = (initialData) => {
  const [data, setData] = useState(initialData);

  const updateTraits = useCallback(
    (key, operation) => {
      const newValue = operation(data[key]);
      if (!isValidValue(newValue)) {
        alertUser("Whoa! Attributes can't dip into the negatives—this isn't the Upside Down! 🙃");
        return data[key];
      }
      setData((prevData) => ({
        ...prevData,
        [key]: newValue,
      }));
      return newValue;
    },
    [data]
  );

  const increaseValue = useCallback((key) => updateTraits(key, (val) => val + 1), [updateTraits]);

  const decreaseValue = useCallback((key) => updateTraits(key, (val) => val - 1), [updateTraits]);

  return {
    data,
    increaseValue,
    decreaseValue,
  };
};

export default useTraitModifier;
