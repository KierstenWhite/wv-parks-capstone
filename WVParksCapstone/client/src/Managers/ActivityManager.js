const apiUrl = "https://localhost:7060";

export const getAllActivities = () => {
  return fetch(`${apiUrl}/api/activity`)
  .then((res) => res.json())
}

//GET tWaterfall by Id
export const getActivityById = (id) => { //http GET by id parameter 
    return fetch(`${apiUrl}/api/activity/${id}`)
    .then((res) => res.json());
  }