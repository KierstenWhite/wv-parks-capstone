const apiUrl = "https://localhost:7060";

export const getAllStays = () => {
  return fetch(`${apiUrl}/api/stay`)
  .then((res) => res.json())
}

//GET tWaterfall by Id
export const getStayById = (id) => { //http GET by id parameter 
    return fetch(`${apiUrl}/api/stay/${id}`)
    .then((res) => res.json());
  }