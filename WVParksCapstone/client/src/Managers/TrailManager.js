const apiUrl = "https://localhost:7060";

export const getAllTrails = () => {
  return fetch(`${apiUrl}/api/trail`)
  .then((res) => res.json())
}

//GET tWaterfall by Id
export const getTrailById = (id) => { //http GET by id parameter 
    return fetch(`${apiUrl}/api/trail/${id}`)
    .then((res) => res.json());
  }