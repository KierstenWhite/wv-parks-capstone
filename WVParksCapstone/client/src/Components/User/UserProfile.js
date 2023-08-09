
import { useEffect, useState } from "react";
import { getUserAndReplace, getCurrentUser } from "../../Managers/UserManager";
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid, Segment, GridRow, Image, Header, Form, Input } from "semantic-ui-react";
import userEvent from "@testing-library/user-event";

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
                <Segment>
                    <Card>
                        <Card.Content>
                            <Image src={user.userPhoto} size="medium" />
                            <Segment>
                                <strong>Username:</strong> {user.username}<br></br>
                                <strong>Email:</strong> {user.email}<br></br>
                                <strong>Bio:</strong> {user.bio}
                            </Segment>
                            <Segment>
                                <Button>Add a Review</Button>
                                <Button>Plan Your Trip</Button>
                                <Button>My Trips</Button>
                                <Button>My Reviews</Button>
                            </Segment>
                        </Card.Content>
                    </Card>
                </Segment>
            </Grid.Column>
            <Grid.Column width={10}>
                <Segment>
                    <Header id="editProfileHeader" as="h1">
                        Edit User Profile
                    </Header>
                </Segment>
                <Segment>
                    <Form>
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
