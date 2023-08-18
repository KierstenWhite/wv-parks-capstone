
import { useEffect, useState } from "react";
import { getUserAndReplace, getCurrentUser } from "../../Managers/UserManager";
import 'semantic-ui-css/semantic.min.css';
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Grid, Segment, GridRow, Image, Header, Form, Input } from "semantic-ui-react";
import userEvent from "@testing-library/user-event";
import './UserProfile.css'

export const UserProfile = () => {
    const [user, editUser] = useState({
        email: "",
        username: "",
        userPhoto: "",
        isAdmin: "",
        bio: "",
        dateCreated: "",
        userId: 0,
    })

    const localCurrentUser = localStorage.getItem("userProfile");
    const currentUserObject = JSON.parse(localCurrentUser);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser(currentUserObject).then(user => 
            editUser(user)
          )
    }, []);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        getUserAndReplace(user).then(() => {
            navigate("/myprofile");
        });
    };

    //10
    return user.id === currentUserObject.id ? (<>
    <Grid id="fullGrid">
       <GridRow>
            <Grid.Column width={5}>
                <Segment id="profileCard">
                    <Card >
                        <Card.Content>
                            <Image id="polaroid" src={user.userPhoto} size="medium" />
                            <Segment>
                                <strong>Username:</strong> {user.username}<br></br>
                                <strong>Email:</strong> {user.email}<br></br>
                                <strong>Bio:</strong> {user.bio}
                            </Segment>
                            <Segment id="buttonsOnProfile">
                                <Link to='/addareview'><Button size='medium' id="profileButtons">Add a Review</Button></Link>
                                <Link to='/createatrip'><Button size='medium' id="profileButtons">Plan Your Trip</Button></Link>
                                <Link to='/mytrips'><Button size='medium' id="profileButtons">My Trips</Button></Link>
                                <Link to='/myreviews'><Button  size='medium' id="profileButtons">My Reviews</Button></Link>
                            </Segment>
                        </Card.Content>
                    </Card>
                </Segment>
            </Grid.Column>
            <Grid.Column width={10} id="editColumn">
                <Segment id="editHeaderSegment">
                    <Header id="editProfileHeader" as="h1">
                        Edit User Profile
                    </Header>
                </Segment>
                <Segment id="editFormSegment">
                    <Form id="editProfileForm">
                        <Form.Group>
                        <Form.Field
                    control={Input}
                    onChange={(evt) => {
                      const copy = { ...user };
                      copy.userPhoto = evt.target.value;
                      editUser(copy);
                    }}
                    label="User Photo Link (Square Images Work Best)"
                    htmlFor="userPhoto"
                    value={user.userPhoto}
                    id="userPhoto"
                    required
                  />
                        </Form.Group>
                    <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    onChange={(evt) => {
                      const copy = { ...user };
                      copy.email = evt.target.value;
                      editUser(copy);
                    }}
                    label="Email"
                    htmlFor="email"
                    value={user.email}
                    id="email"
                    required
                  />
                  <Form.Field
                    control={Input}
                    onChange={(evt) => {
                      const copy = { ...user };
                      copy.username = evt.target.value;
                      editUser(copy);
                    }}
                    label="Username"
                    htmlFor="username"
                    value={user.username}
                    id="username"
                    required
                  />
                  <Form.Field
                    control={Input}
                    onChange={(evt) => {
                      const copy = { ...user };
                      copy.bio = evt.target.value;
                      editUser(copy);
                    }}
                    label="Bio"
                    htmlFor="bio"
                    value={user.bio}
                    id="bio"
                    required
                  />
                </Form.Group>
                <Button
                  onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                  id="button"
                >
                  Update Profile
                </Button>
                    </Form>
                </Segment>

            </Grid.Column>
        </GridRow> 
    </Grid>
    </>) : (<></>)
}
