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

// //Get Review By ParkId
// export const getReviewsByParkId = (id) => {
//     return fetch(`${apiUrl}/api/review/GetReviewByParkId${id}`)
//     .then((res) => res.json())
//   }

//   //Get Review By ParkId
// export const getReviewsByUserId = (id) => {
//     return fetch(`${apiUrl}/api/review/GetReviewByUserId${id}`)
//     .then((res) => res.json())
//   }

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
export const editTrip = (trip) => {
    return fetch(`${apiUrl}/api/trip/${trip.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    });
  };

//Delete Review
export const deleteTrip = (Id) => {
    return fetch(`${apiUrl}/api/trip/${Id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  };