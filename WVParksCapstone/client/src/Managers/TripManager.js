const apiUrl = "https://localhost:7060";

export const getAllTrips = () => {
    return fetch(`${apiUrl}/api/trip`)
    .then((res) => res.json())
  }

//GET Review by Id
export const getTripById = (id) => { //http GET by id parameter 
    return fetch(`${apiUrl}/api/trip/${id}`)
    .then((res) => res.json());
  }
  
//Create New Review
export const addTrip = (tripToSendToAPI) => {
    return fetch(`${apiUrl}/api/trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripToSendToAPI),
    });
  };


//Edit Review
export const editMyTrip = (tripObject) => {
    return fetch(`${apiUrl}/api/trip/${tripObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripObject),
    });
  };

//Delete Review
export const deleteTrip = (tripId) => {
    return fetch(`${apiUrl}/api/trip/${tripId}`, {
      method: "DELETE",
    });
  };