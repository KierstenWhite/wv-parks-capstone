const apiUrl = "https://localhost:7060";

export const getAllStarTypes = () => {
  return fetch(`${apiUrl}/api/StarType`)
  .then((res) => res.json())
}