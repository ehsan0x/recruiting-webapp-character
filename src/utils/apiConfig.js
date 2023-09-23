export const FETCH_CONFIG = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const POST_CONFIG = (body) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});
