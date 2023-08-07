const apiUrl = "https://localhost:7060";

export const getAllReviews = () => {
    return fetch(`${apiUrl}/api/review`)
    .then((res) => res.json())
  }

//GET Review by Id
export const getReviewById = (id) => { //http GET by id parameter 
    return fetch(`${apiUrl}/api/review/${id}`)
    .then((res) => res.json());
  }

//Get Review By ParkId
export const getReviewsByParkId = (id) => {
    return fetch(`${apiUrl}/api/review/GetReviewByParkId${id}`)
    .then((res) => res.json())
  }

  //Get Review By ParkId
export const getReviewsByUserId = (id) => {
    return fetch(`${apiUrl}/api/review/GetReviewByUserId${id}`)
    .then((res) => res.json())
  }

//Create New Review
export const addReview = (review) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
  };


//Edit Review
export const editReview = (review) => {
    return fetch(`${apiUrl}/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
  };

//Delete Review
export const DeleteReview = (Id) => {
    return fetch(`${apiUrl}/${Id}`, {
      method: "DELETE",
    }).then((response) => response.json());
  };