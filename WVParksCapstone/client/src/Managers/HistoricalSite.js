const apiUrl = "https://localhost:7060";

export const getAllHistoricalSites = () => {
  return fetch(`${apiUrl}/api/historicalSite`)
  .then((res) => res.json())
}

//GET tWaterfall by Id
export const getHistoricalSiteById = (id) => { //http GET by id parameter 
    return fetch(`${apiUrl}/api/historicalSite/${id}`)
    .then((res) => res.json());
  }