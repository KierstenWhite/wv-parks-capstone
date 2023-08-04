const apiUrl = "https://localhost:7060";

export const getAllParks = () => {
  return fetch(`${apiUrl}/api/park`)
  .then((res) => res.json())
}

//GET Park by Id
export const getParkById = (id) => { //http GET by id parameter 
    return fetch(`${apiUrl}/api/park/${id}`)
    .then((res) => res.json());
  }