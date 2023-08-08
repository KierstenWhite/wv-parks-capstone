const apiUrl = "https://localhost:7060";

export const getAllWaterfalls = () => {
  return fetch(`${apiUrl}/api/waterfall`)
  .then((res) => res.json())
}

//GET tWaterfall by Id
export const getWaterfallById = (id) => { //http GET by id parameter 
    return fetch(`${apiUrl}/api/waterfall/${id}`)
    .then((res) => res.json());
  }