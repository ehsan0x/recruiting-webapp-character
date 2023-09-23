export const calculateModifier = (value) => Math.floor((value - 10) / 2);

export const isValidValue = (value) => {
  const valid = value >= 0;
  console.log(`isValidValue called with ${value}. Result: ${valid}`);
  return valid;
};

export const alertUser = (message) => window.alert(message);
