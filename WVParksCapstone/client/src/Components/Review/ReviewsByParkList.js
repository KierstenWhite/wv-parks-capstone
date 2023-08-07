// //Parent for Reviews
// import 'semantic-ui-css/semantic.min.css';
// import { useState, useEffect } from "react";
// import { ReviewsByPark } from './ReviewsByPark';
// import { getReviewsByParkId } from '../../Managers/ReviewManager';
// import { Card, Header } from "semantic-ui-react";

// export const ReviewsByParkList = () => {
//   const [reviewss, setReviews] = useState([]);
//   const localCurrentUser = localStorage.getItem("current_user");
//   const currentUserObject = JSON.parse(localCurrentUser);

//   useEffect(() => {
//     getReviewsByParkId().then((reviewArray) => {
//       setParks(reviewArray);
//     });
//   }, []);
//   return (
//     <>
//       <Header as="h2" id="reviewsByParkListHeader">
//         All WV State Parks
//       </Header>
//       <Card.Group id="parkCardGroup" itemsPerRow={6}>
//         {parks.map((park) => (
//           <ParkList
//             key={`park--${park.id}`}
//             currentUser={currentUserObject}
//             park={park}
//           />
//         ))}
//       </Card.Group>
//     </>
//   );
// };
