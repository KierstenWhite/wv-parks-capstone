const apiUrl = "https://localhost:5001";

export const getAllUserProfiles = () => {
  return fetch(`${apiUrl}/api/user`)
  .then((res) => res.json())
}

export const login = (userObject) => {
  return fetch(`${apiUrl}/api/user/getbyemail?email=${userObject.email}`)
  .then((r) => r.json())
    .then((userProfile) => {
        //modified code by Kiersten - allows for .admin to be used in other .js files for if/else statements
        if(userProfile.id){
        const updatedProfile = { ...userProfile, id: userProfile.id };
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        return updatedProfile;
      } else{
        return undefined
      }
    });
};

export const logout = () => {
      localStorage.clear()
};

export const register = (userObject, password) => {
  return  fetch(`${apiUrl}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
    });
};

//GET User by Id
export const getUser = (id) => { //http GET by id parameter 
  return fetch(`${apiUrl}/api/user/${id}`)
  .then((res) => res.json());
}